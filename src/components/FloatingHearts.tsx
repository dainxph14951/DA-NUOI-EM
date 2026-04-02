import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";

export const FloatingHearts: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Initialize engine without presets
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#ff69b4"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.2,
            },
          },
          size: {
            value: {
              min: 15,
              max: 35,
            },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 10,
            },
          },
          move: {
            enable: true,
            speed: {
              min: 0.3,
              max: 1.5,
            },
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 120,
              duration: 0.4,
            },
          },
        },
      }}
      className="fixed inset-0 pointer-events-none"
    />
  );
};
