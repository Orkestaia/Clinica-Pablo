import { MetricCardProps } from '@/lib/types';

export default function MetricCard({ title, value, icon, color }: MetricCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-green-50 border-green-200',
        yellow: 'bg-yellow-50 border-yellow-200',
        gray: 'bg-gray-50 border-gray-200',
    };

    const iconColorClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        yellow: 'text-yellow-600',
        gray: 'text-gray-600',
    };

    return (
        <div className={`${colorClasses[color]} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`${iconColorClasses[color]} p-3 bg-white rounded-lg shadow-sm`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
