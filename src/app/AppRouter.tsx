import { useState, useCallback } from 'react';
import { AppLayout, type AppPage } from './AppLayout';
import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';
import { RewardsPage } from './pages/RewardsPage';
import { ProfilePage } from './pages/ProfilePage';

export function AppRouter() {
  const [page, setPage] = useState<AppPage>('home');

  const handleScanComplete = useCallback((code: string) => {
    console.log('Scan completed:', code);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'scan': return <ScanPage onScanComplete={handleScanComplete} />;
      case 'rewards': return <RewardsPage />;
      case 'profile': return <ProfilePage />;
    }
  };

  return (
    <AppLayout page={page} onNavigate={setPage}>
      {renderPage()}
    </AppLayout>
  );
}
