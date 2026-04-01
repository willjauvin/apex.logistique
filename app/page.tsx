"use client";

import Link from "next/link";

/* TYPES */
type FeatureProps = { icon: string; title: string; text: string };
type ArchitectureProps = { title: string; text: string };
type ModuleProps = { title: string; text: string };

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900/30 to-slate-900 text-white">

      {/* HERO */}
      <section className="container mx-auto px-6 pt-32 pb-40 text-center">
        <h1 className="text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
          Apex Intel
        </h1>

        <p className="text-2xl text-blue-200 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
          Une plateforme d’intelligence artificielle modulaire conçue pour analyser, optimiser
          et automatiser vos opérations — sans complexité technique.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/dashboard"
            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg hover:shadow-blue-700/40 transition-all text-lg"
          >
            Lancer Apex →
          </Link>

          <a
            href="#modules"
            className="px-12 py-4 border border-white/20 hover:bg-white/10 rounded-xl font-semibold transition-all text-lg"
          >
            Explorer les modules
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-20">Ce que Apex peut faire</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <FeatureCard
            icon="🤖"
            title="Apex AI"
            text="Assistant intelligent, interface conversationnelle et analyse automatisée."
          />

          <FeatureCard
            icon="🚚"
            title="Apex Logistics"
            text="Optimisation de routes, gestion de flotte et prévision des livraisons."
          />

          <FeatureCard
            icon="📈"
            title="Apex Analytics"
            text="Analyse de données, KPI intelligents et insights automatisés."
          />

        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-12">Architecture IA avancée</h2>

        <p className="text-slate-300 text-center max-w-3xl mx-auto mb-20 leading-relaxed">
          Une architecture pensée pour offrir performance, fiabilité et évolutivité.
          Chaque module travaille en synergie pour analyser, optimiser et automatiser vos opérations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">

          <ArchitectureCard
            title="Optimisée"
            text="Des performances constantes, même à grande échelle."
          />

          <ArchitectureCard
            title="Évolutive"
            text="Apex grandit avec votre entreprise, sans refonte technique."
          />

          <ArchitectureCard
            title="Orchestrée"
            text="Chaque module IA remplit un rôle précis dans l’écosystème Apex."
          />

        </div>
      </section>

      {/* SIMPLISHOPS */}
      <section className="container mx-auto px-6 pb-32 text-center">
        <h2 className="text-4xl font-bold mb-10">Intégration avec Simplishops</h2>

        <p className="text-slate-300 max-w-3xl mx-auto mb-16 leading-relaxed">
          Apex Intel est le moteur IA derrière Simplishops, votre plateforme e‑commerce simplifiée.
          Recommandations produits, analyse des ventes, génération de contenu et optimisation intelligente.
        </p>

        <a
          href="#"
          className="px-12 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg hover:shadow-blue-700/40 transition-all text-lg"
        >
          Découvrir Simplishops →
        </a>
      </section>

      {/* MODULES */}
      <section id="modules" className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-20">Modules Apex</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <ModuleCard title="Apex Core" text="Le moteur IA central qui orchestre les modèles et les données." />
          <ModuleCard title="Apex Vision" text="Analyse d’images, OCR et vision par ordinateur." />
          <ModuleCard title="Apex Commerce" text="IA dédiée au e‑commerce : recommandations, pricing, descriptions." />
          <ModuleCard title="Apex Ops" text="Automatisation des workflows et optimisation opérationnelle." />
          <ModuleCard title="Apex Data" text="Pipeline de données, nettoyage, transformation et ingestion." />
          <ModuleCard title="Apex Realtime" text="Monitoring en temps réel et alertes intelligentes." />

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 text-center text-slate-400">
        <p>Apex Intel — Une solution de Jauvin Multitech</p>
        <p className="text-xs mt-2">© {new Date().getFullYear()} Tous droits réservés.</p>
      </footer>

    </div>
  );
}

/* COMPONENTS */

function FeatureCard({ icon, title, text }: FeatureProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all shadow-lg hover:shadow-blue-900/20">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-300 text-base">{text}</p>
    </div>
  );
}

function ArchitectureCard({ title, text }: ArchitectureProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-900/20 transition-all">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-300 text-base">{text}</p>
    </div>
  );
}

function ModuleCard({ title, text }: ModuleProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all shadow-lg hover:shadow-blue-900/20">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-300 text-base">{text}</p>
    </div>
  );
}
