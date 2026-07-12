import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagnifyingGlass, PencilLine, RocketLaunch } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: MagnifyingGlass,
    title: 'Discovery',
    description:
      'We start with a conversation. I learn about your business, your goals, and your audience — then map out exactly what your site needs to achieve.',
  },
  {
    number: '02',
    icon: PencilLine,
    title: 'Design & Build',
    description:
      'I design and develop your site with conversion in mind: fast load times, clean layout, mobile-first, and a clear path from visitor to client.',
  },
  {
    number: '03',
    icon: RocketLaunch,
    title: 'Launch & Deliver',
    description:
      'You get a fully tested, production-ready site — handed off with everything you need to manage and grow it confidently.',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(stepsRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="pt-10 pb-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            How I <span className="text-primary-glow">Work</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A simple, transparent process — so you always know what's happening and what comes next.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* connector line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-primary/40 to-transparent z-0 -translate-x-4" />
              )}

              <div className="glass rounded-2xl p-8 flex flex-col items-start gap-5 hover:shadow-neon transition-all duration-300 relative z-10 h-full">
                <div className="flex items-center justify-between w-full">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-primary">
                    <step.icon size={26} className="text-primary-foreground" />
                  </div>
                  <span className="text-5xl font-black text-primary/10 select-none leading-none">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
};

export default Process;
