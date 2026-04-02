import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  id: number;
}

export const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const textRef = useRef<string>("Nhung");
  const particleIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const createParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          id: particleIdRef.current++,
        });
      }
    };

    createParticles(150);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };

      // Create particle burst effect at cursor
      if (Math.random() > 0.7) {
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const velocity = 2 + Math.random() * 2;
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            size: Math.random() * 1 + 0.5,
            opacity: 0.8,
            id: particleIdRef.current++,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        // Mouse attraction
        const dx = cursorRef.current.x - p.x;
        const dy = cursorRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * 0.3;
          p.vy += Math.sin(angle) * 0.3;
        }

        // Natural drift
        p.x += p.vx * 0.5;
        p.y += p.vy * 0.5;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.opacity -= 0.003;

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle
        if (p.opacity > 0) {
          ctx.fillStyle = `rgba(255, 105, 180, ${Math.max(0, p.opacity)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Glow effect
          ctx.strokeStyle = `rgba(255, 165, 210, ${Math.max(0, p.opacity * 0.5)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        return p.opacity > 0;
      });

      // Draw connecting lines when particles are close
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.strokeStyle = `rgba(255, 105, 180, ${0.1 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw "Nhung" text at cursor with glow
      const cursorDist = Math.sqrt(
        (cursorRef.current.x - canvas.width / 2) ** 2 +
          (cursorRef.current.y - canvas.height / 2) ** 2,
      );
      if (cursorDist < 300) {
        ctx.font = "bold 24px 'Poppins', sans-serif";
        ctx.fillStyle = `rgba(255, 105, 180, 0.3)`;
        ctx.textAlign = "center";
        ctx.fillText(textRef.current, cursorRef.current.x, cursorRef.current.y);

        // Glow effect on text
        ctx.fillStyle = `rgba(255, 165, 210, 0.1)`;
        ctx.fillText(textRef.current, cursorRef.current.x, cursorRef.current.y);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-5 pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};
