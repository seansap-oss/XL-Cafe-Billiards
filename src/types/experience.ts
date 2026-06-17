export type ExperiencePhase =
  | 'hero-initial'      // 16:9 video loop playing
  | 'hero-morphing'     // transitioning aspect ratios
  | 'hero-morphed'      // settled at 9:16
  | 'scene-reveal'      // friend group revealed behind morphed frame
  | 'zoom-approach'     // camera zooming toward phone
  | 'zoom-diving'       // camera diving into phone screen
  | 'zoom-complete'     // phone screen = full viewport
  | 'content-entrance'; // final content revealed

export type AspectRatio = '16:9' | '4:3' | '9:16';

export interface MorphState {
  phase: ExperiencePhase;
  aspectRatio: AspectRatio;
  morphProgress: number;    // 0 → 1
  zoomProgress: number;     // 0 → 1
  cameraDepth: number;      // 0 → 1
  isInverted: boolean;
}

export type AudioContextState = 'suspended' | 'running' | 'closed';

export interface AudioState {
  muted: boolean;
  contextState: AudioContextState;
  volume: number;
}
