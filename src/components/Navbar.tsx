import React, { useState } from 'react';
import { Sun, Moon, ArrowRight, Menu, X, LayoutGrid } from 'lucide-react';

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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0C0B12]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('landing')}
          className="text-xl sm:text-2xl font-black tracking-tight text-[#19171F] dark:text-white flex items-center gap-2 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#5515E8] shadow-[0_0_12px_rgba(85,21,232,0.8)]" />
          Drift Studio
        </button>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#777481] dark:text-[#9590A3]">
          <button
            onClick={() => scrollToSection('scene-product')}
            className="hover:text-[#19171F] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection('scene-tools')}
            className="hover:text-[#19171F] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Intelligence
          </button>
          <button
            onClick={() => scrollToSection('scene-workflow')}
            className="hover:text-[#19171F] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollToSection('scene-openai')}
            className="hover:text-[#19171F] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Open Weights
          </button>
          <button
            onClick={() => scrollToSection('scene-faq')}
            className="hover:text-[#19171F] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9590A3] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('studio')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#5515E8] hover:bg-[#35108F] active:scale-95 rounded-xl transition-all shadow-md shadow-[#5515E8]/20 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#19171F] dark:text-white bg-[#F7F6FA] dark:bg-[#1E1B28] hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 rounded-xl transition-all border border-black/5 dark:border-white/10 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Back to Showcase</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#19171F] dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white dark:bg-[#0C0B12] border-b border-black/5 dark:border-white/10 shadow-lg">
          <div className="flex flex-col gap-3 text-sm font-medium text-[#777481] dark:text-[#9590A3]">
            <button
              onClick={() => scrollToSection('scene-product')}
              className="text-left py-2 hover:text-[#19171F] dark:hover:text-white"
            >
              Product In Action
            </button>
            <button
              onClick={() => scrollToSection('scene-tools')}
              className="text-left py-2 hover:text-[#19171F] dark:hover:text-white"
            >
              Intelligent Tools
            </button>
            <button
              onClick={() => scrollToSection('scene-workflow')}
              className="text-left py-2 hover:text-[#19171F] dark:hover:text-white"
            >
              The 3-Step Workflow
            </button>
            <button
              onClick={() => scrollToSection('scene-openai')}
              className="text-left py-2 hover:text-[#19171F] dark:hover:text-white"
            >
              Open AI Architecture
            </button>
            <button
              onClick={() => scrollToSection('scene-faq')}
              className="text-left py-2 hover:text-[#19171F] dark:hover:text-white"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(currentView === 'landing' ? 'studio' : 'landing');
              }}
              className="mt-2 w-full py-2.5 text-center font-semibold text-white bg-[#5515E8] rounded-xl"
            >
              {currentView === 'landing' ? 'Open Drift Studio' : 'Back to Showcase'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
