import React, { useState, useEffect } from 'react';
import { Home, Layers, Zap, MessageSquare } from 'lucide-react';

export const FloatingBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'interactive', 'contact'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the middle of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'services', icon: Layers, label: 'Services' },
    { id: 'interactive', icon: Zap, label: 'Interactive' },
    { id: 'contact', icon: MessageSquare, label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
      <nav className="matte-panel rounded-full p-2 flex items-center justify-between shadow-xl shadow-brand-dark/5">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all duration-300 relative ${
                isActive ? 'text-brand-light' : 'text-ui-muted hover:text-brand-light'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-brand-light/10 rounded-full" />
              )}
              <IconComp className={`w-5 h-5 mb-0.5 z-10 transition-transform ${isActive ? 'scale-110 text-spark-start' : ''}`} />
              <span className={`text-[9px] font-bold z-10 transition-opacity ${isActive ? 'opacity-100 text-brand-light' : 'opacity-0 absolute'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};
