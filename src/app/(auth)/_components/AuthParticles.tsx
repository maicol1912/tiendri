"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { ParticlesProvider } from "@tsparticles/react";
import type { ISourceOptions, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const particleOptions: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  pauseOnBlur: false,
  pauseOnOutsideViewport: false,
  particles: {
    number: {
      value: 18,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#3B82F6", "#2563EB", "#1D4ED8", "#60A5FA"],
    },
    shape: {
      type: ["circle"],
    },
    opacity: {
      value: { min: 0.15, max: 0.35 },
      animation: {
        enable: true,
        speed: 0.3,
        sync: false,
      },
    },
    size: {
      value: { min: 25, max: 70 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 0.2, max: 0.6 },
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: {
        default: "out" as const,
      },
    },
    rotate: {
      value: { min: 0, max: 360 },
      direction: "random" as const,
      animation: {
        enable: true,
        speed: 1.5,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: false,
      },
      onClick: {
        enable: false,
      },
    },
  },
  detectRetina: true,
};

function ParticlesCanvas() {
  return (
    <Particles
      id="auth-particles"
      options={particleOptions}
      className="absolute inset-0 z-0"
    />
  );
}

export function AuthParticles() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <ParticlesCanvas />
    </ParticlesProvider>
  );
}
