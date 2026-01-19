import { CallsTableProps } from '@/lib/types';
import { formatDate, getEstadoBadgeColor, getTipoPacienteColor } from '@/lib/utils';
import { User, Baby, Users, Play, Eye } from 'lucide-react';

export default function CallsTable({ calls, onCallClick }: CallsTableProps) {
    const getTipoPacienteIcon = (tipo: string) => {
        switch (tipo) {
            case 'niño':
                return <Baby className="w-4 h-4" />;
            case 'adolescente':
                return <Users className="w-4 h-4" />;
            case 'adulto':
                return <User className="w-4 h-4" />;
            default:
                return <User className="w-4 h-4" />;
        }
    };

    if (calls.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No hay llamadas que coincidan con los filtros seleccionados</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Fecha
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Paciente
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Teléfono
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Tipo
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Interés
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Duración
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {calls.map((call, index) => (
                            <tr
                                key={call.Call_ID || index}
                                onClick={() => onCallClick(call)}
                                className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatDate(call.Timestamp)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900">
                                            {call.Nombre_Paciente || '-'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {call.Telefono || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className={`flex items-center gap-2 ${getTipoPacienteColor(call.Tipo_Paciente)}`}>
                                        {getTipoPacienteIcon(call.Tipo_Paciente)}
                                        <span className="text-sm font-medium capitalize">
                                            {call.Tipo_Paciente || '-'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                    {call.Tratamiento_Interes?.replace('_', ' ') || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoBadgeColor(call.Estado)}`}>
                                        {call.Estado || '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {call.Duracion || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {call.Grabacion_URL && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(call.Grabacion_URL, '_blank');
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Escuchar grabación"
                                            >
                                                <Play className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCallClick(call);
                                            }}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Ver detalles"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
