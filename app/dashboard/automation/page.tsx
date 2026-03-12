import DashboardLayout from '@/components/DashboardLayout';

export default function AutomationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Automation Engine</h1>
          <p className="text-slate-500 mt-1">Build workflows and automate business processes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Active Workflows</h3>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Tasks Executed</h3>
            <p className="text-3xl font-bold text-slate-900">1,547</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Time Saved</h3>
            <p className="text-3xl font-bold text-slate-900">48h</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Success Rate</h3>
            <p className="text-3xl font-bold text-slate-900">98.3%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Workflow Templates</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Create Workflow
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                  📧
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">Automated Reports</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Send daily performance reports via email
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
                    <span>Runs daily at 9:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl flex-shrink-0">
                  🔔
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">Delay Notifications</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Alert customers when deliveries are delayed
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
                    <span>Event-triggered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">
                  📊
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">KPI Monitoring</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Track metrics and trigger alerts on thresholds
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
                    <span>Continuous monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl flex-shrink-0">
                  🗂️
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">Data Backup</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Automatic database backups to secure storage
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
                    <span>Weekly schedule</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">AI-Powered Workflow Builder</h3>
              <p className="text-purple-100 mb-4">
                Describe your process in plain English and let AI create the workflow for you
              </p>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
                Try AI Builder
              </button>
            </div>
            <div className="text-8xl opacity-20">🤖</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Daily report sent successfully</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Customer notification delivered</p>
                <p className="text-xs text-slate-500">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Data backup completed</p>
                <p className="text-xs text-slate-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
