import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo appearance
    tl.fromTo(logoRef.current, 
      { 
        opacity: 0, 
        scale: 0.8, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }
    );

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onComplete: () => {
        // Hide preloader
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      }
    }, '-=0.5');

    // Add glow animation to logo
    gsap.to(logoRef.current, {
      textShadow: '0 0 30px hsl(215 100% 60% / 0.8), 0 0 50px hsl(215 100% 60% / 0.6)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
      
      <div ref={logoRef} className="text-center">
        <h1 className="text-6xl md:text-8xl font-light mb-4 bg-gradient-primary bg-clip-text text-transparent">
          AT
        </h1>
        <p className="text-xl md:text-2xl font-light text-muted-foreground mb-8">
          Asif Tazwar
        </p>
        <div className="text-sm text-muted-foreground/60 tracking-widest">
          LOADING EXPERIENCE...
        </div>
      </div>

      <div className="progress-container">
        <div ref={progressRef} className="progress-bar"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;