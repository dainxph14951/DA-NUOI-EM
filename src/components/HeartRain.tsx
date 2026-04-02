import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export const HeartRain: React.FC = () => {
  useEffect(() => {
    const triggerHeartRain = () => {
      const duration = 5000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const heart = () => {
        confetti({
          particleCount: 20,
          startVelocity: randomInRange(-15, 0),
          spread: 180,
          gravity: 0.8,
          ticks: 200,
          origin: {
            x: Math.random(),
            y: -0.1,
          },
          shapes: ["heart"],
          colors: ["#ff69b4", "#ff1493", "#ff69b4", "#ffb6c1", "#ffc0cb"],
        });
      };

      const frame = () => {
        if (Date.now() < animationEnd) {
          heart();
          requestAnimationFrame(frame);
        }
      };

      frame();
    };

    // Gọi hiệu ứng khi component mount sau 500ms
    const timer = setTimeout(triggerHeartRain, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
};
