import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe, TrendUp } from 'phosphor-react';
import CircularGallery from './CircularGallery';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Golden Rose Bakes',
    description: 'Wedding sweets storefront with a rose-gold aesthetic and Arabic-friendly layout. Designed to convert local visitors into customers.',
    metric: '↑ New customer inquiries within 1 week of launch',
    image: '/Images/project-1.jpg',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://golden-rose-portfolio--oussamaanis2005.replit.app/',
  },
  {
    id: 2,
    title: 'Creperie Kinder 5',
    description: 'Business site for a crepe shop in Batna — built to drive online orders and foot traffic for a local brand with no prior web presence.',
    metric: '↑ Online visibility from zero — fully indexed in 2 weeks',
    image: '/Images/project-2.jpg',
    tech: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://creperiekinder-delta.vercel.app',
  },
  {
    id: 3,
    title: 'Las Palmas',
    description: 'Upscale restaurant website with a dark, immersive aesthetic that matches the brand\'s premium identity in Oran.',
    metric: '↑ Brand perception elevated — client\'s first professional web presence',
    image: '/Images/project-3.jpg',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://laspalmas-gilt.vercel.app/',
  },
];

const galleryItems = projects.map((p) => ({
  image: p.image,
  text: p.title,
}));

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });
      gsap.from(cardsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Section title */}
      <div ref={titleRef} className="text-center mb-4 px-6">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
          Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Scroll or drag to browse — real client projects built to convert.
        </p>
      </div>

      {/* CircularGallery */}
      <div style={{ height: '520px', position: 'relative' }}>
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#0F172A"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.03}
          font="bold 26px Inter"
          fontUrl="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
        />
      </div>

      {/* Project detail cards below gallery */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto mt-10">
        {projects.map((project) => (
          <div
            key={project.id}
            role="link"
            tabIndex={0}
            onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className="glass rounded-xl p-6 flex flex-col gap-3 hover:shadow-neon transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>

            <div className="flex items-start gap-2 px-3 py-2 bg-secondary/8 border border-secondary/15 rounded-lg">
              <TrendUp size={13} className="text-primary shrink-0 mt-0.5" />
              <span className="text-primary text-xs font-medium leading-snug">{project.metric}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-primary/8 text-primary text-xs rounded-full border border-primary/15 font-medium">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all duration-200 mt-1"
            >
              <Globe size={14} />
              View Live Site
              <ArrowUpRight size={14} />
            </a>
          </div>
        ))}
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default Projects;
