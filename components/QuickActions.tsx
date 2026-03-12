'use client';

export default function QuickActions() {
  const actions = [
    { icon: '📦', label: 'New Shipment', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: '📊', label: 'Generate Report', color: 'bg-green-600 hover:bg-green-700' },
    { icon: '🚚', label: 'Manage Fleet', color: 'bg-orange-600 hover:bg-orange-700' },
    { icon: '🤖', label: 'Ask AI', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 text-white rounded-lg transition-colors ${action.color}`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">System Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">AI Engine</span>
            <span className="flex items-center gap-2 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Database</span>
            <span className="flex items-center gap-2 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">API Status</span>
            <span className="flex items-center gap-2 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
