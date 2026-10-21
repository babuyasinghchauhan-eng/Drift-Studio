import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { Campaign, Draft, Platform, Tone, Objective, GenerationRequest } from '../types';
import { PLATFORM_CONFIGS, TONE_OPTIONS, OBJECTIVE_OPTIONS, TEMPLATE_BRIEFS } from '../constants';
import { aiEngine } from '../services/aiEngine';

interface CampaignCreatorViewProps {
  onCampaignCreated: (campaign: Campaign, drafts: Draft[]) => void;
  onCancel: () => void;
}

export const CampaignCreatorView: React.FC<CampaignCreatorViewProps> = ({
  onCampaignCreated,
  onCancel,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [audience, setAudience] = useState('Indie hackers, developers, and tech creators');
  const [objective, setObjective] = useState<Objective>('launch');
  const [tone, setTone] = useState<Tone>('punchy');
  const [language, setLanguage] = useState('English');
  const [platforms, setPlatforms] = useState<Platform[]>(['x', 'linkedin', 'threads']);
  const [draftCount, setDraftCount] = useState<number>(3);
  const [keywords, setKeywords] = useState('');
  const [customCta, setCustomCta] = useState('Check link in comments or bio for full release');
  const [constraints, setConstraints] = useState('');

  // Generation & Validation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const togglePlatform = (p: Platform) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((item) => item !== p));
      }
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const applyTemplate = (t: (typeof TEMPLATE_BRIEFS)[0]) => {
    setName(t.title);
    setBrief(t.brief);
    setAudience(t.audience);
    setTone(t.tone);
    setObjective(t.objective);
    setPlatforms(t.platforms);
    setDraftCount(t.platforms.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter a campaign name.');
      return;
    }
    if (!brief.trim() || brief.trim().length < 15) {
      setErrorMsg('Please provide a brief idea with at least 15 characters.');
      return;
    }

    setErrorMsg(null);
    setIsGenerating(true);

    try {
      const campaignId = `camp_${Date.now()}`;
      const request: GenerationRequest = {
        name: name.trim(),
        brief: brief.trim(),
        audience: audience.trim(),
        objective,
        tone,
        language,
        platforms,
        draftCount,
        keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
        customCta: customCta.trim(),
        constraints: constraints.trim(),
      };

      const drafts = await aiEngine.generateDrafts(request, campaignId);

      const newCampaign: Campaign = {
        id: campaignId,
        name: request.name,
        brief: request.brief,
        audience: request.audience,
        objective: request.objective,
        tone: request.tone,
        language: request.language,
        platforms: request.platforms,
        draftCount: drafts.length,
        keywords: request.keywords,
        customCta: request.customCta,
        constraints: request.constraints,
        draftsCount: drafts.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onCampaignCreated(newCampaign, drafts);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Inference error occurred. Your input has been preserved.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* View Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#19171F] dark:text-white">
          New Content Plan
        </h1>
        <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9590A3] mt-1">
          Enter your campaign brief once. Drift’s open-weight model will craft structured drafts for every platform.
        </p>
      </div>

      {/* Quick Template Picker (Allowed functional starter buttons) */}
      <div className="p-4 rounded-2xl bg-[#F0EDFF] dark:bg-[#1A162B] border border-[#5515E8]/20 space-y-2">
        <div className="text-xs font-bold text-[#5515E8] dark:text-[#B197FC] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Inspiration Briefs (Click to Pre-fill):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_BRIEFS.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyTemplate(t)}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#25203D] text-[#19171F] dark:text-white rounded-xl border border-black/5 dark:border-white/10 hover:border-[#5515E8] shadow-sm transition-all"
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Campaign Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#151222] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
        
        {/* Campaign Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
            Campaign Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HyperSchema 1.0 Launch, Behind the scenes rewrite..."
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          />
        </div>

        {/* Initial Idea or Brief */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
            Initial Idea or Campaign Brief *
          </label>
          <textarea
            rows={4}
            required
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Type your raw concept, milestone, or takeaway in plain language. Drift will handle the hooks and formatting."
            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          />
          <span className="text-[11px] text-[#777481] dark:text-[#9590A3] mt-1 block">
            Tip: Be concrete. What did you build, delete, learn, or achieve?
          </span>
        </div>

        {/* Target Platforms Multi-Select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
            Target Social Platforms *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.keys(PLATFORM_CONFIGS) as Platform[]).map((p) => {
              const cfg = PLATFORM_CONFIGS[p];
              const isSelected = platforms.includes(p);
              return (
                <div
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#5515E8] bg-[#5515E8]/10 text-[#5515E8] dark:text-white font-bold'
                      : 'border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-[#777481] dark:text-[#9590A3]'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{cfg.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#5515E8]" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audience & Tone (2 Cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Software engineers, designers..."
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
              Preferred Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Objective & Number of Drafts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
              Campaign Objective
            </label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value as Objective)}
              className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            >
              {OBJECTIVE_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-2">
              Drafts to Generate ({draftCount})
            </label>
            <input
              type="range"
              min={1}
              max={6}
              value={draftCount}
              onChange={(e) => setDraftCount(parseInt(e.target.value, 10))}
              className="w-full accent-[#5515E8] cursor-pointer mt-2"
            />
          </div>
        </div>

        {/* Optional Section: CTA & Keywords */}
        <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3]">
            Optional Writing Constraints & Links
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#777481] dark:text-[#9590A3] mb-1">
                Call to Action
              </label>
              <input
                type="text"
                value={customCta}
                onChange={(e) => setCustomCta(e.target.value)}
                placeholder="e.g. Star on GitHub, link in bio"
                className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#777481] dark:text-[#9590A3] mb-1">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. devtools, open-source, rust"
                className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isGenerating}
            className="px-7 py-3 text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:scale-95 rounded-2xl shadow-lg shadow-[#5515E8]/25 transition-all flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Open AI Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#F8E84C]" />
                <span>Generate Platform Drafts</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
