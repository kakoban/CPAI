import React, { useEffect, useRef } from 'react';
import { LandingMediaConfig } from '../../types/media';

interface VideoBackgroundProps {
  config: LandingMediaConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ config }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const nextTargetTimeRef = useRef<number | null>(null);

  // -------------------------------------------------------------
  // Video Handling (Scrubbing or Continuous Loop)
  // -------------------------------------------------------------
  useEffect(() => {
    if (config.type !== 'video') return;
    const video = videoRef.current;
    if (!video) return;

    if (config.playbackMode === 'loop') {
      video.loop = true;
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }

    // Otherwise Scrub mode
    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (nextTargetTimeRef.current !== null) {
        const nextTime = nextTargetTimeRef.current;
        nextTargetTimeRef.current = null;
        if (Math.abs(video.currentTime - nextTime) > 0.04) {
          isSeekingRef.current = true;
          video.currentTime = nextTime;
        }
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const checkMobileAndSetup = () => {
      const isDesktop = window.innerWidth > 1024;
      if (!isDesktop) {
        video.loop = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    checkMobileAndSetup();

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 1024 || !video || !video.duration) return;
      const percentX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      const targetTime = percentX * video.duration;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      } else {
        nextTargetTimeRef.current = targetTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', checkMobileAndSetup);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobileAndSetup);
    };
  }, [config.type, config.url, config.playbackMode]);

  // -------------------------------------------------------------
  // Neural Canvas Animation (Interactive Particle Synapse Network)
  // -------------------------------------------------------------
  useEffect(() => {
    if (config.type !== 'canvas-neural') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 180 };
    const handleCanvasMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleCanvasMouse);

    // Generate Particles
    const particleCount = Math.min(75, Math.floor((width * height) / 14000));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2.5 + 1.5,
      color: Math.random() > 0.4 ? '#2563EB' : '#60A5FA'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with distance lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse interaction
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p1.x += (dxMouse / distMouse) * force * 3;
          p1.y += (dyMouse / distMouse) * force * 3;
        }

        // Draw Dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.35 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleCanvasMouse);
    };
  }, [config.type]);

  // -------------------------------------------------------------
  // Cyber Matrix Animation
  // -------------------------------------------------------------
  useEffect(() => {
    if (config.type !== 'canvas-matrix') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const characters = '01CPMAI010198AI_COGNITIVE_PMI_OWJ';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * -50));

    let frame = 0;
    const render = () => {
      frame++;
      if (frame % 2 === 0) {
        ctx.fillStyle = 'rgba(231, 234, 239, 0.15)'; // fades into site bg
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#2563EB';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          if (drops[i] > 0) {
            ctx.fillText(text, x, y);
          }

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [config.type]);

  const originClass =
    config.origin === 'center'
      ? 'origin-center'
      : config.origin === 'left'
      ? 'origin-left'
      : 'origin-center lg:origin-right';

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none mask-radial-edges"
      aria-hidden="true"
    >
      <div className="w-full h-full flex items-center justify-center lg:justify-end">
        {config.type === 'video' ? (
          <video
            key={config.url}
            ref={videoRef}
            src={config.url}
            muted
            playsInline
            preload="auto"
            style={{
              opacity: config.opacity,
              transform: `scale(${config.scale})`
            }}
            className={`w-full h-full object-cover lg:object-contain ${originClass} ${config.blendMode} mask-vertical-fade transition-all duration-700`}
          />
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              opacity: config.opacity,
              transform: `scale(${config.scale})`
            }}
            className={`w-full h-full object-cover ${originClass} ${config.blendMode} mask-vertical-fade transition-all duration-500`}
          />
        )}
      </div>
    </div>
  );
};
