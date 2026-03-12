'use client';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

export default function StatsCards() {
  const stats: StatCard[] = [
    {
      title: 'Total Shipments',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: '📦',
    },
    {
      title: 'Active Routes',
      value: '38',
      change: '+5.2%',
      trend: 'up',
      icon: '🚚',
    },
    {
      title: 'Avg Delivery Time',
      value: '2.4 days',
      change: '-8.1%',
      trend: 'up',
      icon: '⏱️',
    },
    {
      title: 'Cost Savings',
      value: '$12,450',
      change: '+18.3%',
      trend: 'up',
      icon: '💰',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{stat.icon}</div>
            <div
              className={`text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
