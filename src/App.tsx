import { useState, useCallback, Suspense, lazy, useEffect } from 'react';
import { useScrollProgress, useSmoothValue, useReducedMotion } from './hooks';
import { computeMorphState } from './state';
import { useAmbientAudio } from './audio';
import {
  Preloader,
  HeroMorph,
  InfiniteZoom,
  AudioControl,
  CinematicScene,
  FriendGroupScene,
  ScrollIndicator,
  ContentEntrance,
  BamPromo,
  RockOfFrame,
  Events,
  RewardsWidget,
  Footer,
  ProgressBar,
  PhaseIndicator,
  Navigation,
  CustomCursor,
  HeroCanvas,
} from './components';
import { AppRouter } from './app/AppRouter';

const ZoomScene = lazy(() =>
  import('./components/ZoomScene').then((m) => ({ default: m.ZoomScene }))
);

function ZoomFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-amber-glow/30 border-t-amber-glow animate-spin" />
    </div>
  );
}

type AppMode = 'experience' | 'app';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [mode, setMode] = useState<AppMode>('app');
  const rawScroll = useScrollProgress();
  const reducedMotion = useReducedMotion();
  const smoothScroll = useSmoothValue(rawScroll, reducedMotion ? 0.5 : 0.06);
  const morphState = computeMorphState(smoothScroll);

  const { updatePhase, setMuted: engineSetMuted, toggleMute, ensureStarted } = useAmbientAudio();

  const showWebGL = !reducedMotion && (morphState.phase === 'zoom-approach' || morphState.phase === 'zoom-diving' || morphState.phase === 'zoom-complete');
  const showBam = morphState.phase === 'zoom-complete' || morphState.phase === 'content-entrance';
  const showContent = morphState.phase === 'content-entrance';

  useEffect(() => {
    updatePhase(morphState.phase);
  }, [morphState.phase, updatePhase]);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  const handleToggleMute = useCallback(() => {
    const newMuted = toggleMute();
    setMuted(newMuted);
    return newMuted;
  }, [toggleMute]);

  const handleEnableAudio = useCallback(async () => {
    await ensureStarted();
    engineSetMuted(false);
    setMuted(false);
  }, [ensureStarted, engineSetMuted]);

  const toggleMode = useCallback(() => {
    setMode((m) => m === 'experience' ? 'app' : 'experience');
  }, []);

  // App mode — mobile app experience
  if (mode === 'app') {
    return (
      <>
        {!loaded && <Preloader onComplete={handleLoaded} />}
        <AppRouter />
        {/* Mode toggle — hidden in production, visible in dev */}
        <button
          onClick={toggleMode}
          className="fixed top-4 left-4 z-[70] px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(245,240,232,0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Experience ↗
        </button>
      </>
    );
  }

  // Experience mode — full cinematic scroll
  return (
    <>
      {!loaded && <Preloader onComplete={handleLoaded} />}
      <CustomCursor />
      <button
        onClick={toggleMode}
        className="fixed top-4 left-4 z-[70] px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(245,240,232,0.3)',
          backdropFilter: 'blur(8px)',
        }}
      >
        App ↗
      </button>

      <div className="relative" style={{ height: '800vh', background: '#0a0a0c' }}>
        <div className="fixed inset-0 overflow-hidden" style={{ background: '#0a0a0c' }}>
          <HeroMorph morphState={morphState}>
            <HeroCanvas reducedMotion={reducedMotion} />
          </HeroMorph>

          <InfiniteZoom morphState={morphState}>
            <div className="relative w-full h-full">
              <FriendGroupScene morphState={morphState} />
              <CinematicScene morphState={morphState} />
            </div>
          </InfiniteZoom>

          {showWebGL && (
            <div
              className="absolute inset-0"
              style={{
                opacity: morphState.phase === 'zoom-approach' ? morphState.zoomProgress * 0.6 : 0.8,
                zIndex: 15,
                pointerEvents: 'none',
              }}
            >
              <Suspense fallback={<ZoomFallback />}>
                <ZoomScene morphState={morphState} />
              </Suspense>
            </div>
          )}

          {showBam && <BamPromo morphState={morphState} />}

          <div
            className="absolute inset-0 overflow-y-auto"
            style={{
              opacity: showContent ? 1 : 0,
              transition: reducedMotion ? 'none' : 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: showContent ? 'auto' : 'none',
              zIndex: showContent ? 30 : 0,
            }}
          >
            <div id="xl-live" />
            <ContentEntrance morphState={morphState} />
            <div id="xl-billiards" />
            <div id="xl-cafe" />
            <div id="rock-of-frame" />
            <RockOfFrame morphState={morphState} />
            <div id="events" />
            <Events morphState={morphState} />
            <div id="rewards" />
            <RewardsWidget visible={showContent} />
            <Footer morphState={morphState} />
          </div>

          <Navigation phase={morphState.phase} />
          <AudioControl
            muted={muted}
            onToggleMute={handleToggleMute}
            onEnableAudio={handleEnableAudio}
          />
          <ScrollIndicator morphState={morphState} />
          <ProgressBar morphState={morphState} />
          <PhaseIndicator morphState={morphState} />
        </div>
      </div>
    </>
  );
}

export default App;
