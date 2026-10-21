import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Check, AlertCircle, RefreshCw, Cpu } from 'lucide-react';
import { Campaign, Draft, Platform, Tone, Objective, GenerationRequest, ModelEngineStatus } from '../types';
import { PLATFORM_CONFIGS, TONE_OPTIONS, OBJECTIVE_OPTIONS, TEMPLATE_BRIEFS } from '../constants';
import { aiEngine } from '../services/aiEngine';

interface CampaignCreatorViewProps {
  onCampaignCreated: (campaign: Campaign, drafts: Draft[]) => void;
  onCancel: () => void;
  onOpenEngineModal?: () => void;
}

const DRAFT_FORM_STORAGE_KEY = 'drift_studio_unsaved_campaign_form_v1';

export const CampaignCreatorView: React.FC<CampaignCreatorViewProps> = ({
  onCampaignCreated,
  onCancel,
  onOpenEngineModal,
}) => {
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [audience, setAudience] = useState('Indie hackers, developers, and creators');
  const [objective, setObjective] = useState<Objective>('launch');
  const [tone, setTone] = useState<Tone>('punchy');
  const [language, setLanguage] = useState('English');
  const [platforms, setPlatforms] = useState<Platform[]>(['x', 'linkedin', 'threads']);
  const [draftCount, setDraftCount] = useState<number>(3);
  const [keywords, setKeywords] = useState('');
  const [customCta, setCustomCta] = useState('Check link in comments or bio for details');
  const [constraints, setConstraints] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [engineStatus, setEngineStatus] = useState<ModelEngineStatus>(aiEngine.getStatus());

  // Restore preserved form state on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_FORM_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.brief) setBrief(parsed.brief);
        if (parsed.audience) setAudience(parsed.audience);
        if (parsed.objective) setObjective(parsed.objective);
        if (parsed.tone) setTone(parsed.tone);
        if (parsed.language) setLanguage(parsed.language);
        if (Array.isArray(parsed.platforms) && parsed.platforms.length > 0) setPlatforms(parsed.platforms);
        if (typeof parsed.draftCount === 'number') setDraftCount(parsed.draftCount);
        if (parsed.keywords) setKeywords(parsed.keywords);
        if (parsed.customCta) setCustomCta(parsed.customCta);
        if (parsed.constraints) setConstraints(parsed.constraints);
      }
    } catch {
      // Ignore storage error
    }

    return aiEngine.subscribe((s) => setEngineStatus(s));
  }, []);

  // Persist entered information so returning to step or recovering from error never loses work
  useEffect(() => {
    try {
      sessionStorage.setItem(
        DRAFT_FORM_STORAGE_KEY,
        JSON.stringify({
          name,
          brief,
          audience,
          objective,
          tone,
          language,
          platforms,
          draftCount,
          keywords,
          customCta,
          constraints,
        })
      );
    } catch {
      // Ignore storage error
    }
  }, [name, brief, audience, objective, tone, language, platforms, draftCount, keywords, customCta, constraints]);

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
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter a campaign name.');
      return;
    }
    if (!brief.trim() || brief.trim().length < 15) {
      setErrorMsg('Please provide an initial idea or brief of at least 15 characters.');
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
        keywords: keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
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

      try {
        sessionStorage.removeItem(DRAFT_FORM_STORAGE_KEY);
      } catch {
        // Ignore
      }

      onCampaignCreated(newCampaign, drafts);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Inference error occurred. Your entered campaign information has been preserved.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* View Header + Active Engine Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-[0.14em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-1">
            CAMPAIGN CREATION
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#19171F] dark:text-white">
            Create a New Content Plan
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-1">
            Enter your core idea once. All optional fields come pre-configured with sensible defaults.
          </p>
        </div>

        {onOpenEngineModal && (
          <button
            type="button"
            onClick={onOpenEngineModal}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10 text-xs font-mono font-bold text-[#19171F] dark:text-white hover:border-[#5515E8] transition-colors flex items-center gap-2 shrink-0"
          >
            <Cpu className="w-4 h-4 text-[#5515E8]" />
            <span>
              {engineStatus.isDemoMode
                ? 'Mode: Demo Synthesis'
                : `Model: ${engineStatus.modelName.split(' ')[0]}`}
            </span>
          </button>
        )}
      </div>

      {/* Quick Starter Templates */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F0EDFF] dark:bg-[#1A162B] border border-[#5515E8]/20 space-y-2.5">
        <div className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sample Campaign Briefs (Click to pre-fill form):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_BRIEFS.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyTemplate(t)}
              className="px-3.5 py-2 text-xs font-bold bg-white dark:bg-[#25203D] text-[#19171F] dark:text-white rounded-xl border border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8] transition-colors"
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Inline Validation / Error Banner */}
      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-xs sm:text-sm font-semibold text-red-700 dark:text-red-300 flex items-center gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Campaign Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6 bg-white dark:bg-[#151221] p-6 sm:p-8 rounded-[24px] border border-[#19171F]/10 dark:border-white/10"
      >
        {/* Campaign Name */}
        <div>
          <label
            htmlFor="campaign-name-input"
            className="block text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white mb-2"
          >
            Campaign Name *
          </label>
          <input
            id="campaign-name-input"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HyperSchema 1.0 Launch, Weekly Build Log..."
            className="w-full px-4 py-3 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          />
        </div>

        {/* Initial Idea or Brief */}
        <div>
          <label
            htmlFor="campaign-brief-input"
            className="block text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white mb-2"
          >
            Initial Idea or Brief *
          </label>
          <textarea
            id="campaign-brief-input"
            rows={4}
            required
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Describe your idea, release milestone, or core takeaway in plain language..."
            className="w-full px-4 py-3 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          />
        </div>

        {/* Target Platforms */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#19171F] dark:text-white mb-2">
            Target Platforms *
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.keys(PLATFORM_CONFIGS) as Platform[]).map((p) => {
              const cfg = PLATFORM_CONFIGS[p];
              const isSelected = platforms.includes(p);
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => togglePlatform(p)}
                  aria-pressed={isSelected}
                  className={`min-h-[44px] p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#5515E8] bg-[#F0EDFF] dark:bg-[#5515E8]/25 text-[#5515E8] dark:text-white font-bold'
                      : 'border-[#19171F]/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#1C182B] text-[#777481] dark:text-[#9E9AA8]'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{cfg.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#5515E8] dark:text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Audience, Tone, Objective, Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="campaign-audience-input"
              className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-2"
            >
              Target Audience
            </label>
            <input
              id="campaign-audience-input"
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            />
          </div>

          <div>
            <label
              htmlFor="campaign-tone-select"
              className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-2"
            >
              Preferred Tone
            </label>
            <select
              id="campaign-tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="campaign-objective-select"
              className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-2"
            >
              Content Objective
            </label>
            <select
              id="campaign-objective-select"
              value={objective}
              onChange={(e) => setObjective(e.target.value as Objective)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            >
              {OBJECTIVE_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="campaign-language-select"
              className="block text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-2"
            >
              Language
            </label>
            <select
              id="campaign-language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>
        </div>

        {/* Number of Requested Drafts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="campaign-draftcount-range"
              className="text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8]"
            >
              Number of Requested Drafts
            </label>
            <span className="font-mono text-xs font-bold text-[#5515E8] dark:text-[#7886F8] tabular-nums">
              {draftCount} drafts
            </span>
          </div>
          <input
            id="campaign-draftcount-range"
            type="range"
            min={1}
            max={6}
            value={draftCount}
            onChange={(e) => setDraftCount(parseInt(e.target.value, 10))}
            className="w-full accent-[#5515E8] cursor-pointer"
          />
        </div>

        {/* Optional Fields: Keywords, CTA, Writing Constraints */}
        <div className="pt-4 border-t border-[#19171F]/10 dark:border-white/10 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8]">
            Optional Parameters (Keywords, Call to Action & Writing Constraints)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="campaign-cta-input"
                className="block text-[11px] font-bold text-[#777481] dark:text-[#9E9AA8] mb-1"
              >
                Optional Call to Action
              </label>
              <input
                id="campaign-cta-input"
                type="text"
                value={customCta}
                onChange={(e) => setCustomCta(e.target.value)}
                placeholder="e.g. Star on GitHub, link in bio"
                className="w-full px-3 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>

            <div>
              <label
                htmlFor="campaign-keywords-input"
                className="block text-[11px] font-bold text-[#777481] dark:text-[#9E9AA8] mb-1"
              >
                Optional Keywords
              </label>
              <input
                id="campaign-keywords-input"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. devtools, open-source, rust"
                className="w-full px-3 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>

            <div>
              <label
                htmlFor="campaign-constraints-input"
                className="block text-[11px] font-bold text-[#777481] dark:text-[#9E9AA8] mb-1"
              >
                Optional Writing Constraints
              </label>
              <input
                id="campaign-constraints-input"
                type="text"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g. No emojis, keep under 180 words"
                className="w-full px-3 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#1C182B] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-[#19171F]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-[#19171F]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Back to Dashboard
          </button>

          <button
            type="submit"
            disabled={isGenerating}
            className="min-h-[48px] px-7 py-3 text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:translate-y-px rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating {draftCount} drafts...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#F8E84C]" />
                <span>Generate Drafts</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
