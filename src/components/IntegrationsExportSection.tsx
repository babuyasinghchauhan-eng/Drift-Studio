import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Database, Copy, Check } from 'lucide-react';
import { StorageService } from '../services/storage';
import { RevealSection } from './RevealSection';

export const IntegrationsExportSection: React.FC = () => {
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleAction = async (type: 'csv' | 'json' | 'txt' | 'copy') => {
    const campaigns = StorageService.loadCampaigns();
    const drafts = StorageService.loadDrafts();

    if (type === 'csv') {
      StorageService.exportDraftsToCSV(drafts);
      setFeedbackMsg(`Exported ${drafts.length} drafts as CSV spreadsheet`);
    } else if (type === 'json') {
      StorageService.exportToJSON(campaigns, drafts);
      setFeedbackMsg(`Exported ${campaigns.length} campaigns and ${drafts.length} drafts as JSON`);
    } else if (type === 'txt') {
      StorageService.exportDraftsToText(drafts);
      setFeedbackMsg(`Downloaded ${drafts.length} drafts as plain text`);
    } else if (type === 'copy') {
      const summary = drafts
        .map((d) => `[${d.platform.toUpperCase()}] ${d.hook}\n${d.body}`)
        .join('\n\n---\n\n');
      const ok = await StorageService.copyToClipboard(summary);
      setFeedbackMsg(ok ? `Copied all ${drafts.length} drafts to clipboard` : 'Could not access clipboard');
    }
    setTimeout(() => setFeedbackMsg(null), 3200);
  };

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B14] transition-colors border-b border-[#19171F]/10 dark:border-white/10">
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            03 · PORTABLE EXPORTS & DATA OWNERSHIP
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            Your drafts belong to you.
            <br />
            Export in one click.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9E9AA8] font-normal leading-relaxed">
            No fake third-party publishing bots or OAuth lock-in. Take your organized drafts anywhere in clean, universal file formats.
          </p>
        </div>

        {/* 4 Real Supported Export Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Format 1: Plain Text */}
          <div className="bg-[#F7F6FA] dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#5515E8]/10 text-[#5515E8] dark:text-[#7886F8] flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                Plain Text (.txt)
              </h3>
              <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-2 leading-relaxed">
                Formatted document bundle grouped by campaign, platform, and scheduled date.
              </p>
            </div>
            <button
              onClick={() => handleAction('txt')}
              className="mt-6 w-full min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#1E1A2E] text-[#19171F] dark:text-white border border-[#19171F]/10 dark:border-white/10 hover:bg-[#5515E8] hover:text-white hover:border-[#5515E8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .TXT</span>
            </button>
          </div>

          {/* Format 2: CSV Spreadsheet */}
          <div className="bg-[#F7F6FA] dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                Spreadsheet (.csv)
              </h3>
              <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-2 leading-relaxed">
                Structured columns for hooks, bodies, tags, statuses, and planned dates.
              </p>
            </div>
            <button
              onClick={() => handleAction('csv')}
              className="mt-6 w-full min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#1E1A2E] text-[#19171F] dark:text-white border border-[#19171F]/10 dark:border-white/10 hover:bg-[#5515E8] hover:text-white hover:border-[#5515E8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .CSV</span>
            </button>
          </div>

          {/* Format 3: JSON Workspace Backup */}
          <div className="bg-[#F7F6FA] dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#7886F8]/15 text-[#5515E8] dark:text-[#7886F8] flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                Structured JSON (.json)
              </h3>
              <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-2 leading-relaxed">
                Full machine-readable schema containing campaigns, drafts, and metadata.
              </p>
            </div>
            <button
              onClick={() => handleAction('json')}
              className="mt-6 w-full min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#1E1A2E] text-[#19171F] dark:text-white border border-[#19171F]/10 dark:border-white/10 hover:bg-[#5515E8] hover:text-white hover:border-[#5515E8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .JSON</span>
            </button>
          </div>

          {/* Format 4: Instant Clipboard Copy */}
          <div className="bg-[#F7F6FA] dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#FF7A30]/15 text-[#FF7A30] flex items-center justify-center mb-4">
                <Copy className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                Clipboard Bundle
              </h3>
              <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-2 leading-relaxed">
                Copy all active drafts formatted with clean dividers directly to your system clipboard.
              </p>
            </div>
            <button
              onClick={() => handleAction('copy')}
              className="mt-6 w-full min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#1E1A2E] text-[#19171F] dark:text-white border border-[#19171F]/10 dark:border-white/10 hover:bg-[#5515E8] hover:text-white hover:border-[#5515E8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All Drafts</span>
            </button>
          </div>

        </div>

        {/* Truthful Feedback Banner */}
        {feedbackMsg && (
          <div
            role="status"
            className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 p-3.5 rounded-xl max-w-md mx-auto border border-emerald-300 dark:border-emerald-800"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

      </RevealSection>
    </section>
  );
};
