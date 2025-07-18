import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

      // Form animation
      gsap.fromTo('.form-element',
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      // Social icons animation
      gsap.fromTo('.social-icon',
        { opacity: 0, scale: 0.5, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 80%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Success animation
    gsap.to('.submit-button', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-light text-center mb-16"
        >
          Let's{' '}
          <span className="bg-gradient-secondary bg-clip-text text-transparent font-semibold">
            Connect
          </span>
        </h2>

        <div className="max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
            <div className="form-element">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full glass px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:glow-primary transition-all duration-300 text-foreground placeholder-muted-foreground"
                placeholder="Your amazing name"
              />
            </div>

            <div className="form-element">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full glass px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:glow-primary transition-all duration-300 text-foreground placeholder-muted-foreground"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-element">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full glass px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:glow-primary transition-all duration-300 text-foreground placeholder-muted-foreground resize-none"
                placeholder="Tell me about your amazing project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button w-full neuro-button bg-gradient-secondary text-secondary-foreground py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:glow-secondary transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Social Links */}
          <div className="social-links flex justify-center gap-6 mt-12">
            <a 
              href="#" 
              className="social-icon glass p-4 rounded-full hover:glow-primary transition-all duration-300 group"
            >
              <GithubLogo size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="social-icon glass p-4 rounded-full hover:glow-primary transition-all duration-300 group"
            >
              <LinkedinLogo size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:asif@example.com" 
              className="social-icon glass p-4 rounded-full hover:glow-primary transition-all duration-300 group"
            >
              <EnvelopeSimple size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;