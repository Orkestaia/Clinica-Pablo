'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Phone, CheckCircle, PhoneCall, Info, RefreshCw, Download } from 'lucide-react';
import { CallRecord, FilterState } from '@/lib/types';
import { filterCalls, calculateStats, exportToCSV } from '@/lib/utils';
import MetricCard from '@/components/MetricCard';
import Filters from '@/components/Filters';
import CallsTable from '@/components/CallsTable';
import CallModal from '@/components/CallModal';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1bG5YLL1btGfc9igGeJFZKbKzOWAE3nxNisq3r5FXo5U/export?format=csv&gid=0';
const REFRESH_INTERVAL = 30000; // 30 segundos

export default function Home() {
    const [calls, setCalls] = useState<CallRecord[]>([]);
    const [filteredCalls, setFilteredCalls] = useState<CallRecord[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        estado: 'Todos',
        tipoPaciente: 'Todos',
        tratamiento: 'Todos',
    });
    const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    // Fetch de datos desde Google Sheets
    const fetchCalls = async (showSyncIndicator = false) => {
        if (showSyncIndicator) setIsSyncing(true);

        try {
            const response = await fetch(SHEET_CSV_URL);
            const csvText = await response.text();

            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    const data = results.data
                        .filter((row: any) => row.Timestamp && row.Nombre_Paciente)
                        .sort((a: any, b: any) => {
                            const dateA = new Date(a.Timestamp);
                            const dateB = new Date(b.Timestamp);
                            return dateB.getTime() - dateA.getTime();
                        }) as CallRecord[];

                    setCalls(data);
                    setLastUpdate(new Date());
                    setIsLoading(false);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        } finally {
            if (showSyncIndicator) {
                setTimeout(() => setIsSyncing(false), 500);
            }
        }
    };

    // Fetch inicial
    useEffect(() => {
        fetchCalls();
    }, []);

    // Auto-refresh cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            fetchCalls(true);
        }, REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    // Aplicar filtros
    useEffect(() => {
        const filtered = filterCalls(calls, filters);
        setFilteredCalls(filtered);
    }, [calls, filters]);

    // Calcular estadísticas
    const stats = calculateStats(calls);

    // Handlers
    const handleCallClick = (call: CallRecord) => {
        setSelectedCall(call);
        setIsModalOpen(true);
    };

    const handleExport = () => {
        exportToCSV(filteredCalls, `llamadas_${new Date().toISOString().split('T')[0]}.csv`);
    };

    const formatLastUpdate = () => {
        if (!lastUpdate) return '';
        const hours = lastUpdate.getHours().toString().padStart(2, '0');
        const minutes = lastUpdate.getMinutes().toString().padStart(2, '0');
        const seconds = lastUpdate.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Cargando datos...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                🦷 Ortodoncia Díaz de Villafranca
                            </h1>
                            <p className="text-lg text-gray-600">Panel de Control de Llamadas</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                                <div className={`w-2 h-2 bg-green-600 rounded-full ${isSyncing ? 'animate-pulse' : 'animate-pulse-slow'}`} />
                                <span className="text-sm font-semibold">Auto-sync</span>
                            </div>
                            {lastUpdate && (
                                <span className="text-sm text-gray-600">
                                    Última actualización: {formatLastUpdate()}
                                </span>
                            )}
                            <button
                                onClick={() => fetchCalls(true)}
                                disabled={isSyncing}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                Actualizar
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Exportar CSV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Total Llamadas"
                        value={stats.total}
                        icon={<Phone className="w-6 h-6" />}
                        color="blue"
                    />
                    <MetricCard
                        title="Citas Agendadas"
                        value={stats.citasAgendadas}
                        icon={<CheckCircle className="w-6 h-6" />}
                        color="green"
                    />
                    <MetricCard
                        title="Callbacks Pendientes"
                        value={stats.callbacksPendientes}
                        icon={<PhoneCall className="w-6 h-6" />}
                        color="yellow"
                    />
                    <MetricCard
                        title="Solo Información"
                        value={stats.soloInformacion}
                        icon={<Info className="w-6 h-6" />}
                        color="gray"
                    />
                </div>

                {/* Filtros */}
                <Filters filters={filters} onFilterChange={setFilters} />

                {/* Tabla */}
                <CallsTable calls={filteredCalls} onCallClick={handleCallClick} />

                {/* Modal */}
                <CallModal
                    call={selectedCall}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </main>
    );
}
