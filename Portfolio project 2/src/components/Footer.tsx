import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Code } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );

      // Particle animation
      gsap.to('.footer-particle', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: 'power1.inOut'
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="py-16 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="footer-particle absolute w-2 h-2 bg-primary/30 rounded-full top-10 left-10"></div>
        <div className="footer-particle absolute w-3 h-3 bg-secondary/20 rounded-full top-20 right-20"></div>
        <div className="footer-particle absolute w-1 h-1 bg-accent/40 rounded-full bottom-20 left-1/4"></div>
        <div className="footer-particle absolute w-2 h-2 bg-primary/20 rounded-full bottom-10 right-1/3"></div>
        <div className="footer-particle absolute w-1 h-1 bg-secondary/30 rounded-full top-1/2 left-1/2"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="glass p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AT</span>
              </div>
              <div>
                <div className="text-lg font-semibold">Asif Tazwar</div>
                <div className="text-sm text-muted-foreground">Web Developer</div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <button 
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop}
              className="glass p-3 rounded-full hover:glow-primary transition-all duration-300 group"
            >
              <Code size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          <div className="border-t border-border/30 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>and lots of</span>
                <Code size={16} className="text-primary" />
                <span>by Asif Tazwar</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © 2024 All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;