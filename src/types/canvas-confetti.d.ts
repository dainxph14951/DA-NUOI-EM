declare module "canvas-confetti" {
  namespace confetti {
    interface Options {
      particleCount?: number;
      angle?: number;
      spread?: number;
      startVelocity?: number;
      decay?: number;
      gravity?: number;
      drift?: number;
      ticks?: number;
      origin?: {
        x?: number;
        y?: number;
      };
      colors?: string[];
      shapes?: string[];
      zIndex?: number;
      disableForReducedMotion?: boolean;
      scalar?: number;
    }

    interface CreateOptions {
      resize?: boolean;
      useWorker?: boolean;
    }

    type ConfettiFunction = (options?: Options) => Promise<void>;
    type CreateFunction = (
      canvas: HTMLCanvasElement,
      options?: CreateOptions,
    ) => ConfettiFunction;
  }

  const confetti: confetti.ConfettiFunction & {
    create: confetti.CreateFunction;
    reset: () => void;
  };

  export default confetti;
}
