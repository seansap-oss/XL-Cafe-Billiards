import { useState, useCallback } from 'react';

interface AudioControlProps {
  onToggleMute: () => boolean;
  onEnableAudio: () => Promise<void>;
  muted: boolean;
}

export function AudioControl({ onToggleMute, onEnableAudio, muted }: AudioControlProps) {
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const handleClick = useCallback(async () => {
    if (!enabled) {
      await onEnableAudio();
      setEnabled(true);
      return;
    }
    onToggleMute();
  }, [enabled, onEnableAudio, onToggleMute]);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label={!enabled ? 'Enable audio' : muted ? 'Unmute audio' : 'Mute audio'}
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: hovered
          ? 'rgba(212,160,74,0.25)'
          : 'rgba(212,160,74,0.1)',
        border: '1px solid rgba(212,160,74,0.3)',
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {!enabled ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a04a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ) : muted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a04a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a04a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}

      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(212,160,74,0.1)',
          transform: hovered ? 'scale(1.4)' : 'scale(1)',
          opacity: hovered ? 0 : 0.5,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </button>
  );
}
