import DashboardLayout from '@/components/DashboardLayout';

export default function LogisticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Logistics Intelligence</h1>
          <p className="text-slate-500 mt-1">Optimize routes, manage fleet, and predict delivery times</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                🗺️
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Route Optimization</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              AI-powered route planning to minimize distance and fuel costs
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Optimize Routes
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                🚚
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Fleet Management</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Monitor vehicle utilization and manage fleet efficiency
            </p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              View Fleet
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-2xl">
                📍
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Delivery Prediction</h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Accurate ETA predictions considering traffic and weather
            </p>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Predict ETAs
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Fleet Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-sm text-slate-600">Total Vehicles</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">18</div>
              <div className="text-sm text-slate-600">Active Routes</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">75%</div>
              <div className="text-sm text-slate-600">Utilization</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">12.5</div>
              <div className="text-sm text-slate-600">Avg MPG</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">AI-Powered Optimization</h3>
              <p className="text-blue-100 mb-4">
                Let Apex AI analyze your logistics data and provide optimization recommendations
              </p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Run AI Analysis
              </button>
            </div>
            <div className="text-8xl opacity-20">🤖</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
