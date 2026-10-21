import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RevealSection } from './RevealSection';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Which AI model powers Drift?',
    a: 'Drift Studio uses open-weight language models via Hugging Face Transformers.js (specifically HuggingFaceTB/SmolLM2-135M-Instruct in Q4 ONNX format) when local browser inference is initialized. It also provides an instant, clearly labelled Demo Mode so you can explore the workspace immediately without waiting for model weights to download.',
  },
  {
    q: 'Does my content leave my device?',
    a: 'Your campaign briefs, generated drafts, board stages, and calendar schedules are persisted locally in your browser’s localStorage. When using local browser inference or Demo Mode, your text is processed directly inside your browser tab and is never sent to a remote analytics server. Note that initializing the local open-weight model for the first time requires internet access to download the model weights from Hugging Face Hub.',
  },
  {
    q: 'Can I change or switch the model mode?',
    a: 'Yes. Open the Model Diagnostics panel from the header or the Open AI section at any time to switch between instant Demo Mode and local Transformers.js execution (WebGPU when hardware-supported, or WASM CPU fallback).',
  },
  {
    q: 'Can I edit generated content?',
    a: 'Every part of every draft is editable. You can edit the opening hook, main body, hashtags, call to action, platform assignment, board status, and scheduled date. You can also run targeted rewrites such as generating three alternative hooks, compressing length, shifting tone, or repurposing to another platform.',
  },
  {
    q: 'Does Drift publish automatically to social media?',
    a: 'No. Drift Studio is a content creation and local planning workspace, not an automated social-media publishing service. Scheduled dates on the weekly calendar represent your local editorial plan. When you are ready to post, you can copy any draft in one click or export your plan as CSV, JSON, or plain text.',
  },
  {
    q: 'What happens if AI inference is unavailable on my device?',
    a: 'If your browser does not support WebGPU or cannot download the model checkpoint, Drift automatically keeps Demo Mode active and preserves all of your entered campaign data. You can still generate structured demo drafts, edit existing work, move cards across the board, schedule your week, and export files.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="scene-faq"
      className="py-20 sm:py-28 bg-white dark:bg-[#0D0B14] transition-colors border-b border-[#19171F]/10 dark:border-white/10"
    >
      <RevealSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            07 · FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            Honest answers about
            <br />
            how Drift works.
          </h2>
        </div>

        {/* Accessible Accordion List */}
        <div className="divide-y divide-[#19171F]/10 dark:divide-white/10 border-t border-b border-[#19171F]/10 dark:border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            return (
              <div key={idx} className="py-2">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-xl text-[#19171F] dark:text-white hover:text-[#5515E8] dark:hover:text-[#7886F8] transition-colors focus-visible:outline-2 focus-visible:outline-[#5515E8]"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[#777481] dark:text-[#9E9AA8] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#5515E8] dark:text-[#7886F8]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    className="pb-5 pr-8 text-sm sm:text-base text-[#777481] dark:text-[#9E9AA8] leading-relaxed"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </RevealSection>
    </section>
  );
};
