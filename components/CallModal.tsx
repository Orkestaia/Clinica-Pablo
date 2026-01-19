import { CallModalProps } from '@/lib/types';
import { getEstadoBadgeColor } from '@/lib/utils';
import { X, Phone, User, Clock, Calendar, FileText, MessageSquare, Play } from 'lucide-react';

export default function CallModal({ call, isOpen, onClose }: CallModalProps) {
    if (!isOpen || !call) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between rounded-t-2xl">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {call.Nombre_Paciente}
                            </h2>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{call.Telefono}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoBadgeColor(call.Estado)}`}>
                                    {call.Estado}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-6 space-y-6">
                        {/* Grid de información básica */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-medium">Tipo de Paciente</span>
                                </div>
                                <p className="text-lg font-semibold text-gray-900 capitalize">
                                    {call.Tipo_Paciente || '-'}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm font-medium">Interés</span>
                                </div>
                                <p className="text-lg font-semibold text-gray-900 capitalize">
                                    {call.Tratamiento_Interes?.replace('_', ' ') || '-'}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-sm font-medium">Motivo</span>
                                </div>
                                <p className="text-lg font-semibold text-gray-900 capitalize">
                                    {call.Motivo_Llamada?.replace('_', ' ') || '-'}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">Duración</span>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">
                                    {call.Duracion || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Cita Agendada */}
                        {call.Fecha_Cita && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-blue-800 mb-2">
                                    <Calendar className="w-5 h-5" />
                                    <h3 className="font-semibold text-lg">Cita Agendada</h3>
                                </div>
                                <p className="text-blue-900 text-lg">
                                    <span className="font-semibold">{call.Fecha_Cita}</span>
                                    {call.Hora_Cita && <span> a las {call.Hora_Cita}</span>}
                                </p>
                            </div>
                        )}

                        {/* Callback Pendiente */}
                        {call.Fecha_Callback && (
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                                    <Phone className="w-5 h-5" />
                                    <h3 className="font-semibold text-lg">Callback Pendiente</h3>
                                </div>
                                <p className="text-yellow-900 text-lg">
                                    <span className="font-semibold">{call.Fecha_Callback}</span>
                                    {call.Hora_Callback && <span> a las {call.Hora_Callback}</span>}
                                </p>
                            </div>
                        )}

                        {/* Notas */}
                        {call.Notas && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Notas
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-700 whitespace-pre-wrap">{call.Notas}</p>
                                </div>
                            </div>
                        )}

                        {/* Resumen */}
                        {call.Resumen && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Resumen de la Llamada
                                </h3>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                    <p className="text-gray-700 whitespace-pre-wrap">{call.Resumen}</p>
                                </div>
                            </div>
                        )}

                        {/* Grabación */}
                        {call.Grabacion_URL && (
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => window.open(call.Grabacion_URL, '_blank')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Play className="w-5 h-5" />
                                    Escuchar Grabación
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
