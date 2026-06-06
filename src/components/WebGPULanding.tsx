import React, { useEffect, useRef, useState } from 'react';
import { Experience } from '../webgpu/experience';

interface WebGPULandingProps {
  onComplete: () => void;
}

export const WebGPULanding: React.FC<WebGPULandingProps> = ({ onComplete }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<Experience | null>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let active = true;
    const container = canvasContainerRef.current;
    if (!container) return;

    const initExperience = async () => {
      try {
        // Quick support check: WebGPU requires navigator.gpu to be defined
        if (!navigator.gpu) {
          throw new Error('WebGPU is not supported on this browser.');
        }

        const exp = new Experience();
        experienceRef.current = exp;
        await exp.initialize(container);

        if (active) {
          setLoading(false);
        }
      } catch (err) {
        console.warn('Failed to initialize WebGPU: ', err);
        // Fallback: Skip intro screen immediately
        if (active) {
          onComplete();
        }
      }
    };

    initExperience();

    return () => {
      active = false;
      if (experienceRef.current) {
        experienceRef.current.destroy();
        experienceRef.current = null;
      }
    };
  }, [onComplete]);

  const handleStart = () => {
    if (started || !experienceRef.current) return;
    setStarted(true);

    // Trigger the gommage effect
    const orchestrator = experienceRef.current.gommageOrchestratorEntity;
    if (orchestrator) {
      orchestrator.triggerGommage(() => {
        // When the dissolve is complete (approx 6 seconds), fade out the landing screen
        setFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 1000); // Wait for the 1s css transition to finish
      });
    } else {
      // Safety fallback
      setFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Three.js canvas container */}
      <div ref={canvasContainerRef} className="w-full h-full absolute inset-0" />

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-40">
          <div className="flex flex-col items-center gap-4">
            <div className="h-0.5 w-40 bg-[#a9161b]/30 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-[#a9161b] w-1/3 animate-pulse" />
            </div>
            <p className="text-[#d5cbb2] font-serif tracking-widest text-xs uppercase animate-pulse">
              Loading Experience
            </p>
          </div>
        </div>
      )}

      {/* Control UI overlay */}
      {!loading && (
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-full">
          <button
            id="gommage-button"
            className={`E33-button ${started ? 'disabled' : ''}`}
            onClick={handleStart}
            disabled={started}
          >
            {started ? 'Entering...' : 'Enter Collection'}
          </button>
        </div>
      )}
    </div>
  );
};
export default WebGPULanding;
