import DashboardLayout from '@/components/DashboardLayout';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-500 mt-1">Generate and manage business reports</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Generate Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                📊
              </div>
              <h3 className="font-semibold text-slate-900">Performance Report</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Comprehensive analysis of key performance indicators
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Last generated: Today</span>
              <span className="text-blue-600 font-medium">View →</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                💰
              </div>
              <h3 className="font-semibold text-slate-900">Financial Summary</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Revenue, costs, and profitability analysis
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Last generated: Yesterday</span>
              <span className="text-blue-600 font-medium">View →</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-2xl">
                🚚
              </div>
              <h3 className="font-semibold text-slate-900">Logistics Report</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Fleet utilization and delivery performance
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Last generated: 2 days ago</span>
              <span className="text-blue-600 font-medium">View →</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Reports</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-medium text-slate-900">Q1 Performance Analysis</h4>
                  <p className="text-sm text-slate-500">Generated on Mar 11, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Complete
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Download
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-2xl">💰</div>
                <div>
                  <h4 className="font-medium text-slate-900">Monthly Financial Summary</h4>
                  <p className="text-sm text-slate-500">Generated on Mar 10, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Complete
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Download
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-2xl">🚚</div>
                <div>
                  <h4 className="font-medium text-slate-900">Fleet Utilization Report</h4>
                  <p className="text-sm text-slate-500">Generated on Mar 8, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Complete
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Download
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="text-2xl">📈</div>
                <div>
                  <h4 className="font-medium text-slate-900">Growth Metrics Dashboard</h4>
                  <p className="text-sm text-slate-500">Generated on Mar 5, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Complete
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-blue-100 mb-4">
                Generate custom reports with natural language queries using Apex AI
              </p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Ask AI to Generate Report
              </button>
            </div>
            <div className="text-8xl opacity-20">🤖</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
