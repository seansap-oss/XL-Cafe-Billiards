import type { ReactNode } from 'react';

export type AppPage = 'home' | 'scan' | 'rewards' | 'profile';

interface AppLayoutProps {
  children: ReactNode;
  page: AppPage;
  onNavigate: (page: AppPage) => void;
}

const NAV_ITEMS: { page: AppPage; label: string; icon: ReactNode }[] = [
  {
    page: 'home',
    label: 'Home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    page: 'scan',
    label: 'Scan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    page: 'rewards',
    label: 'Rewards',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    page: 'profile',
    label: 'Profile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function AppLayout({ children, page, onNavigate }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-obsidian" style={{ maxWidth: 480, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      {/* Status bar spacer */}
      <div className="h-[env(safe-area-inset-top)]" style={{ background: '#0a0a0c' }} />

      {/* Page content */}
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 72 }}>
        {children}
      </main>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          maxWidth: 480,
          margin: '0 auto',
          background: 'rgba(10,10,12,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const active = page === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer"
                style={{
                  background: 'none',
                  border: 'none',
                  color: active ? '#d4a04a' : 'rgba(245,240,232,0.3)',
                  transition: 'color 0.2s ease',
                }}
              >
                <div style={{ transform: active ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s ease' }}>
                  {item.icon}
                </div>
                <span className="text-[9px] tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  {item.label}
                </span>
                {active && (
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: '#d4a04a', marginTop: -2 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
