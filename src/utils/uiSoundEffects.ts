// Web Audio API Mechanical Keyboard & Tactile UI Sound Synthesizer
// Zero external audio files required — instant 0ms latency

let sharedAudioCtx: AudioContext | null = null;
const SOUND_STORAGE_KEY = 'cpmai_tactile_sound_enabled';

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtxClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      sharedAudioCtx = new AudioCtxClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function isTactileSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
  return saved === null ? true : saved === 'true';
}

export function setTactileSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
}

export type SoundVariant = 'thock' | 'switch' | 'hover' | 'success';

export function playTactileSound(variant: SoundVariant = 'thock'): void {
  if (!isTactileSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    if (variant === 'thock') {
      // Realistic Mechanical Keyboard "Thock" (Cherry MX / Topre style: transient click + warm low-mid body)
      // 1. Transient switch click (noise burst through bandpass)
      const bufferSize = Math.floor(ctx.sampleRate * 0.018);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1900, now);
      filter.Q.setValueAtTime(2.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);

      // 2. Keycap bottom-out resonance ("thock" body)
      const osc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(78, now + 0.045);

      bodyGain.gain.setValueAtTime(0.32, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(bodyGain);
      bodyGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.052);
    } else if (variant === 'switch') {
      // Crisp tactile micro-switch click for sub-tabs & step buttons
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.028);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.032);
    } else if (variant === 'hover') {
      // Ultra-subtle soft tick on card hover
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.009);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.012);
    } else if (variant === 'success') {
      // Two-note mechanical confirmación chime for copy/download
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.setValueAtTime(880, now + 0.055); // A5

      osc2.frequency.setValueAtTime(293.66, now);
      osc2.frequency.setValueAtTime(440, now + 0.055);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.165);
      osc2.stop(now + 0.165);
    }
  } catch {
    // Ignore audio context errors on restricted autoplay
  }
}
