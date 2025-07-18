import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe } from 'phosphor-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Quantum Dashboard',
    description: 'Advanced analytics platform with real-time data visualization and AI-powered insights.',
    image: project1,
    tech: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'NeoCommerce',
    description: 'Next-generation e-commerce platform with immersive shopping experiences.',
    image: project2,
    tech: ['Next.js', 'Stripe', 'MongoDB', 'GSAP'],
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'CryptoVault',
    description: 'Cryptocurrency portfolio tracker with advanced charting and risk analysis.',
    image: project3,
    tech: ['React', 'Web3', 'Chart.js', 'Firebase'],
    liveUrl: '#'
  },
  {
    id: 4,
    title: 'SocialSphere',
    description: 'Modern social media platform with real-time messaging and content sharing.',
    image: project4,
    tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    liveUrl: '#'
  },
  {
    id: 5,
    title: 'TaskForge',
    description: 'Intelligent task management system with AI-powered productivity insights.',
    image: project5,
    tech: ['Vue.js', 'Python', 'FastAPI', 'Redis'],
    liveUrl: '#'
  },
  {
    id: 6,
    title: 'Neural Net Studio',
    description: 'Machine learning visualization platform for neural network analysis.',
    image: project6,
    tech: ['React', 'TensorFlow.js', 'WebGL', 'Python'],
    liveUrl: '#'
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Project cards animation
      gsap.fromTo('.project-card',
        { opacity: 0, scale: 0.8, y: 100 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: scrollRef.current,
            start: 'top 80%',
          }
        }
      );

      // Horizontal scroll on desktop
      if (window.innerWidth > 768) {
        const scrollWidth = scrollRef.current?.scrollWidth || 0;
        const containerWidth = scrollRef.current?.offsetWidth || 0;
        
        gsap.to(scrollRef.current, {
          x: -(scrollWidth - containerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth - containerWidth}`,
            pin: true,
            scrub: 1,
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-light text-center mb-16"
        >
          Featured{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">
            Projects
          </span>
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {(showAllProjects ? projects : projects.slice(0, 6)).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View More Button */}
        {!showAllProjects && projects.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllProjects(true)}
              className="neuro-button px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-lg hover:glow-primary transition-all duration-300"
            >
              View More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = (isHovering: boolean) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: isHovering ? -10 : 0,
        scale: isHovering ? 1.02 : 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className="project-card glass p-6 rounded-2xl w-full hover:glow-primary transition-all duration-500"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="relative overflow-hidden rounded-xl mb-6 group">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
        <p className="text-muted-foreground/80 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <button className="w-full neuro-button bg-gradient-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:glow-primary transition-all">
          <Globe size={18} />
          View Live Site
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectsSection;