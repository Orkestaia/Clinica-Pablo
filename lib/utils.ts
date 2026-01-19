import { CallRecord, FilterState } from './types';

// Formatear fecha en español
export function formatDate(dateString: string): string {
    if (!dateString) return '-';

    try {
        const date = new Date(dateString);
        const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month}, ${hours}:${minutes}`;
    } catch (error) {
        return dateString;
    }
}

// Filtrar llamadas según los filtros activos
export function filterCalls(calls: CallRecord[], filters: FilterState): CallRecord[] {
    return calls.filter(call => {
        const estadoMatch = filters.estado === 'Todos' || call.Estado === filters.estado;
        const tipoMatch = filters.tipoPaciente === 'Todos' || call.Tipo_Paciente === filters.tipoPaciente;
        const tratamientoMatch = filters.tratamiento === 'Todos' || call.Tratamiento_Interes === filters.tratamiento;

        return estadoMatch && tipoMatch && tratamientoMatch;
    });
}

// Calcular estadísticas
export function calculateStats(calls: CallRecord[]) {
    return {
        total: calls.length,
        citasAgendadas: calls.filter(c => c.Estado === 'Cita Agendada').length,
        callbacksPendientes: calls.filter(c => c.Estado === 'Callback Pendiente').length,
        soloInformacion: calls.filter(c => c.Estado === 'Información').length,
    };
}

// Exportar a CSV
export function exportToCSV(calls: CallRecord[], filename: string = 'llamadas.csv') {
    if (calls.length === 0) return;

    // Obtener los headers
    const headers = Object.keys(calls[0]);

    // Crear filas CSV
    const csvContent = [
        headers.join(','),
        ...calls.map(call =>
            headers.map(header => {
                const value = call[header as keyof CallRecord] || '';
                // Escapar comillas y comas
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(',')
        )
    ].join('\n');

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Obtener color del badge según el estado
export function getEstadoBadgeColor(estado: string): string {
    switch (estado) {
        case 'Cita Agendada':
            return 'bg-green-100 text-green-800';
        case 'Callback Pendiente':
            return 'bg-yellow-100 text-yellow-800';
        case 'Información':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Obtener icono según tipo de paciente
export function getTipoPacienteColor(tipo: string): string {
    switch (tipo) {
        case 'niño':
            return 'text-pink-500';
        case 'adolescente':
            return 'text-indigo-500';
        case 'adulto':
            return 'text-blue-500';
        default:
            return 'text-gray-500';
    }
}
