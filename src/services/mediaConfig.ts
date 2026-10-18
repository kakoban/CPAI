import { LandingMediaConfig } from '../types/media';

const STORAGE_KEY = 'cpmai_landing_media_config_v1';

export const DEFAULT_MEDIA_CONFIG: LandingMediaConfig = {
  id: 'preset-robo-motion',
  type: 'video',
  url: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/robo_motion.mp4',
  title: 'Cybernetic Humanoid Robot',
  description: 'Interactive 3D cyber agent with cursor-scrubbing response',
  playbackMode: 'scrub',
  blendMode: 'mix-blend-multiply',
  opacity: 0.8,
  scale: 0.8,
  origin: 'right'
};

export const MEDIA_PRESETS: LandingMediaConfig[] = [
  DEFAULT_MEDIA_CONFIG,
  {
    id: 'preset-neural-network',
    type: 'canvas-neural',
    url: '',
    title: 'Cognitive Neural Synapse Network',
    description: 'Real-time 60 FPS interactive particle constellation reacting to cursor',
    playbackMode: 'loop',
    blendMode: 'mix-blend-normal',
    opacity: 0.9,
    scale: 1.0,
    origin: 'right'
  },
  {
    id: 'preset-matrix-stream',
    type: 'canvas-matrix',
    url: '',
    title: 'Cybernetic Quantum Data Matrix',
    description: 'High-tech cognitive code stream and predictive algorithm rain',
    playbackMode: 'loop',
    blendMode: 'mix-blend-multiply',
    opacity: 0.75,
    scale: 1.0,
    origin: 'right'
  },
  {
    id: 'preset-ocean-flow',
    type: 'video',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    title: 'Deep Dynamics & Fluid Flow',
    description: 'High definition continuous kinetic video stream',
    playbackMode: 'loop',
    blendMode: 'mix-blend-multiply',
    opacity: 0.7,
    scale: 0.85,
    origin: 'right'
  }
];

export const mediaService = {
  getSavedConfig(): LandingMediaConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.type) {
          return { ...DEFAULT_MEDIA_CONFIG, ...parsed };
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_MEDIA_CONFIG;
  },

  saveConfig(config: LandingMediaConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  },

  resetConfig(): LandingMediaConfig {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    return DEFAULT_MEDIA_CONFIG;
  }
};
