import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight, Sparkles, Orbit, ShieldCheck, Compass } from 'lucide-react';
import ajaLogoImg from '../../assets/aja_logo_transparent.png';

interface AjaBrandIntroProps {
  onComplete: () => void;
  autoPlayDuration?: number; // In seconds, default 7
}

export const AjaBrandIntro: React.FC<AjaBrandIntroProps> = ({
  onComplete,
  autoPlayDuration = 7.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animation timeline phases:
  // 0: Initial singularity (0s - 0.9s)
  // 1: Wireframe & Orbital Activation (0.9s - 2.2s)
  // 2: Logo Reveal & Hologram (2.2s - 3.8s)
  // 3: Full Interactive / CTA Ready (3.8s+)
  const [phase, setPhase] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  // Audio Context Ref for synthesized sci-fi soundscape (zero external files required)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = 0.15; // Safe comfortable volume
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    } catch {
      // AudioContext not supported
    }
  }, []);

  // Play synthesized sci-fi chime / tone
  const playSciFiChime = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 1.2) => {
    if (!audioCtxRef.current || !masterGainRef.current || isMuted) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration * 0.4);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio error ignored
    }
  }, [isMuted]);

  // Handle unmute/sound toggle
  const toggleSound = () => {
    if (isMuted) {
      initAudio();
      setIsMuted(false);
      setTimeout(() => {
        playSciFiChime(587.33, 'sine', 1.5); // D5 sci-fi chime
      }, 50);
    } else {
      setIsMuted(true);
    }
  };

  // Exit transition trigger
  const handleExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    playSciFiChime(880, 'triangle', 0.8);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [isExiting, onComplete, playSciFiChime]);

  // Timeline progression
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => {
      setPhase(2);
      playSciFiChime(329.63, 'sine', 2.0); // E4
    }, 2200);
    const t3 = setTimeout(() => {
      setPhase(3);
      playSciFiChime(493.88, 'sine', 1.5); // B4
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [playSciFiChime]);

  // Progress Bar / Auto-enter timer
  useEffect(() => {
    const startTime = Date.now();
    const totalMs = autoPlayDuration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalMs) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        handleExit();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [autoPlayDuration, handleExit]);

  // Mouse move listener for 3D parallax & volumetric lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const normY = (e.clientY / innerHeight) * 2 - 1;
      setMousePos((prev) => ({
        ...prev,
        targetX: normX,
        targetY: normY
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D Canvas Wireframe Globe & Orbital Rings Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Math Utilities
    let rotX = 0.2;
    let rotY = 0;
    let rotZ = 0.1;

    // Smooth lerped mouse angles
    let curMouseX = 0;
    let curMouseY = 0;

    // Generate 3D Star/Particle Field
    const PARTICLE_COUNT = 90;
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      alpha: number;
    }
    const particles: Particle3D[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 1200,
      z: (Math.random() - 0.5) * 1000,
      size: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.7 + 0.2
    }));

    // Sphere Parameters matching the AJA Globe
    const SPHERE_RADIUS = Math.min(width, height) * 0.26;
    const LAT_RINGS = 7; // Concentric horizontal latitude rings
    const ORBITAL_INCLINATIONS = [
      { rx: 0.65, ry: 0.2, rz: 0.4 },
      { rx: -0.55, ry: -0.3, rz: -0.4 },
      { rx: 0.1, ry: 0.9, rz: 0.2 }
    ];

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Smooth mouse lerp (inertia)
      curMouseX += (mousePos.targetX - curMouseX) * 0.05;
      curMouseY += (mousePos.targetY - curMouseY) * 0.05;

      // Background clear with ultra-deep space gradient
      ctx.fillStyle = '#02050b';
      ctx.fillRect(0, 0, width, height);

      // Dynamic Ambient Glow reacting to mouse
      const lightX = width / 2 + curMouseX * (width * 0.25);
      const lightY = height / 2 + curMouseY * (height * 0.25);
      const glowGrad = ctx.createRadialGradient(lightX, lightY, 10, lightX, lightY, width * 0.55);
      glowGrad.addColorStop(0, 'rgba(40, 110, 150, 0.18)');
      glowGrad.addColorStop(0.4, 'rgba(20, 60, 95, 0.08)');
      glowGrad.addColorStop(1, 'rgba(2, 5, 11, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Auto rotation + Mouse tilt
      rotY = elapsed * 0.25 + curMouseX * 0.6;
      rotX = 0.25 - curMouseY * 0.4;
      rotZ = elapsed * 0.08;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // 3D Point Projection Helper
      const project3D = (x: number, y: number, z: number) => {
        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        // Rotate X
        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = y2 * cosZ + x1 * sinZ;

        const fov = 700;
        const scale = fov / (fov + z2 + 350);
        const screenX = width / 2 + x3 * scale;
        const screenY = height / 2 + y3 * scale;

        return { screenX, screenY, scale, z: z2 };
      };

      // 1. Draw 3D Floating Particles
      particles.forEach((p) => {
        p.z -= p.speed * 1.5;
        if (p.z < -450) p.z = 550;

        const proj = project3D(p.x, p.y, p.z);
        if (proj.scale > 0) {
          const depthAlpha = Math.max(0.05, Math.min(1, (proj.z + 400) / 800)) * p.alpha;
          ctx.beginPath();
          ctx.arc(proj.screenX, proj.screenY, p.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(125, 211, 252, ${depthAlpha * 0.6})`;
          ctx.fill();
        }
      });

      // 2. Draw 3D Wireframe Globe Latitude Rings
      const ringSteps = 48;
      for (let i = 0; i <= LAT_RINGS; i++) {
        // Latitude angle from -PI/2 to PI/2
        const lat = -Math.PI / 2 + (Math.PI / LAT_RINGS) * i;
        const r = SPHERE_RADIUS * Math.cos(lat);
        const y = SPHERE_RADIUS * Math.sin(lat);

        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        for (let j = 0; j <= ringSteps; j++) {
          const phi = (Math.PI * 2 / ringSteps) * j;
          const x = r * Math.cos(phi);
          const z = r * Math.sin(phi);

          const proj = project3D(x, y, z);
          avgZ += proj.z;

          if (first) {
            ctx.moveTo(proj.screenX, proj.screenY);
            first = false;
          } else {
            ctx.lineTo(proj.screenX, proj.screenY);
          }
        }

        avgZ /= ringSteps + 1;
        const ringAlpha = Math.max(0.1, Math.min(0.85, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));

        ctx.strokeStyle = `rgba(56, 150, 190, ${ringAlpha * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Draw 3D Meridian Rings (Longitudes)
      const MERIDIANS = 6;
      for (let m = 0; m < MERIDIANS; m++) {
        const theta = (Math.PI / MERIDIANS) * m;
        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        for (let j = 0; j <= ringSteps; j++) {
          const phi = (Math.PI * 2 / ringSteps) * j;
          // Circle rotated by theta
          const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = SPHERE_RADIUS * Math.cos(phi);
          const z = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);

          const proj = project3D(x, y, z);
          avgZ += proj.z;

          if (first) {
            ctx.moveTo(proj.screenX, proj.screenY);
            first = false;
          } else {
            ctx.lineTo(proj.screenX, proj.screenY);
          }
        }

        avgZ /= ringSteps + 1;
        const ringAlpha = Math.max(0.08, Math.min(0.75, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));
        ctx.strokeStyle = `rgba(75, 175, 215, ${ringAlpha * 0.35})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 4. Draw Geodesic Tilted Orbital Rings (like in the AJA Globe)
      ORBITAL_INCLINATIONS.forEach((orb, idx) => {
        const orbitRadius = SPHERE_RADIUS * (1.08 + idx * 0.08);
        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        for (let j = 0; j <= ringSteps; j++) {
          const phi = (Math.PI * 2 / ringSteps) * j;
          let ox = orbitRadius * Math.cos(phi);
          let oy = orbitRadius * Math.sin(phi) * Math.cos(orb.rx);
          let oz = orbitRadius * Math.sin(phi) * Math.sin(orb.rx);

          // Additional tilt
          const ox2 = ox * Math.cos(orb.ry) - oz * Math.sin(orb.ry);
          const oz2 = oz * Math.cos(orb.ry) + ox * Math.sin(orb.ry);

          const proj = project3D(ox2, oy, oz2);
          avgZ += proj.z;

          if (first) {
            ctx.moveTo(proj.screenX, proj.screenY);
            first = false;
          } else {
            ctx.lineTo(proj.screenX, proj.screenY);
          }
        }

        avgZ /= ringSteps + 1;
        const orbAlpha = Math.max(0.15, Math.min(0.9, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));

        ctx.strokeStyle = `rgba(90, 195, 240, ${orbAlpha * 0.55})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      // 5. Pulsing Laser Scan Line (Unseen style high-tech scan)
      const scanY = ((elapsed * 0.35) % 1) * height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scanGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      scanGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
      scanGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, width, 40);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 overflow-hidden bg-[#02050b] text-white select-none transition-all duration-700 ease-out font-inter ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D WebGL / Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-crosshair"
      />

      {/* Cinematic Analog Noise Overlay (Unseen Signature Texture) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Vignette & Soft Gradient Masks */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,5,11,0.85)_100%)]" />

      {/* Top HUD Bar */}
      <header className="absolute top-0 inset-x-0 p-5 sm:p-8 flex items-center justify-between text-xs tracking-[0.25em] text-white/50 z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="font-mono uppercase text-cyan-300/80">SYS // 2026.AI.CORE</span>
          <span className="hidden sm:inline-block text-white/20">|</span>
          <span className="hidden sm:inline-block font-mono text-white/40">LAT: 35.6892° N</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:border-cyan-400/40 text-white/70 hover:text-cyan-300 transition-all text-[11px] font-mono tracking-wider cursor-pointer"
            title={isMuted ? 'فعال‌سازی صدا' : 'قطع صدا'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
                <span className="hidden xs:inline">AUDIO: MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden xs:inline text-cyan-300">AUDIO: ACTIVE</span>
              </>
            )}
          </button>

          {/* Quick Skip Button */}
          <button
            onClick={handleExit}
            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-cyan-500/10 hover:border-cyan-400/60 text-white/80 hover:text-white transition-all text-[11px] font-mono tracking-widest cursor-pointer"
          >
            <span>SKIP</span>
            <span className="text-white/40 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </header>

      {/* Main Central Presentation Area */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        {/* Holographic 3D Logo Card */}
        <div
          className={`relative max-w-xl w-full flex flex-col items-center justify-center transition-all duration-1000 transform ${
            phase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.targetY * 8}deg) rotateY(${mousePos.targetX * 12}deg)`
          }}
        >
          {/* Glow Halo behind Logo */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-600/20 via-sky-500/15 to-transparent rounded-full filter blur-3xl opacity-70 animate-pulse pointer-events-none" />

          {/* Logo Container with Metallic Rim */}
          <div className="relative group p-6 sm:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(20,80,120,0.35)] hover:border-cyan-400/40 transition-all duration-500 flex flex-col items-center">
            
            {/* Top Corner Technical Crosshairs */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-cyan-400/40" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-cyan-400/40" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-cyan-400/40" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-cyan-400/40" />

            {/* The Brand Logo Image (Transparent & Clean) */}
            <div className="relative w-64 sm:w-80 md:w-96 aspect-square max-h-[280px] sm:max-h-[340px] flex items-center justify-center overflow-hidden">
              <img
                src={ajaLogoImg}
                alt="Abolfazl Jafari Asl"
                className={`w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-1000 ${
                  phase >= 2
                    ? 'opacity-100 scale-100 filter-none'
                    : 'opacity-40 scale-90 blur-xs'
                }`}
                onError={(e) => {
                  // Fallback to static public logo if needed
                  e.currentTarget.src = '/aja_logo.png';
                }}
              />

              {/* Light Sweep Shimmer Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none transition-transform duration-1000 ${
                  phase >= 2 ? 'translate-x-[200%]' : '-translate-x-[200%]'
                }`}
              />
            </div>

            {/* Cinematic Subtitle & Typography */}
            <div
              className={`text-center space-y-2 mt-4 transition-all duration-1000 ${
                phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono tracking-[0.35em] sm:tracking-[0.5em] text-cyan-300 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>INTELLIGENT SYSTEMS & AI ARCHITECTURE</span>
              </div>
              <p className="text-xs text-white/50 font-light tracking-widest uppercase">
                Cognitive Project Management · CPMAI Masterclass
              </p>
            </div>

            {/* Interactive Magnetic Enter CTA Button */}
            <div
              className={`mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
                phase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
              }`}
            >
              <button
                onClick={handleExit}
                className="relative group/btn w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm tracking-wider shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-[0_0_50px_rgba(14,165,233,0.7)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer overflow-hidden border border-cyan-300/40"
              >
                {/* Button Internal Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 pointer-events-none" />

                <span className="relative z-10 flex items-center gap-2">
                  <span className="font-semibold tracking-widest">ENTER PLATFORM</span>
                  <span className="text-xs opacity-75 font-light">|</span>
                  <span className="text-xs font-normal">ورود به سامانه</span>
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Telemetry & Progress Bar */}
      <footer className="absolute bottom-0 inset-x-0 p-5 sm:p-8 flex flex-col gap-3 text-xs tracking-widest text-white/40 z-20">
        <div className="w-full flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Orbit className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white/60">AUTONOMOUS ORCHESTRATION</span>
          </div>

          <div className="flex items-center gap-2 text-white/50">
            <span>EXPLORING CPMAI LABS</span>
            <span className="text-cyan-400">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Minimal High-Tech Progress Line */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-100 ease-linear shadow-[0_0_10px_#38bdf8]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </div>
  );
};
