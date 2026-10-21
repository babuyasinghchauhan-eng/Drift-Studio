import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'studio';
  onNavigate: (view: 'landing' | 'studio', studioTab?: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0D0B14]/95 backdrop-blur-md border-b border-[#19171F]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => onNavigate('landing')}
          className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#19171F] dark:text-white whitespace-nowrap shrink-0 hover:text-[#5515E8] dark:hover:text-[#7886F8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5515E8]"
        >
          Drift Studio
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-[#777481] dark:text-[#9E9AA8]">
          <button
            onClick={() => scrollToSection('scene-product')}
            className="hover:text-[#19171F] dark:hover:text-white underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Workspace
          </button>
          <button
            onClick={() => scrollToSection('scene-tools')}
            className="hover:text-[#19171F] dark:hover:text-white underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Tools
          </button>
          <button
            onClick={() => scrollToSection('scene-workflow')}
            className="hover:text-[#19171F] dark:hover:text-white underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollToSection('scene-openai')}
            className="hover:text-[#19171F] dark:hover:text-white underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Open AI
          </button>
          <button
            onClick={() => scrollToSection('scene-faq')}
            className="hover:text-[#19171F] dark:hover:text-white underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: Theme toggle + 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#5515E8]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onNavigate('studio', 'dashboard')}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:translate-y-px rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5515E8]"
          >
            <span>Open Studio</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#19171F] dark:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/10"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white dark:bg-[#0D0B14] border-b border-[#19171F]/10 dark:border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1 text-base font-semibold text-[#19171F] dark:text-white">
            <button
              onClick={() => scrollToSection('scene-product')}
              className="text-left px-3 py-3 rounded-xl hover:bg-[#F7F6FA] dark:hover:bg-white/5"
            >
              Workspace Preview
            </button>
            <button
              onClick={() => scrollToSection('scene-tools')}
              className="text-left px-3 py-3 rounded-xl hover:bg-[#F7F6FA] dark:hover:bg-white/5"
            >
              Intelligent Tools
            </button>
            <button
              onClick={() => scrollToSection('scene-workflow')}
              className="text-left px-3 py-3 rounded-xl hover:bg-[#F7F6FA] dark:hover:bg-white/5"
            >
              Three-Step Workflow
            </button>
            <button
              onClick={() => scrollToSection('scene-openai')}
              className="text-left px-3 py-3 rounded-xl hover:bg-[#F7F6FA] dark:hover:bg-white/5"
            >
              Open-Weight AI
            </button>
            <button
              onClick={() => scrollToSection('scene-faq')}
              className="text-left px-3 py-3 rounded-xl hover:bg-[#F7F6FA] dark:hover:bg-white/5"
            >
              FAQ
            </button>
            <div className="pt-3 mt-2 border-t border-[#19171F]/10 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={onToggleTheme}
                className="w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-sm font-semibold text-[#19171F] dark:text-white bg-[#F7F6FA] dark:bg-white/5 hover:bg-[#F0EDFF] dark:hover:bg-white/10 transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F8E84C]" /> : <Moon className="w-4 h-4 text-[#5515E8]" />}
                  <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </span>
                <span className="text-xs uppercase tracking-wider font-mono text-[#777481] dark:text-[#9E9AA8]">
                  {theme}
                </span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('studio', 'create');
                }}
                className="w-full py-3.5 text-center font-bold text-white bg-[#5515E8] rounded-xl hover:bg-[#35108F] active:translate-y-px transition-all"
              >
                Create my first plan
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
