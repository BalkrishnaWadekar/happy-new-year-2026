import React, { useEffect, useRef } from 'react';

const BackgroundFireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Firework particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 2 + 1;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      color: string;
      exploded: boolean;
      particles: Particle[];
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = Math.random() * (height * 0.4) + height * 0.1;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        this.exploded = false;
        this.particles = [];
        this.vy = -Math.random() * 5 - 10; // Initial launch speed
      }

      update() {
        if (!this.exploded) {
          this.y += this.vy;
          this.vy += 0.2; // gravity while rising
          if (this.vy >= 0 || this.y <= this.targetY) {
            this.explode();
          }
        } else {
          this.particles.forEach((p) => p.update());
          this.particles = this.particles.filter((p) => p.alpha > 0);
        }
      }

      explode() {
        this.exploded = true;
        for (let i = 0; i < 50; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.exploded) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          this.particles.forEach((p) => p.draw(ctx));
        }
      }
    }

    let fireworks: Firework[] = [];
    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
      ctx.fillRect(0, 0, width, height);

      // Randomly spawn fireworks
      if (Math.random() < 0.03) {
        fireworks.push(new Firework());
      }

      fireworks.forEach((fw) => {
        fw.update();
        fw.draw(ctx);
      });

      fireworks = fireworks.filter((fw) => !fw.exploded || fw.particles.length > 0);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

export default BackgroundFireworks;
