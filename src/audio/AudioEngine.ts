import type { ExperiencePhase } from '../types';

type SoundscapeType = 'lounge' | 'billiards' | 'cafe' | 'nights' | 'silence';

const PHASE_TO_SOUNDSCAPE: Record<ExperiencePhase, SoundscapeType> = {
  'hero-initial':     'lounge',
  'hero-morphing':    'lounge',
  'hero-morphed':     'billiards',
  'scene-reveal':     'billiards',
  'zoom-approach':    'nights',
  'zoom-diving':      'nights',
  'zoom-complete':    'silence',
  'content-entrance': 'cafe',
};

interface Layer {
  node: AudioNode;
  gain: GainNode;
  type: string;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private layers: Map<string, Layer> = new Map();
  private activeSoundscape: SoundscapeType = 'silence';
  private muted = false;
  private initialized = false;
  private noiseBuffer: AudioBuffer | null = null;

  async init() {
    if (this.initialized) return;

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);

    this.noiseBuffer = this.createNoiseBuffer();
    this.initialized = true;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  private createNoiseBuffer(): AudioBuffer {
    const sampleRate = this.ctx!.sampleRate;
    const length = sampleRate * 4;
    const buffer = this.ctx!.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1);
      }
    }
    return buffer;
  }

  private createNoiseSource(type: BiquadFilterType = 'lowpass', freq = 800): Layer {
    if (!this.ctx || !this.noiseBuffer) throw new Error('Not initialized');

    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = 1;

    const gain = this.ctx.createGain();
    gain.gain.value = 0;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    source.start();

    return { node: filter, gain, type: `noise-${type}` };
  }

  private createTone(freq: number, type: OscillatorType = 'sine', detune = 0): Layer {
    if (!this.ctx) throw new Error('Not initialized');

    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;

    const gain = this.ctx.createGain();
    gain.gain.value = 0;

    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start();

    return { node: osc, gain, type: `tone-${freq}` };
  }

  private createLFO(freq: number, depth: number, target: AudioParam): Layer {
    if (!this.ctx) throw new Error('Not initialized');

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = this.ctx.createGain();
    gain.gain.value = depth;

    osc.connect(gain);
    gain.connect(target);
    osc.start();

    return { node: osc, gain, type: 'lfo' };
  }

  private buildSoundscape(type: SoundscapeType) {
    if (!this.ctx) return;

    // Clean up old layers
    this.layers.forEach((layer) => {
      try {
        layer.gain.gain.setValueAtTime(layer.gain.gain.value, this.ctx!.currentTime);
        layer.gain.gain.linearRampToValueAtTime(0, this.ctx!.currentTime + 0.5);
        setTimeout(() => {
          try { (layer.node as any).stop?.(); } catch {}
        }, 600);
      } catch {}
    });
    this.layers.clear();

    switch (type) {
      case 'lounge': this.buildLounge(); break;
      case 'billiards': this.buildBilliards(); break;
      case 'cafe': this.buildCafe(); break;
      case 'nights': this.buildNights(); break;
      case 'silence': break;
    }
  }

  private buildLounge() {
    if (!this.ctx) return;

    // Low ambient rumble
    const rumble = this.createNoiseSource('lowpass', 120);
    rumble.gain.gain.value = 0;
    this.layers.set('rumble', rumble);

    // Distant crowd murmur
    const murmur = this.createNoiseSource('bandpass', 400);
    murmur.gain.gain.value = 0;
    this.layers.set('murmur', murmur);

    // Occasional low tone (distant bass)
    const bass = this.createTone(55, 'sine');
    bass.gain.gain.value = 0;
    this.layers.set('bass', bass);

    // LFO on murmur for natural wavering
    const murmurFilter = murmur.node as BiquadFilterNode;
    this.createLFO(0.3, 80, murmurFilter.frequency);
  }

  private buildBilliards() {
    if (!this.ctx) return;

    // Room tone
    const room = this.createNoiseSource('lowpass', 200);
    room.gain.gain.value = 0;
    this.layers.set('room', room);

    // Filtered noise for "room presence"
    const presence = this.createNoiseSource('bandpass', 600);
    presence.gain.gain.value = 0;
    this.layers.set('presence', presence);

    // Periodic clack sounds via oscillator modulation
    const clack = this.createTone(2200, 'square');
    clack.gain.gain.value = 0;
    this.layers.set('clack', clack);

    // Sub bass for atmosphere
    const sub = this.createTone(40, 'sine');
    sub.gain.gain.value = 0;
    this.layers.set('sub', sub);
  }

  private buildCafe() {
    if (!this.ctx) return;

    // Espresso machine hiss
    const hiss = this.createNoiseSource('highpass', 3000);
    hiss.gain.gain.value = 0;
    this.layers.set('hiss', hiss);

    // Ambient room
    const room = this.createNoiseSource('lowpass', 300);
    room.gain.gain.value = 0;
    this.layers.set('room', room);

    // Ceramic clink tones
    const clink1 = this.createTone(3500, 'sine');
    clink1.gain.gain.value = 0;
    this.layers.set('clink1', clink1);

    const clink2 = this.createTone(4200, 'sine');
    clink2.gain.gain.value = 0;
    this.layers.set('clink2', clink2);

    // Warm pad
    const pad = this.createTone(110, 'triangle', 3);
    pad.gain.gain.value = 0;
    this.layers.set('pad', pad);
  }

  private buildNights() {
    if (!this.ctx) return;

    // Deep bass pulse
    const bass = this.createTone(50, 'sine');
    bass.gain.gain.value = 0;
    this.layers.set('bass', bass);

    // Sub bass
    const sub = this.createTone(30, 'sine');
    sub.gain.gain.value = 0;
    this.layers.set('sub', sub);

    // Crowd energy noise
    const crowd = this.createNoiseSource('bandpass', 500);
    crowd.gain.gain.value = 0;
    this.layers.set('crowd', crowd);

    // High shimmer
    const shimmer = this.createNoiseSource('highpass', 5000);
    shimmer.gain.gain.value = 0;
    this.layers.set('shimmer', shimmer);

    // LFO on bass for pulse
    const bassOsc = bass.node as OscillatorNode;
    this.createLFO(0.25, 20, bassOsc.frequency);
  }

  private crossfadeTo(type: SoundscapeType) {
    if (!this.ctx || !this.masterGain) return;
    if (type === this.activeSoundscape) return;

    this.activeSoundscape = type;
    this.buildSoundscape(type);

    const now = this.ctx.currentTime;
    const fadeTime = 1.5;

    // Fade master in
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);

    if (type === 'silence') {
      this.masterGain.gain.linearRampToValueAtTime(0, now + fadeTime);
      return;
    }

    this.masterGain.gain.linearRampToValueAtTime(this.muted ? 0 : 0.35, now + 0.3);

    // Set individual layer volumes based on soundscape
    this.layers.forEach((layer, key) => {
      const targetVol = this.getLayerVolume(type, key);
      layer.gain.gain.cancelScheduledValues(now);
      layer.gain.gain.setValueAtTime(layer.gain.gain.value, now);
      layer.gain.gain.linearRampToValueAtTime(targetVol, now + fadeTime);
    });
  }

  private getLayerVolume(type: SoundscapeType, key: string): number {
    const volumes: Record<SoundscapeType, Record<string, number>> = {
      lounge: { rumble: 0.15, murmur: 0.08, bass: 0.04 },
      billiards: { room: 0.1, presence: 0.06, clack: 0.02, sub: 0.05 },
      cafe: { hiss: 0.04, room: 0.08, clink1: 0.01, clink2: 0.008, pad: 0.06 },
      nights: { bass: 0.12, sub: 0.1, crowd: 0.07, shimmer: 0.03 },
      silence: {},
    };
    return volumes[type]?.[key] ?? 0;
  }

  updateFromPhase(phase: ExperiencePhase) {
    const soundscape = PHASE_TO_SOUNDSCAPE[phase];
    this.crossfadeTo(soundscape);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(
      muted ? 0 : 0.35,
      now + 0.3
    );
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  destroy() {
    this.layers.forEach((layer) => {
      try { (layer.node as any).stop?.(); } catch {}
    });
    this.layers.clear();
    this.ctx?.close();
    this.initialized = false;
  }
}
