import { useState } from 'react';
import { AppLayout, type AppPage } from './AppLayout';
import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';
import { RewardsPage } from './pages/RewardsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useMember } from './useMember';

export function AppRouter() {
  const [page, setPage] = useState<AppPage>('home');
  const memberState = useMember();

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage member={memberState.member} />;
      case 'scan': return <ScanPage member={memberState.member} onScan={memberState.addPoints} onStreak={memberState.incrementStreak} />;
      case 'rewards': return <RewardsPage member={memberState.member} onRedeem={memberState.redeemReward} canSpin={memberState.canSpin} onSpinWin={memberState.addSpinWin} />;
      case 'profile': return <ProfilePage member={memberState.member} history={memberState.getHistory()} />;
    }
  };

  return (
    <AppLayout page={page} onNavigate={setPage}>
      {renderPage()}
    </AppLayout>
  );
}
