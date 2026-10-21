import React, { useState, useEffect } from 'react';
import { X, Sparkles, Scissors, RefreshCw, Copy, Check, ArrowRight, Trash2 } from 'lucide-react';
import { Draft, Platform, ContentStatus, Tone } from '../types';
import { PLATFORM_CONFIGS } from '../constants';
import { aiEngine } from '../services/aiEngine';
import { StorageService } from '../services/storage';

interface DraftModalProps {
  draft: Draft;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Draft) => void;
  onDelete: (id: string) => void;
  onDuplicate: (draft: Draft) => void;
}

export const DraftModal: React.FC<DraftModalProps> = ({
  draft,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onDuplicate,
}) => {
  const [currentDraft, setCurrentDraft] = useState<Draft>({ ...draft });
  const [altHooks, setAltHooks] = useState<string[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedRepurposePlatform, setSelectedRepurposePlatform] = useState<Platform>(
    draft.platform === 'x' ? 'linkedin' : 'x'
  );

  useEffect(() => {
    setCurrentDraft({ ...draft });
    setAltHooks([]);
  }, [draft]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const config = PLATFORM_CONFIGS[currentDraft.platform];
  const charCount = (currentDraft.body || '').length;
  const isOverLimit = charCount > config.charLimit;

  const handleGenerateHooks = async () => {
    setLoadingAction('hooks');
    try {
      const hooks = await aiEngine.generateAlternativeHooks(currentDraft, 'contrarian');
      setAltHooks(hooks);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleMakeShorter = async () => {
    setLoadingAction('shorter');
    try {
      const updated = await aiEngine.makeDraftShorter(currentDraft);
      setCurrentDraft(updated);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRegenerateSingle = async () => {
    setLoadingAction('regenerate');
    try {
      const regenerated = await aiEngine.changeDraftTone(currentDraft, 'authentic');
      setCurrentDraft(regenerated);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleChangeTone = async (newTone: Tone) => {
    setLoadingAction(`tone_${newTone}`);
    try {
      const updated = await aiEngine.changeDraftTone(currentDraft, newTone);
      setCurrentDraft(updated);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRepurpose = async () => {
    setLoadingAction('repurpose');
    try {
      const repurposed = await aiEngine.repurposeDraft(currentDraft, selectedRepurposePlatform);
      onSave(repurposed);
      setCurrentDraft(repurposed);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCopy = async () => {
    const success = await StorageService.copyToClipboard(currentDraft.body);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyHook = (h: string) => {
    setCurrentDraft((prev) => ({
      ...prev,
      hook: h,
      body: prev.body.includes(prev.hook) ? prev.body.replace(prev.hook, h) : `${h}\n\n${prev.body}`,
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#141121] rounded-[24px] border border-[#19171F]/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden text-[#19171F] dark:text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="draft-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#19171F]/10 dark:border-white/10 flex items-center justify-between gap-4 shrink-0 bg-[#F7F6FA] dark:bg-[#1A162B]">
          <div>
            <div className="text-xs text-[#777481] dark:text-[#9E9AA8] font-medium flex flex-wrap items-center gap-2">
              <span>Campaign: {currentDraft.campaignName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-[#5515E8] dark:text-[#7886F8]">{config.name}</span>
              <span aria-hidden="true">·</span>
              <span>
                {currentDraft.generatedBy === 'open_weight_model' ? 'Open-Weight Output' : 'Demo / Editable Draft'}
              </span>
            </div>
            <h2 id="draft-modal-title" className="font-display text-lg sm:text-xl font-bold mt-0.5">
              Edit & Refine Draft
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#19171F]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={() => onDuplicate(currentDraft)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#19171F]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hidden sm:flex items-center gap-1"
            >
              Duplicate
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* AI Quick Actions Bar */}
          <div className="p-4 rounded-2xl bg-[#F0EDFF] dark:bg-[#201B36] border border-[#5515E8]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5515E8] dark:text-[#7886F8]">
              <Sparkles className="w-4 h-4" />
              <span>AI Actions:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRegenerateSingle}
                disabled={Boolean(loadingAction)}
                className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#141121] text-[#19171F] dark:text-white rounded-xl border border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8] transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingAction === 'regenerate' ? 'animate-spin' : ''}`} />
                <span>Regenerate</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateHooks}
                disabled={Boolean(loadingAction)}
                className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#141121] text-[#19171F] dark:text-white rounded-xl border border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className={`w-3.5 h-3.5 ${loadingAction === 'hooks' ? 'animate-spin' : ''}`} />
                <span>Alternate Hooks</span>
              </button>

              <button
                type="button"
                onClick={handleMakeShorter}
                disabled={Boolean(loadingAction)}
                className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#141121] text-[#19171F] dark:text-white rounded-xl border border-[#19171F]/10 dark:border-white/10 hover:border-[#FF4FA3] transition-colors flex items-center gap-1.5"
              >
                <Scissors className="w-3.5 h-3.5 text-[#FF4FA3]" />
                <span>Make Shorter</span>
              </button>

              {/* Quick Tone Shift */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-[#777481] dark:text-[#9E9AA8] text-[11px] ml-1">Tone:</span>
                {(['punchy', 'contrarian', 'storytelling', 'playful'] as Tone[]).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleChangeTone(t)}
                    disabled={Boolean(loadingAction)}
                    className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-[#141121] text-[#19171F] dark:text-white rounded-lg border border-[#19171F]/10 dark:border-white/10 hover:bg-[#5515E8] hover:text-white transition-colors capitalize"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Alternative Hooks Drawer */}
          {altHooks.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#F7F6FA] dark:bg-[#1A162B] border border-[#19171F]/10 dark:border-white/10 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5515E8] dark:text-[#7886F8]">
                Select an alternative hook to apply:
              </div>
              {altHooks.map((h, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleApplyHook(h)}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#141121] hover:border-[#5515E8] border border-[#19171F]/10 dark:border-white/10 text-xs font-medium text-[#19171F] dark:text-white transition-colors flex items-center justify-between gap-2"
                >
                  <span>“{h}”</span>
                  <span className="text-[11px] text-[#5515E8] dark:text-[#7886F8] font-bold shrink-0">Apply</span>
                </button>
              ))}
            </div>
          )}

          {/* Main Draft Editor Fields */}
          <div className="space-y-4">
            
            {/* Opening Hook Field */}
            <div>
              <label
                htmlFor="draft-hook-input"
                className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
              >
                Opening Hook / Title
              </label>
              <input
                id="draft-hook-input"
                type="text"
                value={currentDraft.hook}
                onChange={(e) => setCurrentDraft({ ...currentDraft, hook: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>

            {/* Main Post Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="draft-body-textarea"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8]"
                >
                  Main Content Body
                </label>
                <div
                  className={`text-xs font-mono tabular-nums ${
                    isOverLimit ? 'text-red-500 font-bold' : 'text-[#777481] dark:text-[#9E9AA8]'
                  }`}
                >
                  {charCount} / {config.charLimit} chars
                </div>
              </div>
              <textarea
                id="draft-body-textarea"
                rows={8}
                value={currentDraft.body}
                onChange={(e) => setCurrentDraft({ ...currentDraft, body: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>

            {/* Hashtags and Call To Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="draft-hashtags-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
                >
                  Hashtags (space separated)
                </label>
                <input
                  id="draft-hashtags-input"
                  type="text"
                  value={(currentDraft.hashtags || []).join(' ')}
                  onChange={(e) =>
                    setCurrentDraft({
                      ...currentDraft,
                      hashtags: e.target.value.split(' ').filter(Boolean),
                    })
                  }
                  placeholder="#typescript #buildinpublic"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
                />
              </div>

              <div>
                <label
                  htmlFor="draft-cta-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
                >
                  Call To Action
                </label>
                <input
                  id="draft-cta-input"
                  type="text"
                  value={currentDraft.callToAction || ''}
                  onChange={(e) => setCurrentDraft({ ...currentDraft, callToAction: e.target.value })}
                  placeholder="Link in bio / comments"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
                />
              </div>
            </div>

            {/* Platform, Board Status, Planned Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label
                  htmlFor="draft-platform-select"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
                >
                  Platform
                </label>
                <select
                  id="draft-platform-select"
                  value={currentDraft.platform}
                  onChange={(e) => setCurrentDraft({ ...currentDraft, platform: e.target.value as Platform })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
                >
                  <option value="x">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="threads">Threads</option>
                  <option value="youtube_shorts">Shorts & Reels</option>
                  <option value="reddit">Reddit / Community</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="draft-stage-select"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
                >
                  Board Stage
                </label>
                <select
                  id="draft-stage-select"
                  value={currentDraft.status}
                  onChange={(e) => setCurrentDraft({ ...currentDraft, status: e.target.value as ContentStatus })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
                >
                  <option value="idea">Idea</option>
                  <option value="draft">Draft</option>
                  <option value="review">Review</option>
                  <option value="ready">Ready</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="draft-date-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
                >
                  Planned Date (Local)
                </label>
                <input
                  id="draft-date-input"
                  type="date"
                  value={currentDraft.scheduledDate || ''}
                  onChange={(e) => setCurrentDraft({ ...currentDraft, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
                />
              </div>

              <div>
                <label
                  htmlFor="draft-time-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-1.5"
                >
                  Planned Time
                </label>
                <input
                  id="draft-time-input"
                  type="time"
                  value={currentDraft.scheduledTime || ''}
                  onChange={(e) => setCurrentDraft({ ...currentDraft, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
                />
              </div>
            </div>

            {/* Repurpose to Another Platform (Creates a new adapted variation) */}
            <div className="pt-4 border-t border-[#19171F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#777481] dark:text-[#9E9AA8]">
                <ArrowRight className="w-3.5 h-3.5 text-[#5515E8]" />
                <span>Repurpose this draft into a new format:</span>
                <select
                  aria-label="Target platform for repurposing"
                  value={selectedRepurposePlatform}
                  onChange={(e) => setSelectedRepurposePlatform(e.target.value as Platform)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#1A162B] text-xs font-bold text-[#19171F] dark:text-white"
                >
                  <option value="x">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram Carousel</option>
                  <option value="threads">Threads</option>
                  <option value="youtube_shorts">Shorts / Reels Script</option>
                  <option value="reddit">Reddit / Community</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleRepurpose}
                disabled={loadingAction === 'repurpose'}
                className="px-4 py-2 text-xs font-bold text-[#5515E8] dark:text-[#7886F8] bg-[#5515E8]/10 hover:bg-[#5515E8] hover:text-white rounded-xl transition-colors"
              >
                {loadingAction === 'repurpose' ? 'Synthesizing...' : 'Repurpose to Platform'}
              </button>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 border-t border-[#19171F]/10 dark:border-white/10 flex items-center justify-between gap-4 shrink-0 bg-[#F7F6FA] dark:bg-[#1A162B]">
          <button
            type="button"
            onClick={() => onDelete(currentDraft.id)}
            className="px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Draft</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-[#19171F]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSave({ ...currentDraft, updatedAt: new Date().toISOString() });
                onClose();
              }}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] rounded-xl shadow-md transition-all"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
