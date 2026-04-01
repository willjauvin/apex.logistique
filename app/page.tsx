import Link from "next/link";

/* TYPES */
type FeatureProps = {
  icon: string;
  title: string;
  text: string;
};

type ArchitectureProps = {
  title: string;
  text: string;
};

type ModuleProps = {
  title: string;
  text: string;
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900/40 to-slate-900 text-white">

      {/* HERO */}
      <section className="container mx-auto px-6 pt-28 pb-32 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6">
          Apex Intel
        </h1>
        <p className="text-2xl text-blue-200 font-light max-w-3xl mx-auto mb-10">
          La plateforme IA modulaire qui optimise vos opérations, automatise vos décisions
          et propulse votre entreprise vers l’avenir.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/dashboard"
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-blue-700/40 transition-all"
          >
            Accéder au tableau de bord →
          </Link>

          <a
            href="#modules"
            className="px-10 py-4 border border-white/20 hover:bg-white/10 rounded-lg font-semibold transition-all"
          >
            Explorer les modules
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-16">Ce que Apex peut faire</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <FeatureCard
            icon="🤖"
            title="Apex AI"
            text="Assistant intelligent, interface conversationnelle, analyse automatisée et prise de décision guidée par l’IA."
          />

          <FeatureCard
            icon="🚚"
            title="Apex Logistics"
            text="Optimisation de routes, gestion de flotte, prévision des livraisons et automatisation logistique."
          />

          <FeatureCard
            icon="📈"
            title="Apex Analytics"
            text="Analyse de séries temporelles, KPI, tableaux de bord intelligents et insights automatisés."
          />

        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-10">Architecture IA flexible</h2>
        <p className="text-slate-300 text-center max-w-3xl mx-auto mb-16">
          Apex Intel est conçu pour fonctionner avec plusieurs fournisseurs d’IA.
          Vous pouvez basculer entre différents modèles (OpenAI, Anthropic, Azure, etc.)
          sans modifier votre infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <ArchitectureCard
            title="Provider Agnostic"
            text="Choisissez le modèle IA le plus performant pour votre cas d’usage."
          />

          <ArchitectureCard
            title="Scalable"
            text="Une architecture pensée pour croître avec votre entreprise."
          />

          <ArchitectureCard
            title="Modulaire"
            text="Activez uniquement les modules dont vous avez besoin."
          />

        </div>
      </section>

      {/* INTEGRATION SIMPLISHOPS */}
      <section className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-10">Intégration avec Simplishops</h2>
        <p className="text-slate-300 text-center max-w-3xl mx-auto mb-16">
          Apex Intel est le moteur IA derrière Simplishops, votre plateforme e‑commerce simplifiée.
          Analyse automatique des ventes, recommandations produits, optimisation des prix,
          génération de descriptions et plus encore.
        </p>

        <div className="flex justify-center">
          <a
            href="#"
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-blue-700/40 transition-all"
          >
            Découvrir Simplishops →
          </a>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="container mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-center mb-16">Modules Apex</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <ModuleCard title="Apex Core" text="Le moteur IA central qui orchestre les modèles et les données." />
          <ModuleCard title="Apex Vision" text="Analyse d’images, détection d’objets, OCR et vision par ordinateur." />
          <ModuleCard title="Apex Commerce" text="IA dédiée au e‑commerce : recommandations, pricing, descriptions." />
          <ModuleCard title="Apex Ops" text="Automatisation des workflows et optimisation opérationnelle." />
          <ModuleCard title="Apex Data" text="Pipeline de données, nettoyage, transformation et ingestion." />
          <ModuleCard title="Apex Realtime" text="Monitoring en temps réel et alertes intelligentes." />

        </div>
      </section>

      {/* CTA FINALE */}
      <section className="container mx-auto px-6 pb-32 text-center">
        <h2 className="text-4xl font-bold mb-6">Prêt à essayer Apex Intel ?</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-10">
          Accédez au tableau de bord et commencez à explorer la puissance de l’IA modulaire.
        </p>

        <Link
          href="/dashboard"
          className="px-12 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-blue-700/40 transition-all"
        >
          Lancer Apex →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-slate-400">
        <p>Apex Intel — Une solution de Jauvin Multitech</p>
        <p className="text-xs mt-2">© {new Date().getFullYear()} Tous droits réservés.</p>
      </footer>

    </div>
  );
}

/* COMPONENTS */

function FeatureCard({ icon, title, text }: FeatureProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-blue-400/40 transition-all">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{text}</p>
    </div>
  );
}

function ArchitectureCard({ title, text }: ArchitectureProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{text}</p>
    </div>
  );
}

function ModuleCard({ title, text }: ModuleProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-blue-400/40 transition-all">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{text}</p>
    </div>
  );
}
