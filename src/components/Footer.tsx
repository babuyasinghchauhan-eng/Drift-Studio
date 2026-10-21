import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'studio', studioTab?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F7F6FA] dark:bg-[#09080F] border-t border-[#19171F]/10 dark:border-white/10 py-14 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#19171F]/10 dark:border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-display text-2xl font-extrabold tracking-tight text-[#19171F] dark:text-white">
              Drift Studio
            </div>
            <p className="text-sm text-[#777481] dark:text-[#9E9AA8] max-w-sm leading-relaxed">
              Your ideas. Already in motion. An open-weight social content studio for creators, developers, and teams who want to spend less time planning posts and more time creating.
            </p>
            <div className="text-xs text-[#777481] dark:text-[#9E9AA8] flex flex-wrap items-center gap-2">
              <span>Hacktoberfest 2026</span>
              <span aria-hidden="true">·</span>
              <span>Week 3: Slow and Steady</span>
            </div>
          </div>

          {/* Workspace Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white">
              Content Studio
            </div>
            <ul className="space-y-2.5 text-sm text-[#777481] dark:text-[#9E9AA8]">
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
                  Content Board
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
              <li>
                <button
                  onClick={() => onNavigate('studio', 'drafts')}
                  className="hover:text-[#5515E8] dark:hover:text-white transition-colors"
                >
                  Saved Drafts & Exports
                </button>
              </li>
            </ul>
          </div>

          {/* Open-AI Architecture Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white">
              Open-Weight AI Approach
            </div>
            <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
              Built around Hugging Face Transformers.js (`SmolLM2-135M-Instruct` Q4 ONNX) with WebGPU / WASM browser execution and an instant, clearly labelled Demo Mode. All campaign data persists locally in your browser.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onNavigate('studio', 'dashboard')}
                className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Workspace & Model Inspector</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777481] dark:text-[#9E9AA8]">
          <div>
            © 2026 Drift Studio · Open-Source AI Challenge Submission
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-semibold text-[#19171F] dark:text-white hover:text-[#5515E8] dark:hover:text-[#7886F8] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
