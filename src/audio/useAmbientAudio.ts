import { useRef, useEffect, useCallback } from 'react';
import { AudioEngine } from './AudioEngine';
import type { ExperiencePhase } from '../types';

export function useAmbientAudio() {
  const engineRef = useRef<AudioEngine | null>(null);
  const currentPhaseRef = useRef<ExperiencePhase | null>(null);

  useEffect(() => {
    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const init = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = new AudioEngine();
    }
    await engineRef.current.init();
  }, []);

  const updatePhase = useCallback(async (phase: ExperiencePhase) => {
    if (!engineRef.current) {
      await init();
    }
    if (phase !== currentPhaseRef.current) {
      currentPhaseRef.current = phase;
      engineRef.current?.updateFromPhase(phase);
    }
  }, [init]);

  const setMuted = useCallback((muted: boolean) => {
    engineRef.current?.setMuted(muted);
  }, []);

  const toggleMute = useCallback(() => {
    return engineRef.current?.toggleMute() ?? true;
  }, []);

  const ensureStarted = useCallback(async () => {
    if (!engineRef.current) {
      await init();
    } else if (engineRef.current) {
      await engineRef.current.init();
    }
  }, [init]);

  return { updatePhase, setMuted, toggleMute, ensureStarted };
}
