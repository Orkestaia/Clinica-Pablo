import { FiltersProps } from '@/lib/types';

export default function Filters({ filters, onFilterChange }: FiltersProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filtro de Estado */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                    </label>
                    <select
                        value={filters.estado}
                        onChange={(e) => onFilterChange({ ...filters, estado: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Todos">Todos</option>
                        <option value="Cita Agendada">Cita Agendada</option>
                        <option value="Callback Pendiente">Callback Pendiente</option>
                        <option value="Información">Información</option>
                    </select>
                </div>

                {/* Filtro de Tipo de Paciente */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Paciente
                    </label>
                    <select
                        value={filters.tipoPaciente}
                        onChange={(e) => onFilterChange({ ...filters, tipoPaciente: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Todos">Todos</option>
                        <option value="niño">Niño</option>
                        <option value="adolescente">Adolescente</option>
                        <option value="adulto">Adulto</option>
                    </select>
                </div>

                {/* Filtro de Tratamiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tratamiento
                    </label>
                    <select
                        value={filters.tratamiento}
                        onChange={(e) => onFilterChange({ ...filters, tratamiento: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Todos">Todos</option>
                        <option value="interceptiva">Interceptiva</option>
                        <option value="brackets">Brackets</option>
                        <option value="alineadores">Alineadores</option>
                        <option value="no_especificado">No Especificado</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
