export type MediaSourceType = 'video' | 'canvas-neural' | 'canvas-matrix';

export type PlaybackMode = 'scrub' | 'loop';

export type BlendMode =
  | 'mix-blend-multiply'
  | 'mix-blend-normal'
  | 'mix-blend-screen'
  | 'mix-blend-overlay'
  | 'mix-blend-darken';

export interface LandingMediaConfig {
  id: string;
  type: MediaSourceType;
  url: string;
  title: string;
  description?: string;
  playbackMode: PlaybackMode;
  blendMode: BlendMode;
  opacity: number; // 0.1 to 1.0
  scale: number; // 0.5 to 1.5
  origin: 'center' | 'right' | 'left';
  isCustom?: boolean;
}
