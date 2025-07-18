import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });

    // Animate headline
    tl.fromTo(headlineRef.current,
      { 
        opacity: 0, 
        y: 60, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }
    );

    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate CTA
    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    // Animate Spline container
    tl.fromTo(splineRef.current,
      { opacity: 0, x: 100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.6'
    );

    // Add floating animation to CTA
    gsap.to(ctaRef.current, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>

      {/* Background Spline 3D */}
      {/* 
      <div ref={splineRef} className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] lg:h-[700px] translate-y-20">
          <iframe 
            src='https://my.spline.design/orb-8RTau1gltLhHOP4UWrhpM3aG/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="rounded-2xl opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-glow opacity-20 rounded-2xl pointer-events-none"></div>
        </div>
      </div>
      */}

      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10 min-h-screen">
        {/* Content */}
        <div className="space-y-8">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">
              Asif Tazwar
            </span>
            <br />
            <span className="text-muted-foreground">Web Developer</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto"
          >
            Crafting immersive digital experiences with cutting-edge technologies 
            and futuristic design aesthetics.
          </p>

          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="group neuro-button px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-lg flex items-center gap-3 hover:glow-primary transition-all duration-300 mx-auto"
          >
            Hire Me
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;