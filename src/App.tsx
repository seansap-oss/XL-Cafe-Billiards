import { useState, useCallback } from 'react';
import { Preloader } from './components';
import { AppRouter } from './app/AppRouter';
import { Website } from './website/Website';

type AppMode = 'website' | 'app';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<AppMode>('website');

  const handleLoaded = useCallback(() => setLoaded(true), []);

  if (mode === 'app') {
    return (
      <>
        {!loaded && <Preloader onComplete={handleLoaded} />}
        <AppRouter />
        <button
          onClick={() => setMode('website')}
          className="fixed top-4 left-4 z-[70] px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(245,240,232,0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Website ↗
        </button>
      </>
    );
  }

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoaded} />}
      <Website onOpenApp={() => setMode('app')} />
    </>
  );
}

export default App;
