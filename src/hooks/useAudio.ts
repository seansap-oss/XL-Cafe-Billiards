import { useState, useRef, useCallback, useEffect } from 'react';
import type { AudioState } from '../types';

export function useAudio() {
  const [state, setState] = useState<AudioState>({
    muted: true,
    contextState: 'suspended',
    volume: 0.7,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      if (contextRef.current?.state !== 'closed') {
        contextRef.current?.close();
      }
    };
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
    setState((prev) => ({ ...prev, muted }));
  }, []);

  const toggleMute = useCallback(() => {
    setMuted(!state.muted);
  }, [state.muted, setMuted]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setState((prev) => ({ ...prev, volume }));
  }, []);

  const loadSource = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, []);

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setState((prev) => ({ ...prev, contextState: 'running' }));
      } catch {
        setState((prev) => ({ ...prev, contextState: 'suspended' }));
      }
    }
  }, []);

  return { state, setMuted, toggleMute, setVolume, loadSource, play };
}
