// Tipos de datos del Google Sheet
export interface CallRecord {
    Timestamp: string;
    Call_ID: string;
    Nombre_Paciente: string;
    Telefono: string;
    Tipo_Paciente: TipoPaciente;
    Tratamiento_Interes: TratamientoInteres;
    Motivo_Llamada: MotivoLlamada;
    Estado: Estado;
    Fecha_Cita?: string;
    Hora_Cita?: string;
    Fecha_Callback?: string;
    Hora_Callback?: string;
    Duracion: string;
    Notas?: string;
    Resumen?: string;
    Transcripcion?: string;
    Grabacion_URL?: string;
}

export type TipoPaciente = 'niño' | 'adolescente' | 'adulto' | '';
export type TratamientoInteres = 'interceptiva' | 'brackets' | 'alineadores' | 'no_especificado' | '';
export type MotivoLlamada = 'primera_consulta' | 'informacion' | 'urgencia' | 'revision' | 'callback' | '';
export type Estado = 'Cita Agendada' | 'Callback Pendiente' | 'Información' | '';

export interface FilterState {
    estado: Estado | 'Todos';
    tipoPaciente: TipoPaciente | 'Todos';
    tratamiento: TratamientoInteres | 'Todos';
}

export interface MetricCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'yellow' | 'gray';
}

export interface CallModalProps {
    call: CallRecord | null;
    isOpen: boolean;
    onClose: () => void;
}

export interface CallsTableProps {
    calls: CallRecord[];
    onCallClick: (call: CallRecord) => void;
}

export interface FiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}
