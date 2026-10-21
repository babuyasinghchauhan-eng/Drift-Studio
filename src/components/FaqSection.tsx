import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Which AI model powers Drift Studio?',
    a: 'Drift Studio is designed around open-weight language models (including SmolLM2 and quantized Qwen architectures). It uses a modular inference adapter that supports WebGPU in supported browsers, WebAssembly CPU execution as a fallback, and an instant high-speed demo generator so you can always explore without waiting for gigabytes of downloads.',
  },
  {
    q: 'Does my content leave my device?',
    a: 'No. Drift Studio stores your campaign briefs, drafts, board stages, and calendar schedules entirely in your browser’s local storage (localStorage). When running local inference via WebGPU/WASM, tokens are generated right on your machine with zero server-side telemetry or telemetry logging.',
  },
  {
    q: 'Can I edit the generated content?',
    a: 'Yes, 100%. Every generated draft is fully editable. You can edit the hook, body text, hashtags, call to action, and angle notes. You can also run focused AI micro-actions like generating 3 alternative hooks, shortening the text, changing tone, or repurposing to another platform.',
  },
  {
    q: 'Does Drift Studio publish automatically to social networks?',
    a: 'No. Drift Studio is an editorial planning workspace, not an automated publishing bot. We do not require you to connect your social media passwords or deal with brittle 3rd-party OAuth APIs. Instead, Drift provides instant one-click copying and clean export to CSV, JSON, and plain text so you can publish with full control.',
  },
  {
    q: 'What happens if WebGPU or AI inference is unavailable?',
    a: 'If your browser does not support WebGPU or is in a battery-saver state, Drift automatically switches to its high-speed browser engine or demo mode. You can still create campaigns, explore example briefs, edit drafts, organize your board, schedule calendar slots, and export your content seamlessly.',
  },
  {
    q: 'How do I export my finished drafts?',
    a: 'You can export at any time from the content board or campaign modal. Drift supports CSV export (ideal for Notion, Google Sheets, or Airtable), formatted plain-text bundles (.txt), and full JSON backups for developers.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="scene-faq" className="py-20 sm:py-28 bg-white dark:bg-[#0C0B12] transition-colors border-t border-black/5 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            07 · Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            Clear answers.
            <br />
            No marketing ambiguity.
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#F7F6FA] dark:bg-[#151222] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#19171F] dark:text-white hover:text-[#5515E8] dark:hover:text-[#7886F8] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[#777481] dark:text-[#9590A3] transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-[#5515E8]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
