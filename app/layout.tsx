import "./globals.css";

export const metadata = {
  title: "Apex Intel",
  description: "Plateforme IA modulaire pour opérations intelligentes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
