import type { ExperiencePhase, MorphState, AspectRatio } from '../types';

type Transition = {
  from: ExperiencePhase;
  to: ExperiencePhase;
  condition: (scroll: number) => boolean;
};

const TRANSITIONS: Transition[] = [
  { from: 'hero-initial',     to: 'hero-morphing',     condition: (s) => s > 0.02 },
  { from: 'hero-morphing',    to: 'hero-morphed',      condition: (s) => s > 0.25 },
  { from: 'hero-morphed',     to: 'scene-reveal',      condition: (s) => s > 0.30 },
  { from: 'scene-reveal',     to: 'zoom-approach',     condition: (s) => s > 0.40 },
  { from: 'zoom-approach',    to: 'zoom-diving',       condition: (s) => s > 0.60 },
  { from: 'zoom-diving',      to: 'zoom-complete',     condition: (s) => s > 0.85 },
  { from: 'zoom-complete',    to: 'content-entrance',  condition: (s) => s > 0.92 },
];

const PHASE_ORDER: ExperiencePhase[] = [
  'hero-initial',
  'hero-morphing',
  'hero-morphed',
  'scene-reveal',
  'zoom-approach',
  'zoom-diving',
  'zoom-complete',
  'content-entrance',
];

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function getAspectRatio(phase: ExperiencePhase): AspectRatio {
  switch (phase) {
    case 'hero-initial':   return '16:9';
    case 'hero-morphing':  return '4:3';
    case 'hero-morphed':   return '9:16';
    default:               return '9:16';
  }
}

function getMorphProgress(scroll: number): number {
  if (scroll <= 0.02) return 0;
  if (scroll >= 0.25) return 1;
  return clamp((scroll - 0.02) / 0.23, 0, 1);
}

function getZoomProgress(scroll: number): number {
  if (scroll <= 0.40) return 0;
  if (scroll >= 0.92) return 1;
  return clamp((scroll - 0.40) / 0.52, 0, 1);
}

function getCameraDepth(scroll: number): number {
  if (scroll <= 0.30) return 0;
  if (scroll >= 0.92) return 1;
  return clamp((scroll - 0.30) / 0.62, 0, 1);
}

export function computeMorphState(scrollProgress: number): MorphState {
  let currentPhase: ExperiencePhase = PHASE_ORDER[0];

  for (const transition of TRANSITIONS) {
    if (currentPhase === transition.from && transition.condition(scrollProgress)) {
      currentPhase = transition.to;
    }
  }

  return {
    phase: currentPhase,
    aspectRatio: getAspectRatio(currentPhase),
    morphProgress: getMorphProgress(scrollProgress),
    zoomProgress: getZoomProgress(scrollProgress),
    cameraDepth: getCameraDepth(scrollProgress),
    isInverted: scrollProgress > 0.60,
  };
}
