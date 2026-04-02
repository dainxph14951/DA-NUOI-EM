import React from "react";
import { useScrollParallax } from "../hooks/useScrollParallax";

interface ParallaxLayerProps {
  icon: string;
  size: number;
  initialX: number;
  initialY: number;
  scrollFactor: number;
  duration?: number;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  icon,
  size,
  initialX,
  initialY,
  scrollFactor,
  duration = 8,
}) => {
  const scrollY = useScrollParallax();
  const offset = scrollY * scrollFactor;

  return (
    <div
      className="absolute opacity-40 hover:opacity-60 transition-opacity duration-300"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        fontSize: `${size}px`,
        transform: `translateY(${offset}px)`,
      }}
    >
      {icon}
    </div>
  );
};

interface ParallaxBackgroundProps {
  backgroundImage?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  backgroundImage,
}) => {
  // Icon layers - các icon sẽ di chuyển với tốc độ khác nhau
  const iconLayers: ParallaxLayerProps[] = [
    { icon: "🌸", size: 40, initialX: 10, initialY: 15, scrollFactor: 0.3 },
    { icon: "✨", size: 35, initialX: 85, initialY: 25, scrollFactor: 0.25 },
    { icon: "🌸", size: 38, initialX: 20, initialY: 50, scrollFactor: 0.28 },

    { icon: "✨", size: 36, initialX: 80, initialY: 60, scrollFactor: 0.32 },
    { icon: "🌸", size: 33, initialX: 15, initialY: 75, scrollFactor: 0.27 },

    { icon: "✨", size: 42, initialX: 5, initialY: 35, scrollFactor: 0.35 },
    { icon: "🌸", size: 38, initialX: 90, initialY: 40, scrollFactor: 0.3 },

    { icon: "✨", size: 37, initialX: 25, initialY: 20, scrollFactor: 0.26 },
    { icon: "🌸", size: 34, initialX: 75, initialY: 75, scrollFactor: 0.29 },

    { icon: "✨", size: 39, initialX: 12, initialY: 60, scrollFactor: 0.31 },
    { icon: "🌸", size: 36, initialX: 88, initialY: 50, scrollFactor: 0.24 },

    { icon: "✨", size: 35, initialX: 50, initialY: 10, scrollFactor: 0.28 },
    { icon: "🎊", size: 38, initialX: 45, initialY: 80, scrollFactor: 0.32 },
  ];

  return (
    <div className="fixed inset-0 z-0 w-full min-h-screen overflow-hidden">
      {/* Lớp trong cùng: Background Image mờ */}
      {backgroundImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            backfaceVisibility: "hidden",
          }}
        />
      )}

      {/* Lớp giữa: Gradient màu */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 via-40% to-orange-100"
        style={{
          backfaceVisibility: "hidden",
        }}
      />

      {/* Decorative blur elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
          style={{
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Lớp ngoài cùng: Icon layers (Parallax) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {iconLayers.map((layer, index) => (
          <ParallaxLayer key={index} {...layer} />
        ))}
      </div>
    </div>
  );
};
