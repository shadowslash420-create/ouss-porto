import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Handshake } from 'phosphor-react';
import { Button } from './ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const orbRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 4 });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power3.out',
    })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.3')
      .from(imageRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=1');

    gsap.to(orbRef1.current, { y: -20, x: 10, duration: 4, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to(orbRef2.current, { y: -30, x: -15, duration: 5, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: 1 });
    gsap.to(orbRef3.current, { y: -25, x: 20, duration: 6, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: 2 });

    return () => { tl.kill(); };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background orbs */}
      <div ref={orbRef1} className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div ref={orbRef2} className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      <div ref={orbRef3} className="absolute top-1/2 right-1/4 w-48 h-48 bg-accent/8 rounded-full blur-2xl" />

      <div className="container mx-auto px-6 max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-28">

          {/* Left — text */}
          <div className="relative z-10 flex flex-col justify-center">
            <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              I build{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                websites
              </span>{' '}
              that
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                win you clients.
              </span>
            </h1>

            <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Full Stack Developer crafting fast, conversion-focused web apps for businesses that want to stand out and grow online.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
                size="lg"
              >
                View My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                onClick={scrollToContact}
                variant="ghost"
                className="group inline-flex items-center gap-3 px-8 py-4 text-foreground border border-border hover:border-primary/40 hover:bg-primary/5 rounded-xl font-medium transition-all duration-300"
                size="lg"
              >
                <Handshake size={20} />
                Book a Call
              </Button>
            </div>
          </div>

          {/* Right — hero image */}
          <div ref={imageRef} className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-xl">
              {/* Indigo glow behind image */}
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl blur-2xl scale-105" />
              <img
                src="/Images/hero-developer.jpg"
                alt="Professional developer workspace"
                className="relative z-10 w-full h-auto rounded-2xl shadow-[0_24px_80px_rgba(79,70,229,0.15)] border border-border/30 object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
