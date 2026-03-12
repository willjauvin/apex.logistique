'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊', section: 'core' },
  { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: '🤖', section: 'core' },
  { name: 'Logistics', href: '/dashboard/logistics', icon: '🚚', section: 'modules' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈', section: 'modules' },
  { name: 'Automation', href: '/dashboard/automation', icon: '⚡', section: 'modules' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📋', section: 'modules' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Apex Intel</h1>
        <p className="text-sm text-slate-400 mt-1">Modular AI Platform</p>
      </div>

      <nav className="flex-1">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Core
          </h3>
          <ul className="space-y-1">
            {navigation.filter(item => item.section === 'core').map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Modules
          </h3>
          <ul className="space-y-1">
            {navigation.filter(item => item.section === 'modules').map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="text-xs text-slate-500">
          &copy; 2026 Apex Intel
        </div>
      </div>
    </aside>
  );
}
