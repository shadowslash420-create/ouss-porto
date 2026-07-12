import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quotes } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Oussama delivered a stunning site for our bakery. Customers keep telling us they found us online — exactly what we needed.",
    name: "Golden Rose Bakes",
    role: "Bakery & Sweets Shop",
  },
  {
    quote: "Our website went live and the very next week we started getting online inquiries. Clean, fast, and exactly our brand.",
    name: "Creperie Kinder 5",
    role: "Crepes & Desserts Shop",
  },
  {
    quote: "The final result was beyond what we imagined. The design captures the elegance of our restaurant perfectly.",
    name: "Las Palmas",
    role: "Fine Dining Restaurant, Oran",
  },
];

const SocialProof = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 relative overflow-hidden border-y border-border/40">
      <div className="container mx-auto max-w-6xl">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
          Trusted by real businesses
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass rounded-xl p-6 flex flex-col gap-4 hover:shadow-neon transition-all duration-300"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} weight="fill" className="text-secondary" />
                ))}
              </div>

              <Quotes size={20} weight="fill" className="text-primary/40" />

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              <div className="border-t border-border/40 pt-4">
                <p className="text-foreground font-medium text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
    </section>
  );
};

export default SocialProof;
