import { useState, useRef, useCallback, useEffect } from 'react';

interface VideoState {
  playing: boolean;
  currentTime: number;
  duration: number;
  loaded: boolean;
  error: boolean;
}

export function useVideo(src: string) {
  const [state, setState] = useState<VideoState>({
    playing: false,
    currentTime: 0,
    duration: 0,
    loaded: false,
    error: false,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';

    video.addEventListener('loadeddata', () => {
      setState((prev) => ({ ...prev, loaded: true, duration: video.duration }));
    });

    video.addEventListener('error', () => {
      setState((prev) => ({ ...prev, error: true }));
    });

    videoRef.current = video;

    return () => {
      video.pause();
      video.src = '';
    };
  }, [src]);

  const play = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setState((prev) => ({ ...prev, playing: true }));
      } catch {
        setState((prev) => ({ ...prev, playing: false }));
      }
    }
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    setState((prev) => ({ ...prev, playing: false }));
  }, []);

  return { state, videoRef, play, pause };
}
