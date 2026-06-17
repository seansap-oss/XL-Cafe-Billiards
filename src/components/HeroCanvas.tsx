import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface LightRay {
  angle: number;
  width: number;
  opacity: number;
  speed: number;
  phase: number;
}

interface PoolBall {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  angle: number;
  orbitRadius: number;
  speed: number;
  phase: number;
}

const AMBER = { r: 212, g: 160, b: 74 };
const VIOLET = { r: 139, g: 92, b: 246 };

export function HeroCanvas({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    particles: [] as Particle[],
    rays: [] as LightRay[],
    balls: [] as PoolBall[],
    time: 0,
    initialized: false,
  });

  const init = useCallback((w: number, h: number) => {
    const s = stateRef.current;

    s.particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 300 + 50,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      life: Math.random() * 600,
      maxLife: 600 + Math.random() * 400,
    }));

    s.rays = Array.from({ length: 5 }, (_, i) => ({
      angle: -30 + i * 15,
      width: 60 + Math.random() * 80,
      opacity: 0.02 + Math.random() * 0.025,
      speed: 0.15 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    s.balls = [
      { x: w * 0.3, y: h * 0.75, radius: 14, color: '#d4a04a', glowColor: 'rgba(212,160,74,0.3)', angle: 0, orbitRadius: 0, speed: 0, phase: 0 },
      { x: w * 0.65, y: h * 0.68, radius: 12, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.25)', angle: 1.2, orbitRadius: 0, speed: 0, phase: 0.5 },
      { x: w * 0.48, y: h * 0.82, radius: 10, color: '#3b82f6', glowColor: 'rgba(59,130,246,0.2)', angle: 2.5, orbitRadius: 0, speed: 0, phase: 1 },
      { x: w * 0.78, y: h * 0.85, radius: 11, color: '#f5f0e8', glowColor: 'rgba(245,240,232,0.15)', angle: 3.8, orbitRadius: 0, speed: 0, phase: 1.5 },
      { x: w * 0.2, y: h * 0.88, radius: 9, color: '#d4a04a', glowColor: 'rgba(212,160,74,0.2)', angle: 5, orbitRadius: 0, speed: 0, phase: 2 },
    ];

    s.initialized = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      if (!stateRef.current.initialized) {
        init(canvas.clientWidth, canvas.clientHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const s = stateRef.current;
      s.time += 0.016;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0a0a0c');
      bgGrad.addColorStop(0.3, '#111116');
      bgGrad.addColorStop(0.6, '#0e0e12');
      bgGrad.addColorStop(1, '#0a0a0c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Pool table felt area (bottom third)
      const feltY = h * 0.6;
      const feltGrad = ctx.createRadialGradient(w * 0.5, h * 0.85, 0, w * 0.5, h * 0.85, w * 0.5);
      feltGrad.addColorStop(0, 'rgba(16, 80, 40, 0.12)');
      feltGrad.addColorStop(0.5, 'rgba(12, 60, 30, 0.06)');
      feltGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = feltGrad;
      ctx.fillRect(0, feltY, w, h - feltY);

      // Table edge line
      ctx.strokeStyle = 'rgba(212, 160, 74, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, feltY + 20);
      ctx.lineTo(w * 0.9, feltY + 20);
      ctx.stroke();

      // Light rays from above
      for (const ray of s.rays) {
        const a = (ray.angle + Math.sin(s.time * ray.speed + ray.phase) * 5) * Math.PI / 180;
        const ox = w * 0.5;
        const oy = -20;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(a);

        const grad = ctx.createLinearGradient(0, 0, 0, h * 1.2);
        const pulse = 0.7 + Math.sin(s.time * 0.5 + ray.phase) * 0.3;
        grad.addColorStop(0, `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${ray.opacity * pulse})`);
        grad.addColorStop(0.4, `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${ray.opacity * pulse * 0.3})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-ray.width * 0.3, 0);
        ctx.lineTo(-ray.width, h * 1.2);
        ctx.lineTo(ray.width, h * 1.2);
        ctx.lineTo(ray.width * 0.3, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Ambient glow spots
      const glowSpots = [
        { x: w * 0.3, y: h * 0.25, r: 150, color: AMBER, intensity: 0.03 },
        { x: w * 0.7, y: h * 0.3, r: 120, color: VIOLET, intensity: 0.02 },
        { x: w * 0.5, y: h * 0.15, r: 200, color: AMBER, intensity: 0.04 },
      ];

      for (const spot of glowSpots) {
        const pulse = 0.8 + Math.sin(s.time * 0.3 + spot.x * 0.01) * 0.2;
        const grad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);
        grad.addColorStop(0, `rgba(${spot.color.r}, ${spot.color.g}, ${spot.color.b}, ${spot.intensity * pulse})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(spot.x - spot.r, spot.y - spot.r, spot.r * 2, spot.r * 2);
      }

      // Pool balls with glow
      for (const ball of s.balls) {
        const bx = ball.x + Math.sin(s.time * 0.2 + ball.phase) * 2;
        const by = ball.y + Math.cos(s.time * 0.15 + ball.phase) * 1.5;

        // Outer glow
        const glow = ctx.createRadialGradient(bx, by, ball.radius * 0.5, bx, by, ball.radius * 4);
        glow.addColorStop(0, ball.glowColor);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bx, by, ball.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Ball body
        const ballGrad = ctx.createRadialGradient(
          bx - ball.radius * 0.3, by - ball.radius * 0.3, 0,
          bx, by, ball.radius
        );
        ballGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
        ballGrad.addColorStop(0.5, ball.color);
        ballGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
        ctx.fillStyle = ballGrad;
        ctx.beginPath();
        ctx.arc(bx, by, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.arc(bx - ball.radius * 0.25, by - ball.radius * 0.25, ball.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating dust particles
      for (const p of s.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        if (p.life > p.maxLife || p.y < -10 || p.x < -10 || p.x > w + 10) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.life = 0;
          p.z = Math.random() * 300 + 50;
        }

        const scale = 300 / p.z;
        const drawX = p.x;
        const drawY = p.y;
        const drawSize = p.size * scale;
        const fade = p.life < 60 ? p.life / 60 : p.life > p.maxLife - 60 ? (p.maxLife - p.life) / 60 : 1;

        ctx.fillStyle = `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${p.opacity * fade * scale})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Film grain (skipped for reduced motion / performance)
      if (!reducedMotion) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 16) {
          const noise = (Math.random() - 0.5) * 6;
          data[i] = Math.max(0, Math.min(255, data[i] + noise));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Vignette
      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.2, w * 0.5, h * 0.5, w * 0.75);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(10, 10, 12, 0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [init, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
