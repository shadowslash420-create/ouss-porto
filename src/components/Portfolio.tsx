import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Process from './Process';
import Contact from './Contact';
import Footer from './Footer';
import Chatbot from './Chatbot';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger after preloader ends so it recalculates element
    // positions now that overflow:hidden is lifted and the page is visible.
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <div className="relative">
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation ready={!isLoading} />
        <main>
          <Hero />
          <About ready={!isLoading} />
          <Projects />
          <Process />
          <Contact />
          <Chatbot/>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;