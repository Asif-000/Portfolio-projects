import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Globe, 
  Database,
  Lightning
} from 'phosphor-react';
import profileImage from '@/assets/profile-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Code, name: 'HTML5', color: 'hsl(25 85% 60%)' },
  { icon: Palette, name: 'CSS3', color: 'hsl(225 85% 60%)' },
  { icon: Lightning, name: 'JavaScript', color: 'hsl(50 85% 60%)' },
  { icon: Globe, name: 'React', color: 'hsl(195 85% 60%)' },
  { icon: Rocket, name: 'GSAP', color: 'hsl(120 85% 60%)' },
  { icon: Code, name: 'Next.js', color: 'hsl(0 0% 100%)' },
  { icon: Database, name: 'Node.js', color: 'hsl(120 85% 40%)' },
  { icon: Database, name: 'MongoDB', color: 'hsl(120 85% 30%)' }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -100, scale: 0.8 },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 100 },
        { 
          opacity: 1, 
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          }
        }
      );

      // Skills animation
      gsap.fromTo('.skill-icon',
        { opacity: 0, scale: 0.5, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-glow-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden glass border-2 border-primary/30 hover:scale-105 hover:rotate-3 transition-all duration-500">
                <img 
                  src={profileImage} 
                  alt="Asif Tazwar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-secondary rounded-full glass flex items-center justify-center animate-float">
                <Code size={24} className="text-secondary" />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-light mb-6">
                About{' '}
                <span className="bg-gradient-secondary bg-clip-text text-transparent font-semibold">
                  Me
                </span>
              </h2>
              <p className="text-lg text-muted-foreground/80 leading-relaxed mb-6">
                I'm a passionate web developer who transforms ideas into immersive digital experiences. 
                With expertise in modern technologies and a keen eye for futuristic design, I craft 
                websites that don't just function – they inspire.
              </p>
              <p className="text-lg text-muted-foreground/80 leading-relaxed">
                My approach combines cutting-edge development practices with creative problem-solving, 
                ensuring every project pushes the boundaries of what's possible on the web.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground/90">
                Technologies I Master
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon glass p-4 rounded-xl hover:glow-primary transition-all duration-300 group cursor-pointer"
                  >
                    <div className="text-center">
                      <skill.icon 
                        size={32} 
                        className="mx-auto mb-2 group-hover:scale-110 transition-transform"
                        style={{ color: skill.color }}
                      />
                      <span className="text-xs text-muted-foreground/80 group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;