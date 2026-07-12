import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChatCircle, X, PaperPlaneTilt, Robot } from 'phosphor-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Oussama's AI assistant. Ask me anything — pricing, timeline, tech stack, process, availability, you name it.",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(buttonRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, delay: 2, ease: "back.out(1.7)" }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatboxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isOpen) {
      gsap.to(chatboxRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  const getBotResponse = (input: string): string => {
    const text = input.toLowerCase();

    const includesAny = (keywords: string[]) => keywords.some((k) => text.includes(k));

    if (includesAny(['price', 'pricing', 'cost', 'budget', 'how much', 'rate', 'quote'])) {
      return "Pricing depends on the size and features of your project — a simple one-page portfolio costs less than a full app with a backend, database, or admin dashboard. Send me a quick description of what you need at oussamaanis2005@gmail.com or +213 797086530, and I'll get you a fair quote based on scope, features, and functions required.";
    }

    if (includesAny(['how long', 'timeline', 'duration', 'time', 'deadline', 'delivery', 'turnaround'])) {
      return "Timelines depend on the app's size and features. A simple portfolio site usually takes about 1 week. More complex apps with backend logic, databases, or custom integrations take longer — I'll give you an exact estimate once I know the scope.";
    }

    if (includesAny(['process', 'workflow', 'how do you work', 'steps', 'how it works'])) {
      return "The process is simple: 1) You share your requirements and goals, 2) I send a proposal with timeline and pricing, 3) I build in stages and share progress, 4) You review and request revisions, 5) I deploy and hand off the finished project. A portfolio-style site typically takes about 1 week end-to-end.";
    }

    if (includesAny(['payment', 'pay', 'deposit', 'invoice'])) {
      return "Payment is usually split — a deposit upfront to start the project, and the remainder on delivery. Exact terms depend on project size and can be discussed directly at oussamaanis2005@gmail.com.";
    }

    if (includesAny(['revision', 'change', 'edit request', 'update after'])) {
      return "A reasonable number of revisions are included after delivery to make sure you're happy with the result. Larger scope changes beyond the original request are quoted separately.";
    }

    if (includesAny(['maintenance', 'support', 'bug fix', 'after launch', 'ongoing'])) {
      return "I offer post-launch support and maintenance — bug fixes, small updates, and ongoing improvements — available as a one-off or a monthly arrangement depending on your needs.";
    }

    if (includesAny(['hosting', 'deploy', 'domain', 'server'])) {
      return "I can handle deployment and hosting setup for you (e.g. Vercel, Netlify, VPS, or Replit), and help connect a custom domain. Hosting costs (if any) are separate from development costs and depend on the platform you choose.";
    }

    if (includesAny(['seo'])) {
      return "Yes, I build with SEO fundamentals in mind — semantic HTML, fast load times, meta tags, and responsive design — so your site is discoverable and performs well in search results.";
    }

    if (includesAny(['nda', 'confidential', 'contract'])) {
      return "I'm happy to sign an NDA or contract before discussing sensitive project details — just send it over to oussamaanis2005@gmail.com.";
    }

    if (includesAny(['available', 'availability', 'when can you', 'free to talk', 'hours', 'schedule'])) {
      return "I'm available daily from 8 AM to 4 PM (Batna, Algeria time). Feel free to reach out by email or phone during those hours, or leave a message and I'll get back to you.";
    }

    if (includesAny(['service', 'what do you do', 'what can you build', 'offer'])) {
      return "I build full-stack web applications — from responsive portfolio and business sites to complex apps with React, Node.js, Express, MongoDB/PostgreSQL, RESTful APIs, and interactive animations with GSAP/WebGL.";
    }

    if (includesAny(['contact', 'email', 'phone', 'reach', 'call', 'whatsapp'])) {
      return "You can reach Oussama directly at oussamaanis2005@gmail.com or +213 797086530 (0797086530). He's based in Batna, Algeria and available 8 AM–4 PM.";
    }

    if (includesAny(['react', 'node', 'express', 'mongodb', 'postgres', 'mysql', 'docker', 'git', 'stack', 'technology', 'tech'])) {
      return "The tech stack includes React, Node.js, Express, MongoDB and PostgreSQL/MySQL, RESTful APIs, Docker, Git, and animation tools like GSAP and WebGL for interactive, high-performance interfaces.";
    }

    if (includesAny(['project', 'portfolio', 'work', 'experience'])) {
      return "Oussama is a Full-Stack Developer with hands-on experience building React/Node.js applications, RESTful APIs, and animated interfaces. Check out the Projects section above, or ask me about pricing, timeline, or the tech stack.";
    }

    if (includesAny(['hi', 'hello', 'hey', 'good morning', 'good afternoon'])) {
      return "Hey there! I'm Oussama's AI assistant. Ask me about pricing, timelines, the process, tech stack, or availability — happy to help.";
    }

    if (includesAny(['thank', 'thanks'])) {
      return "You're welcome! Let me know if you have any other questions.";
    }

    return "That's a great question — for exact details I'd recommend reaching out directly to Oussama at oussamaanis2005@gmail.com or +213 797086530 (available 8 AM–4 PM, Batna, Algeria). In the meantime, feel free to ask me about pricing, timelines, the process, tech stack, or availability.";
  };

  const handleSendMessage = () => {
    if (!message.trim() || isTyping) return;

    const trimmed = message.trim();

    const newUserMessage = {
      id: messages.length + 1,
      text: trimmed,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(trimmed);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: reply,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div ref={chatboxRef} className="mb-4 w-80 h-96 glass-card overflow-hidden flex flex-col bg-black border-1 border-gray-200">
          <div className="p-4 border-b border-glass-border ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-full">
                  <Robot size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.isBot
                    ? 'bg-muted/20 text-foreground'
                    : 'bg-gradient-primary text-foreground'
                    }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs px-3 py-2 rounded-lg text-sm bg-muted/20 text-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." disabled={isTyping} className="flex-1 px-3 py-2 bg-glass border border-glass-border rounded-lg text-sm focus:outline-none focus:border-primary disabled:opacity-60" />
              <button onClick={handleSendMessage} disabled={isTyping} className="p-2 w-8 h-8 bg-gradient-primary rounded-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100">
                <PaperPlaneTilt size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button ref={buttonRef} onClick={toggleChat} className="chatbot w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform">
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <ChatCircle size={24} className="text-foreground" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;