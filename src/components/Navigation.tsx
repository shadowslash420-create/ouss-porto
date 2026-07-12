import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GithubLogo, InstagramLogo } from 'phosphor-react';
import BubbleMenu from './BubbleMenu';

interface NavigationProps {
  ready?: boolean;
}

const Navigation = ({ ready = true }: NavigationProps) => {
  const navRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Fire the entrance animation once, right when the preloader actually
    // hands off control — not on a hardcoded delay decoupled from it, which
    // left the header invisible/stuck for a beat after content appeared.
    if (!ready || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    gsap.set(navRef.current, { opacity: 1 });
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from([leftRef.current, logoRef.current, rightRef.current].filter(Boolean), {
      y: -20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, [ready]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Work', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const bubbleItems = [
    { label: 'home', href: '#hero', ariaLabel: 'Home', rotation: -8, hoverStyles: { bgColor: '#4F46E5', textColor: '#ffffff' } },
    { label: 'about', href: '#about', ariaLabel: 'About', rotation: 8, hoverStyles: { bgColor: '#6D28D9', textColor: '#ffffff' } },
    { label: 'work', href: '#projects', ariaLabel: 'Work', rotation: -8, hoverStyles: { bgColor: '#2563EB', textColor: '#ffffff' } },
    { label: 'contact', href: '#contact', ariaLabel: 'Contact', rotation: 8, hoverStyles: { bgColor: '#4F46E5', textColor: '#ffffff' } },
  ];

  return (
    <>
      {/* Desktop / tablet header */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 hidden md:block"
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center">

            {/* Left — nav links */}
            <div ref={leftRef} className="flex items-center gap-8">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 font-medium tracking-wide"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Center — logo */}
            <div ref={logoRef} className="flex justify-center">
              <button
                onClick={() => scrollToSection('hero')}
                className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
                style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
              >
                Oussama
              </button>
            </div>

            {/* Right — social icons */}
            <div ref={rightRef} className="flex items-center justify-end gap-5">
              <a
                href="https://github.com/shadowslash420-create"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <GithubLogo size={20} />
              </a>
              <a
                href="https://www.instagram.com/oussama__zerafi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} />
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="ml-2 px-5 py-1.5 bg-gradient-primary text-white text-sm rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                Hire Me
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile header — BubbleMenu (React Bits) */}
      <div className="md:hidden">
        <BubbleMenu
          logo={<span style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}>Oussama</span>}
          items={bubbleItems}
          menuAriaLabel="Toggle navigation"
          menuBg="rgba(255,255,255,0.95)"
          menuContentColor="#1e1b4b"
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </div>
    </>
  );
};

export default Navigation;
