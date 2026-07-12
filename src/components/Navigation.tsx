import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 3.5,
    });
    gsap.from([leftRef.current, logoRef.current, rightRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 3.8,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      gsap.from(mobileMenuRef.current?.querySelectorAll('.menu-item') || [], {
        x: 50, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.2,
      });
    } else {
      gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.5, ease: 'power3.out' });
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Work', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center">

            {/* Left — nav links */}
            <div ref={leftRef} className="hidden md:flex items-center gap-8">
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
            <div ref={rightRef} className="hidden md:flex items-center justify-end gap-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <GithubLogo size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} />
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="ml-2 px-5 py-1.5 bg-gradient-primary text-white text-sm rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex justify-end col-span-2">
              <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2">
                <List size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div ref={mobileMenuRef} className="fixed top-0 right-0 w-full h-full bg-background/95 backdrop-blur-lg z-50 transform translate-x-full md:hidden">
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Oussama</span>
          <button onClick={() => setIsOpen(false)} className="text-foreground p-2">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 p-6 mt-8">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="menu-item text-left text-xl text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </button>
          ))}

          <div className="menu-item flex gap-4 pt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors duration-200">
              <GithubLogo size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors duration-200">
              <LinkedinLogo size={24} />
            </a>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="menu-item px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow-primary transition-all duration-300 text-center mt-4"
          >
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
