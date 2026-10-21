import React from 'react';
import { ArrowUp, Github, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'studio', studioTab?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F7F6FA] dark:bg-[#08070D] border-t border-black/5 dark:border-white/5 py-12 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-black/5 dark:border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xl font-black text-[#19171F] dark:text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#5515E8]" />
              Drift Studio
            </div>
            <p className="text-sm text-[#777481] dark:text-[#9590A3] max-w-sm leading-relaxed">
              Open-weight social content creation workspace. Built for indie hackers, creators, and teams who want to spend less time posting and more time creating.
            </p>
            <div className="text-xs text-[#777481] dark:text-[#9590A3] flex items-center gap-2">
              <span>Hacktoberfest 2026</span>
              <span>·</span>
              <span>Week 3: Slow and Steady</span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white">
              Workspace
            </div>
            <ul className="space-y-2 text-sm text-[#777481] dark:text-[#9590A3]">
              <li>
                <button
                  onClick={() => onNavigate('studio', 'dashboard')}
                  className="hover:text-[#5515E8] dark:hover:text-white transition-colors"
                >
                  Studio Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'create')}
                  className="hover:text-[#5515E8] dark:hover:text-white transition-colors"
                >
                  New Content Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'board')}
                  className="hover:text-[#5515E8] dark:hover:text-white transition-colors"
                >
                  Kanban Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'calendar')}
                  className="hover:text-[#5515E8] dark:hover:text-white transition-colors"
                >
                  Weekly Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Open Source Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white">
              Open Intelligence
            </div>
            <p className="text-xs text-[#777481] dark:text-[#9590A3] leading-relaxed">
              Powered by open-weight transformers (SmolLM2 / Qwen). Runs in-browser via WebGPU and WASM without commercial API lock-in. Content is kept confidential in local storage.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('studio', 'engine')}
                className="text-xs font-semibold text-[#5515E8] dark:text-[#7886F8] hover:underline flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Engine Diagnostics</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom row: copyright and scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777481] dark:text-[#9590A3]">
          <div>
            © 2026 Drift Studio. Open-source under MIT License.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#19171F] dark:hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
