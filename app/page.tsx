import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              Apex Intel
            </h1>
            <p className="text-2xl text-blue-200">
              Modular AI Platform for Intelligent Business Operations
            </p>
          </div>

          <p className="text-lg text-slate-300 max-w-2xl mb-12">
            Harness the power of AI to optimize logistics, analyze data, and automate workflows.
            Built with a provider-agnostic architecture for ultimate flexibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Apex AI</h3>
              <p className="text-slate-300 text-sm">
                Intelligent assistant with conversational interface and data analysis
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Logistics</h3>
              <p className="text-slate-300 text-sm">
                Route optimization, fleet management, and delivery prediction
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-slate-300 text-sm">
                Time series analysis, KPI tracking, and business intelligence
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Enter Dashboard
            <span>→</span>
          </Link>

          <div className="mt-16 flex gap-8 text-sm text-slate-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">3+</div>
              <div>Core Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">AI</div>
              <div>Provider Agnostic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div>Scalable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
