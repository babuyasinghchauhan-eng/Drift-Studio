import React, { useState } from 'react';
import { Search, Download, Trash2, Copy, Check, Edit3, Plus, ArrowUpRight } from 'lucide-react';
import { Draft, Platform, ContentStatus } from '../types';
import { PLATFORM_CONFIGS } from '../constants';
import { StorageService } from '../services/storage';

interface SavedDraftsViewProps {
  drafts: Draft[];
  onOpenDraft: (draft: Draft) => void;
  onDeleteDraft: (id: string) => void;
  onCreateNewPlan: () => void;
}

export const SavedDraftsView: React.FC<SavedDraftsViewProps> = ({
  drafts,
  onOpenDraft,
  onDeleteDraft,
  onCreateNewPlan,
}) => {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = drafts.filter((d) => {
    const matchesSearch =
      d.hook.toLowerCase().includes(search.toLowerCase()) ||
      d.body.toLowerCase().includes(search.toLowerCase()) ||
      d.campaignName.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || d.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleCopy = async (text: string, id: string) => {
    const success = await StorageService.copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#19171F] dark:text-white">
            Saved Social Drafts
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9590A3] mt-0.5">
            Full repository of your generated and edited social drafts ({drafts.length} total).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => StorageService.exportDraftsToCSV(filtered)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onCreateNewPlan}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#5515E8] hover:bg-[#35108F] rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Plan</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#777481] dark:text-[#9590A3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all drafts..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          />
        </div>

        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] text-xs font-semibold"
        >
          <option value="all">All Platforms</option>
          <option value="x">X (Twitter)</option>
          <option value="linkedin">LinkedIn</option>
          <option value="instagram">Instagram</option>
          <option value="threads">Threads</option>
          <option value="youtube_shorts">Shorts/Reels</option>
          <option value="reddit">Reddit</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] text-xs font-semibold"
        >
          <option value="all">All Stages</option>
          <option value="idea">Idea</option>
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="ready">Ready</option>
        </select>
      </div>

      {/* Drafts List Table */}
      <div className="bg-white dark:bg-[#151222] rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {filtered.map((d) => {
            const cfg = PLATFORM_CONFIGS[d.platform];
            return (
              <div
                key={d.id}
                onClick={() => onOpenDraft(d)}
                className="p-5 hover:bg-[#F7F6FA] dark:hover:bg-[#1B172C] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-[#19171F] dark:text-white">
                      <span className={`w-2 h-2 rounded-full ${cfg.textColor}`} />
                      {cfg.name}
                    </span>
                    <span className="text-[#777481] dark:text-[#9590A3]">·</span>
                    <span className="text-[#777481] dark:text-[#9590A3] font-medium truncate">
                      {d.campaignName}
                    </span>
                    <span className="text-[#777481] dark:text-[#9590A3]">·</span>
                    <span className="font-mono text-[11px] text-[#5515E8] uppercase">
                      {d.status}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#19171F] dark:text-white truncate">
                    "{d.hook}"
                  </h3>

                  <p className="text-xs text-[#777481] dark:text-[#9590A3] line-clamp-1">
                    {d.body}
                  </p>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleCopy(d.body, d.id)}
                    className="p-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9590A3] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title="Copy draft"
                  >
                    {copiedId === d.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onOpenDraft(d)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#5515E8]/10 text-[#5515E8] hover:bg-[#5515E8] hover:text-white transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteDraft(d.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-12 text-center text-xs text-[#777481] dark:text-[#9590A3]">
              No drafts match your current search or filter criteria.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
