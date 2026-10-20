import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
  Orbit,
  BrainCircuit,
  Building2,
  ShieldCheck,
  Layers,
  Globe,
  Cpu,
  X,
  ChevronRight
} from 'lucide-react';
import ajaLogoImg from '../../assets/aja_logo_transparent.png';

interface AjaBrandIntroProps {
  onComplete: () => void;
}

interface NarrativePillar {
  id: 'owj' | 'cpmai' | 'aja';
  badge: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
}

const PILLARS: NarrativePillar[] = [
  {
    id: 'owj',
    badge: 'سازمان راهبر',
    badgeEn: 'ENTERPRISE HUB',
    titleFa: 'شورای کسب‌وکار اوج (OWJ)',
    titleEn: 'OWJ Business Council',
    descFa: 'پیشگام توانمندسازی اکوسیستم هوش مصنوعی سازمانی و راهبری مگاپروژه‌های ملی (مترو، انرژی و زیرساخت‌های کلان کشور).',
    descEn: 'Empowering national megaproject leaders with enterprise cognitive governance, risk mitigation, and strategic AI.',
    icon: Building2,
    accentColor: 'from-blue-600 to-indigo-600',
    glowColor: 'rgba(37, 99, 235, 0.4)',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
    textColor: 'text-blue-400'
  },
  {
    id: 'cpmai',
    badge: 'استاندارد جهانی',
    badgeEn: 'GLOBAL STANDARD',
    titleFa: 'متدولوژی PMI-CPMAI®',
    titleEn: 'PMI-CPMAI® Methodology',
    descFa: 'استاندارد طلایی مدیریت شناختی پروژه‌های هوش مصنوعی؛ چرخه عمر ۶ فازه، ارزیابی الگوهای هفت‌گانه AI و بهینه‌سازی مداوم.',
    descEn: 'The gold standard for Cognitive Project Management for AI: 6 agile phases, 7 core AI patterns, and business ROI alignment.',
    icon: BrainCircuit,
    accentColor: 'from-cyan-500 to-teal-500',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    borderColor: 'border-cyan-500/40 hover:border-cyan-300',
    textColor: 'text-cyan-400'
  },
  {
    id: 'aja',
    badge: 'معماری و نوآوری',
    badgeEn: 'AI ARCHITECTURE',
    titleFa: 'ابوالفضل جعفری اصل (AJA)',
    titleEn: 'Abolfazl Jafari Asl',
    descFa: 'معماری سیستم‌های شناختی، عامل‌های هوشمند خودران (Agentic AI)، بوم‌های تعاملی NotebookLM و یکپارچه‌سازی فرآیندهای مهندسی.',
    descEn: 'Cognitive systems design, agentic workflows, interactive NotebookLM labs, and advanced generative AI synthesis.',
    icon: Cpu,
    accentColor: 'from-sky-500 to-cyan-400',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    borderColor: 'border-sky-400/40 hover:border-sky-300',
    textColor: 'text-sky-300'
  }
];

export const AjaBrandIntro: React.FC<AjaBrandIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // User manual exit state (No auto-kick!)
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activePillar, setActivePillar] = useState<'owj' | 'cpmai' | 'aja'>('cpmai');

  // Mouse & Click Interaction
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }[]>([]);

  // Web Audio Context for dynamic synthesized tone generation
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = 0.18;
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    } catch {
      // Audio not supported
    }
  }, []);

  const playSynthesizedTone = useCallback((freq = 440, type: OscillatorType = 'sine', duration = 0.8) => {
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
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + duration * 0.3);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio error ignored
    }
  }, [isMuted]);

  const toggleSound = () => {
    if (isMuted) {
      initAudio();
      setIsMuted(false);
      setTimeout(() => playSynthesizedTone(587.33, 'sine', 1.2), 60);
    } else {
      setIsMuted(true);
    }
  };

  // Safe and Smooth Exit Trigger (User Discretion)
  const handleExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    playSynthesizedTone(784, 'triangle', 0.6);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [isExiting, onComplete, playSynthesizedTone]);

  // Keyboard Navigation: Escape or Enter exits
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleExit]);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const handleClick = (e: MouseEvent) => {
      // Add a shockwave ripple in 3D canvas
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.6,
        alpha: 0.6
      });
      playSynthesizedTone(440, 'sine', 0.4);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [playSynthesizedTone]);

  // Canvas 3D Rendering (Wireframe Globe + Orbitals + Starfield + Shockwaves)
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

    // Particle Starfield (3D)
    const STAR_COUNT = 110;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 1400,
      z: (Math.random() - 0.5) * 1200,
      size: Math.random() * 2.0 + 0.6,
      speed: Math.random() * 0.4 + 0.15,
      alpha: Math.random() * 0.7 + 0.25
    }));

    const SPHERE_RADIUS = Math.min(width, height) * 0.28;
    const LAT_RINGS = 8;
    const MERIDIANS = 8;
    const ORBITAL_INCLINATIONS = [
      { rx: 0.75, ry: 0.35, rz: 0.2 },
      { rx: -0.65, ry: -0.4, rz: -0.3 },
      { rx: 0.2, ry: 0.95, rz: 0.15 }
    ];

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Mouse inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Ultra-deep space clear
      ctx.fillStyle = '#020610';
      ctx.fillRect(0, 0, width, height);

      // Dynamic Volumetric Ambient Glow following mouse
      const lightX = width / 2 + mouseRef.current.x * (width * 0.3);
      const lightY = height / 2 + mouseRef.current.y * (height * 0.25);
      const glowGrad = ctx.createRadialGradient(lightX, lightY, 15, lightX, lightY, width * 0.65);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
      glowGrad.addColorStop(0.35, 'rgba(14, 116, 144, 0.09)');
      glowGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.03)');
      glowGrad.addColorStop(1, 'rgba(2, 6, 16, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Auto rotation + Mouse tilt
      const rotY = elapsed * 0.22 + mouseRef.current.x * 0.65;
      const rotX = 0.22 - mouseRef.current.y * 0.45;
      const rotZ = elapsed * 0.07;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // 3D Projection
      const project3D = (x: number, y: number, z: number) => {
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = y2 * cosZ + x1 * sinZ;

        const fov = 750;
        const scale = fov / (fov + z2 + 350);
        const screenX = width / 2 + x3 * scale;
        const screenY = height / 2 + y3 * scale;

        return { screenX, screenY, scale, z: z2 };
      };

      // 1. Draw 3D Stars
      stars.forEach((s) => {
        s.z -= s.speed * 1.6;
        if (s.z < -500) s.z = 600;

        const proj = project3D(s.x, s.y, s.z);
        if (proj.scale > 0) {
          const depthAlpha = Math.max(0.08, Math.min(1, (proj.z + 450) / 900)) * s.alpha;
          ctx.beginPath();
          ctx.arc(proj.screenX, proj.screenY, s.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${depthAlpha * 0.7})`;
          ctx.fill();
        }
      });

      // 2. Draw 3D Latitude Rings (Concentric Circles of the AJA Globe)
      const ringSteps = 48;
      for (let i = 0; i <= LAT_RINGS; i++) {
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
        const ringAlpha = Math.max(0.12, Math.min(0.9, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));

        ctx.strokeStyle = `rgba(56, 189, 248, ${ringAlpha * 0.55})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 3. Draw 3D Meridians
      for (let m = 0; m < MERIDIANS; m++) {
        const theta = (Math.PI / MERIDIANS) * m;
        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        for (let j = 0; j <= ringSteps; j++) {
          const phi = (Math.PI * 2 / ringSteps) * j;
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
        const ringAlpha = Math.max(0.1, Math.min(0.85, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));
        ctx.strokeStyle = `rgba(14, 165, 233, ${ringAlpha * 0.45})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 4. Draw Geodesic Tilted Orbital Rings
      ORBITAL_INCLINATIONS.forEach((orb, idx) => {
        const orbitRadius = SPHERE_RADIUS * (1.1 + idx * 0.1);
        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        for (let j = 0; j <= ringSteps; j++) {
          const phi = (Math.PI * 2 / ringSteps) * j;
          let ox = orbitRadius * Math.cos(phi);
          let oy = orbitRadius * Math.sin(phi) * Math.cos(orb.rx);
          let oz = orbitRadius * Math.sin(phi) * Math.sin(orb.rx);

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
        const orbAlpha = Math.max(0.2, Math.min(0.95, (avgZ + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));
        ctx.strokeStyle = `rgba(125, 211, 252, ${orbAlpha * 0.7})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      // 5. Draw Interactive Click Shockwaves
      for (let rIdx = ripplesRef.current.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripplesRef.current[rIdx];
        rip.radius += 12;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${rip.alpha * 0.6})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          ripplesRef.current.splice(rIdx, 1);
        }
      }

      // 6. Cybernetic Vertical Scanning Wave
      const scanY = ((elapsed * 0.28) % 1) * height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      scanGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.09)');
      scanGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, width, 60);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#020610] text-white select-none transition-all duration-700 ease-out font-inter ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none filter blur-md' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D Real-time WebGL / Canvas Space Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />

      {/* Film Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Subtle Vignette Gradient Mask */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,16,0.85)_100%)]" />

      {/* Top HUD Bar */}
      <header className="relative w-full max-w-7xl mx-auto p-4 sm:p-6 flex items-center justify-between text-xs tracking-wider z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
          <span className="font-mono text-cyan-300 font-semibold uppercase tracking-[0.2em]">
            OWJ // CPMAI AI SYSTEMS CORE
          </span>
          <span className="hidden md:inline-block text-white/30">|</span>
          <span className="hidden md:inline-block font-mono text-white/50 tracking-widest text-[11px]">
            ARCHITECT: ABOLFAZL JAFARI ASL
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] hover:border-cyan-400/50 text-white/80 hover:text-cyan-300 transition-all text-xs font-mono tracking-wider cursor-pointer backdrop-blur-sm"
            title={isMuted ? 'فعال‌سازی افکت‌های صوتی' : 'قطع صدا'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/50" />
                <span className="hidden sm:inline">AUDIO: OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline text-cyan-300">AUDIO: ON</span>
              </>
            )}
          </button>

          {/* Quick Exit / Skip Button */}
          <button
            onClick={handleExit}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/25 hover:border-cyan-300 text-cyan-200 hover:text-white transition-all text-xs font-mono font-medium tracking-wider cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-sm"
          >
            <span>خروج و ورود مستقیم</span>
            <span className="hidden sm:inline font-mono opacity-60">| SKIP</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] space-y-10">
        
        {/* Section 1: The Breathtaking Holographic Logo (Free Floating, No Dark Box!) */}
        <div className="relative flex flex-col items-center text-center group cursor-pointer" onClick={() => playSynthesizedTone(523.25, 'sine', 0.8)}>
          {/* Intense Ambient Glow Halo */}
          <div className="absolute -inset-16 bg-gradient-to-tr from-cyan-500/30 via-sky-500/25 to-blue-600/20 rounded-full filter blur-3xl opacity-80 animate-pulse pointer-events-none" />

          {/* Logo Graphic with Brilliant Cyan Sheen and Drop-shadow */}
          <div className="relative w-64 sm:w-80 md:w-[420px] max-w-full aspect-[4/3] flex items-center justify-center">
            <img
              src={ajaLogoImg}
              alt="AJA - Abolfazl Jafari Asl"
              className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(56,189,248,0.85)] drop-shadow-[0_0_70px_rgba(14,165,233,0.45)] hover:scale-105 transition-all duration-700 animate-float"
              style={{
                animationDuration: '6s',
                animationIterationCount: 'infinite'
              }}
              onError={(e) => {
                e.currentTarget.src = '/aja_logo_transparent.png';
              }}
            />

            {/* Corner Crosshairs */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70" />
          </div>

          {/* Holographic Typographic Subtitles */}
          <div className="mt-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-cyan-200 uppercase">
                COGNITIVE SYSTEMS & ENTERPRISE AI
              </span>
            </div>
            <p className="text-sm sm:text-base text-sky-100/80 font-light tracking-wider dir-rtl text-center max-w-xl">
              هم‌افزایی هوش مصنوعی شناختی، استاندارد جهانی CPMAI و راهبری مگاپروژه‌های راهبردی
            </p>
          </div>
        </div>

        {/* Section 2: Story of OWJ Team & CPMAI (Three Interactive Glowing Energy Capsules) */}
        <div className="w-full space-y-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
              <Orbit className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE TRIAD OF EXCELLENCE // مثلث تحول شناختی</span>
            </div>
            <p className="text-xs text-white/50">
              روی هر ستون کلیک کنید یا شناور شوید تا نقش آن در اکوسیستم هوش مصنوعی را ببینید:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              const isSelected = activePillar === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActivePillar(p.id);
                    playSynthesizedTone(p.id === 'owj' ? 392 : p.id === 'cpmai' ? 493.88 : 587.33, 'sine', 0.6);
                  }}
                  onMouseEnter={() => {
                    playSynthesizedTone(p.id === 'owj' ? 392 : p.id === 'cpmai' ? 493.88 : 587.33, 'sine', 0.3);
                  }}
                  className={`group relative p-5 sm:p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500 cursor-pointer text-right flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? `bg-black/60 border-cyan-400 shadow-[0_0_35px_${p.glowColor}] scale-[1.02]`
                      : 'bg-black/35 border-white/10 hover:border-white/25 hover:bg-black/50'
                  }`}
                >
                  {/* Glowing Top Pill */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.05] text-white/70 uppercase">
                      {p.badgeEn}
                    </span>
                    <div className={`p-2 rounded-2xl bg-gradient-to-br ${p.accentColor} text-white shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="py-4 space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {p.titleFa}
                    </h4>
                    <p className="text-xs text-cyan-300/80 font-mono tracking-wider text-left" dir="ltr">
                      {p.titleEn}
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed pt-1">
                      {p.descFa}
                    </p>
                  </div>

                  {/* Footer Tag */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
                    <span className="group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                      <span>مشاهده جزئیات</span>
                      <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </span>
                    <span className="font-mono text-[10px] text-white/30">{p.badge}</span>
                  </div>

                  {/* Active Border Glow */}
                  {isSelected && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_#38bdf8]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Primary Action (User Decides When to Enter) */}
        <div className="w-full flex flex-col items-center justify-center gap-4 pt-4">
          <button
            onClick={handleExit}
            className="group relative w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-base sm:text-lg tracking-wide shadow-[0_0_40px_rgba(6,182,212,0.55)] hover:shadow-[0_0_65px_rgba(6,182,212,0.85)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer overflow-hidden border border-cyan-200/50"
          >
            {/* Shimmer Sweep Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />

            <div className="flex flex-col text-right">
              <span className="text-sm sm:text-base font-bold">ورود به بوم تخصصی و اکوسیستم هوش مصنوعی</span>
              <span className="text-[11px] font-mono tracking-wider opacity-85 font-light" dir="ltr">
                ENTER CPMAI WORKBOOK & OWJ ECOSYSTEM
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/20 group-hover:translate-x-1 transition-transform shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          <p className="text-xs text-white/40 font-mono tracking-widest text-center">
            [ کنترل کامل در اختیار شماست · کلیک یا فشردن دکمه ESC / ENTER برای ورود ]
          </p>
        </div>
      </main>

      {/* Kinetic Infinite Ticker at Bottom */}
      <footer className="relative w-full border-t border-white/[0.08] bg-black/50 backdrop-blur-md py-3 overflow-hidden text-xs text-cyan-300/70 font-mono tracking-wider">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          <span>✦ شورای کسب‌وکار اوج (OWJ Business Council)</span>
          <span>✦ متدولوژی استاندارد جهانی PMI-CPMAI®</span>
          <span>✦ معماری سیستم‌های شناختی مهندس ابوالفضل جعفری اصل</span>
          <span>✦ چرخه ۶ فاز مدیریت پروژه‌های هوش مصنوعی</span>
          <span>✦ حاکمیت داده و همسوسازی الگوهای هفت‌گانه</span>
          <span>✦ توانمندسازی مگاپروژه‌های مترو، انرژی و صنعت کشور</span>
          <span>✦ استودیو تعاملی NotebookLM و عامل‌های خودران</span>
          <span>✦ شورای کسب‌وکار اوج (OWJ Business Council)</span>
          <span>✦ متدولوژی استاندارد جهانی PMI-CPMAI®</span>
          <span>✦ معماری سیستم‌های شناختی مهندس ابوالفضل جعفری اصل</span>
        </div>
      </footer>
    </div>
  );
};
