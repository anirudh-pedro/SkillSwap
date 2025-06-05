"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "../../../../libs/utils";
import { motion, useAnimation } from "framer-motion";

const SparklesCore = (props) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container) => {
    console.log(container);
  };

  const generatedId = useId();
  
  return (
    <motion.div className={cn("opacity-0", className)} id={id || generatedId}>
      {init && (
        <Particles
          key={id || generatedId}
          id={id || generatedId}
          particlesLoaded={particlesLoaded}
          style={{
            background,
          }}
          options={{
            background: {
              color: {
                value: background || "#0d47a1",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 90,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              bounce: {
                horizontal: { value: 1 },
                vertical: { value: 1 },
              },
              collisions: {
                absorb: { speed: 2 },
                bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: { enable: true, retries: 0 },
              },
              color: { value: particleColor || "#ffffff" },
              move: { enable: true, speed: speed || 1.5, direction: "none" },
              number: { value: particleDensity || 300, density: { enable: true } },
              opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true } },
              size: { value: { min: minSize || 1, max: maxSize || 3 } },
              shape: { type: "circle" },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

const SparklesPreview = () => {
  return (
    <div className="h-fit w-fit bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="text-3xl font-bold text-center text-white relative z-20">
        SkillSwap
      </h1>
      <div className="w-[12rem] h-5 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
};

export default SparklesCore;
export { SparklesPreview };
