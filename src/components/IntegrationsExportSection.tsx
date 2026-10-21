import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Database, Copy, Check } from 'lucide-react';
import { StorageService } from '../services/storage';
import { INITIAL_CAMPAIGNS, INITIAL_DRAFTS } from '../constants';

export const IntegrationsExportSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (type: 'csv' | 'json' | 'txt') => {
    if (type === 'csv') {
      StorageService.exportDraftsToCSV(INITIAL_DRAFTS);
      setDownloadSuccess('CSV Export downloaded');
    } else if (type === 'json') {
      StorageService.exportToJSON(INITIAL_CAMPAIGNS, INITIAL_DRAFTS);
      setDownloadSuccess('JSON Backup downloaded');
    } else if (type === 'txt') {
      StorageService.exportDraftsToText(INITIAL_DRAFTS);
      setDownloadSuccess('Plain Text summary downloaded');
    }
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0C0B12] transition-colors border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            03 · True Data Ownership
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            Your content.
            <br />
            Ready for your workflow.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9590A3] font-normal leading-relaxed">
            Drift refuses proprietary lock-in. No fake social publisher APIs or walled gardens. Every draft belongs to you and exports cleanly to universal formats with a single click.
          </p>
        </div>

        {/* 4 Real Supported Functions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Format 1: Formatted Text */}
          <div className="bg-[#F7F6FA] dark:bg-[#151222] rounded-3xl p-6 border border-black/5 dark:border-white/10 flex flex-col justify-between hover:border-[#5515E8]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#5515E8]/10 text-[#5515E8] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#19171F] dark:text-white">Clean Text (.txt)</h3>
              <p className="text-xs text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
                Plain-text bundles organized by campaign, platform, and scheduled slot. Ready for any note app or docs.
              </p>
            </div>
            <button
              onClick={() => handleDownload('txt')}
              className="mt-6 w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#201B34] text-[#19171F] dark:text-white border border-black/10 dark:border-white/10 hover:bg-[#5515E8] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text Bundle</span>
            </button>
          </div>

          {/* Format 2: Spreadsheet CSV */}
          <div className="bg-[#F7F6FA] dark:bg-[#151222] rounded-3xl p-6 border border-black/5 dark:border-white/10 flex flex-col justify-between hover:border-[#FF4FA3]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#19171F] dark:text-white">Structured CSV (.csv)</h3>
              <p className="text-xs text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
                Imports cleanly into Notion, Google Sheets, Airtable, or your internal editorial spreadsheet.
              </p>
            </div>
            <button
              onClick={() => handleDownload('csv')}
              className="mt-6 w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#201B34] text-[#19171F] dark:text-white border border-black/10 dark:border-white/10 hover:bg-[#FF4FA3] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Table</span>
            </button>
          </div>

          {/* Format 3: Full JSON Backup */}
          <div className="bg-[#F7F6FA] dark:bg-[#151222] rounded-3xl p-6 border border-black/5 dark:border-white/10 flex flex-col justify-between hover:border-[#7886F8]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#7886F8]/10 text-[#7886F8] flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#19171F] dark:text-white">Complete JSON (.json)</h3>
              <p className="text-xs text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
                Complete structured dump with IDs, timestamps, campaigns, drafts, and schedule tags. Easy for scripts and CI/CD.
              </p>
            </div>
            <button
              onClick={() => handleDownload('json')}
              className="mt-6 w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-white dark:bg-[#201B34] text-[#19171F] dark:text-white border border-black/10 dark:border-white/10 hover:bg-[#7886F8] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          {/* Format 4: One-Click Clipboard */}
          <div className="bg-[#F7F6FA] dark:bg-[#151222] rounded-3xl p-6 border border-black/5 dark:border-white/10 flex flex-col justify-between hover:border-[#FF7A30]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF7A30]/10 text-[#FF7A30] flex items-center justify-center mb-4">
                <Copy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#19171F] dark:text-white">One-Click Clipboard</h3>
              <p className="text-xs text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
                Direct formatted markdown copying right from any card or modal with instant visual success feedback.
              </p>
            </div>
            <div className="mt-6 p-2.5 text-center text-xs font-mono text-[#777481] dark:text-[#9590A3] bg-white/50 dark:bg-[#201B34]/50 rounded-xl border border-black/5 dark:border-white/5">
              Always 1 click away
            </div>
          </div>

        </div>

        {/* Real-time Download Toast Feedback */}
        {downloadSuccess && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl max-w-md mx-auto border border-emerald-200 dark:border-emerald-800">
            <Check className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}

      </div>
    </section>
  );
};
