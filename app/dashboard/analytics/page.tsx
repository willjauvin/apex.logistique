import DashboardLayout from '@/components/DashboardLayout';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Business Analytics</h1>
          <p className="text-slate-500 mt-1">Advanced data analysis and business intelligence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📊</div>
              <div className="text-sm font-semibold text-green-600">+15.3%</div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Revenue</h3>
            <p className="text-3xl font-bold text-slate-900">$45,231</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📈</div>
              <div className="text-sm font-semibold text-green-600">+8.2%</div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Growth Rate</h3>
            <p className="text-3xl font-bold text-slate-900">12.4%</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">💰</div>
              <div className="text-sm font-semibold text-red-600">-4.1%</div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Operating Costs</h3>
            <p className="text-3xl font-bold text-slate-900">$28,450</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">⚡</div>
              <div className="text-sm font-semibold text-green-600">+22.1%</div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Efficiency</h3>
            <p className="text-3xl font-bold text-slate-900">87.3%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Performance Trends</h2>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center text-slate-400">
                <div className="text-4xl mb-2">📈</div>
                <p>Chart visualization area</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Key Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Revenue Growth</h4>
                    <p className="text-sm text-slate-600">
                      Revenue increased 15.3% this quarter, driven by operational efficiency
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Cost Reduction</h4>
                    <p className="text-sm text-slate-600">
                      Operating costs down 4.1% through route optimization
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Attention Needed</h4>
                    <p className="text-sm text-slate-600">
                      Fleet utilization could be improved by 12% in off-peak hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">AI-Generated Recommendations</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Generate New Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-slate-900 mb-2">Focus Area</h4>
              <p className="text-sm text-slate-600">
                Optimize delivery windows during peak traffic hours to reduce delays by 15%
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-slate-900 mb-2">Cost Saving</h4>
              <p className="text-sm text-slate-600">
                Consolidate routes in metro areas could save $3,200 monthly in fuel costs
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold text-slate-900 mb-2">Growth Opportunity</h4>
              <p className="text-sm text-slate-600">
                Expand service to adjacent regions with projected 25% revenue increase
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
