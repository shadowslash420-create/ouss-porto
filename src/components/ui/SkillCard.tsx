import { useRef, useState } from 'react';
import type { ElementType } from 'react';

interface SkillCardProps {
  icon: ElementType;
  name: string;
  level: number;
}

const SkillCard = ({ icon: Icon, name, level }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass p-6 cursor-pointer rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
      style={{ isolation: 'isolate' }}
    >
      {/* Shape blur spotlight that follows the cursor */}
      <div
        className="pointer-events-none absolute rounded-full transition-opacity duration-300"
        style={{
          width: 180,
          height: 180,
          left: pos.x - 90,
          top: pos.y - 90,
          background: 'radial-gradient(circle, hsl(245 75% 59% / 0.22) 0%, hsl(262 72% 56% / 0.10) 50%, transparent 70%)',
          filter: 'blur(24px)',
          opacity: hovered ? 1 : 0,
          transform: 'translateZ(0)',
        }}
      />
      {/* Subtle border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: 'inset 0 0 0 1px hsl(245 75% 59% / 0.25)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} className="text-white" />
        </div>

        <h4 className="text-base font-medium text-foreground">{name}</h4>

        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-gradient-primary h-1.5 rounded-full transition-all duration-700"
            style={{ width: `${level}%` }}
          />
        </div>

        <span className="text-sm font-semibold text-primary">{level}%</span>
      </div>
    </div>
  );
};

export default SkillCard;
