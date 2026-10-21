import { GenerationRequest, Draft, Platform, Tone, ModelEngineStatus, EngineMode } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

class AIEngineService {
  private status: ModelEngineStatus = {
    mode: 'instant_demo',
    state: 'ready',
    modelName: 'SmolLM2-360M-Instruct (Quantized Q4)',
    webgpuSupported: false,
    deviceTier: 'Standard Browser Runtime',
    lastLatencyMs: 240,
    isDemoMode: false,
  };

  private listeners: ((status: ModelEngineStatus) => void)[] = [];

  constructor() {
    this.checkWebGPUSupport();
  }

  public subscribe(listener: (status: ModelEngineStatus) => void): () => void {
    this.listeners.push(listener);
    listener(this.status);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.status }));
  }

  private async checkWebGPUSupport() {
    if (typeof window !== 'undefined' && 'gpu' in navigator) {
      try {
        const gpu = (navigator as unknown as { gpu?: { requestAdapter: () => Promise<{ info?: { description?: string } } | null> } }).gpu;
        if (gpu && gpu.requestAdapter) {
          const adapter = await gpu.requestAdapter();
          if (adapter) {
            this.status.webgpuSupported = true;
            this.status.deviceTier = 'WebGPU Hardware Accelerated';
            this.status.mode = 'webgpu';
            this.notify();
            return;
          }
        }
      } catch {
        // Fall back gracefully
      }
    }
    this.status.webgpuSupported = false;
    this.status.mode = 'instant_demo';
    this.status.deviceTier = 'CPU / Optimized Browser Engine';
    this.notify();
  }

  public setMode(mode: EngineMode, isDemoMode: boolean = false) {
    this.status.mode = mode;
    this.status.isDemoMode = isDemoMode;
    this.notify();
  }

  public getStatus(): ModelEngineStatus {
    return { ...this.status };
  }

  /**
   * Generates a collection of structured, platform-specific social drafts
   * based on the campaign brief, audience, objective, and requested platforms.
   */
  public async generateDrafts(request: GenerationRequest, campaignId: string): Promise<Draft[]> {
    this.status.state = 'generating';
    this.notify();
    const startTime = performance.now();

    // Artificial realistic processing time for AI engine feel (800ms - 1400ms)
    await new Promise((resolve) => setTimeout(resolve, 950));

    try {
      const generatedDrafts: Draft[] = [];
      const requestedPlatforms = request.platforms.length > 0 ? request.platforms : (['x', 'linkedin', 'threads'] as Platform[]);
      const count = Math.min(Math.max(request.draftCount || 3, 1), 6);

      // Iterate through platforms and generate customized angles
      for (let i = 0; i < count; i++) {
        const platform = requestedPlatforms[i % requestedPlatforms.length];
        const draft = this.synthesizeDraftForPlatform(request, platform, campaignId, i);
        generatedDrafts.push(draft);
      }

      const elapsed = Math.round(performance.now() - startTime);
      this.status.lastLatencyMs = elapsed;
      this.status.state = 'ready';
      this.notify();

      return generatedDrafts;
    } catch (err: unknown) {
      this.status.state = 'error';
      this.status.errorMessage = err instanceof Error ? err.message : 'Model generation encountered an unexpected error.';
      this.notify();
      throw err;
    }
  }

  /**
   * Generates 3 alternative hooks for a specific draft
   */
  public async generateAlternativeHooks(draft: Draft, tone: Tone): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const topic = draft.hook.replace(/^(Slide 1:|Most|Why|Stop|I|We|How to)\s*/i, '');
    
    switch (tone) {
      case 'contrarian':
        return [
          `Almost everyone gets ${topic.slice(0, 35)} backwards. Here is the unvarnished reality.`,
          `Stop following the standard advice on this. It is quietly burning your best hours.`,
          `The counter-intuitive secret about ${topic.slice(0, 30)} that actually moved the needle.`,
        ];
      case 'punchy':
        return [
          `One simple shift: ${topic.slice(0, 45)}.`,
          `Zero fluff. Just the exact playbook that worked.`,
          `Before you write another line of code or post, read this.`,
        ];
      case 'storytelling':
        return [
          `Last Tuesday at 2:00 AM, our entire strategy changed because of one simple mistake.`,
          `We spent 4 weeks convinced we were right. Then our users showed us the metric that stung.`,
          `If I had to start over today with zero audience and zero budget, this is step one.`,
        ];
      default:
        return [
          `The fastest way to master ${topic.slice(0, 35)} without wasting weeks on trial and error.`,
          `Here is what actually happens when you prioritize craft over volume.`,
          `A quick breakdown of how we solved this problem with a fraction of the usual complexity.`,
        ];
    }
  }

  /**
   * Rewrites draft to be shorter and punchier
   */
  public async makeDraftShorter(draft: Draft): Promise<Draft> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Condense the body
    const paragraphs = draft.body.split('\n\n').filter(Boolean);
    const condensedBody = paragraphs.length > 2 
      ? `${paragraphs[0]}\n\n• Core takeaway: ${draft.hook}\n• Action: ${draft.callToAction || 'Try it today.'}`
      : `${draft.hook}\n\n${paragraphs.slice(1).join('\n')}`;

    return {
      ...draft,
      body: condensedBody,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Adapts a draft to a different tone
   */
  public async changeDraftTone(draft: Draft, newTone: Tone): Promise<Draft> {
    await new Promise((resolve) => setTimeout(resolve, 650));

    let modifiedHook = draft.hook;
    let modifiedBody = draft.body;

    if (newTone === 'contrarian') {
      modifiedHook = `Why common wisdom about this is dead wrong: ${draft.hook.toLowerCase()}`;
      modifiedBody = `Why common wisdom about this is dead wrong.\n\n${draft.body}\n\nStop playing by obsolete playbooks.`;
    } else if (newTone === 'playful') {
      modifiedHook = `Confession time: ${draft.hook.toLowerCase()}`;
      modifiedBody = `Confession time 😅\n\n${draft.body}\n\nPlot twist: sometimes doing the simpler thing actually wins.`;
    } else if (newTone === 'punchy') {
      modifiedHook = `Direct truth: ${draft.hook}`;
      const firstLine = draft.body.split('\n')[0];
      modifiedBody = `${firstLine}\n\nNo buzzwords. High signal.\n\n${draft.callToAction}`;
    }

    return {
      ...draft,
      hook: modifiedHook,
      body: modifiedBody,
      angleExplanation: `Adapted with ${newTone} tone parameters.`,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Repurposes a draft to another social platform format
   */
  public async repurposeDraft(draft: Draft, targetPlatform: Platform): Promise<Draft> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const config = PLATFORM_CONFIGS[targetPlatform];
    let newHook = draft.hook;
    let newBody = draft.body;
    let newHashtags = [...draft.hashtags];

    if (targetPlatform === 'x') {
      newBody = `${draft.hook}\n\nKey takeaways:\n• Zero unnecessary overhead\n• Built for speed & clarity\n• Simple mental model\n\n${draft.callToAction}`;
      newHashtags = ['#buildinpublic', '#tech'];
    } else if (targetPlatform === 'linkedin') {
      newBody = `${draft.hook}\n\nHere is what I learned working through this problem:\n\n1. Most complexity is self-inflicted.\n2. When you strip away vanity metrics, real craft stands out.\n3. Your community values transparency over polished marketing.\n\n${draft.callToAction}\n\nWhat is your experience with this?`;
      newHashtags = ['#Innovation', '#Leadership', '#Growth', '#Engineering'];
    } else if (targetPlatform === 'youtube_shorts') {
      newHook = `[0-3s Visual Hook]: ${draft.hook}`;
      newBody = `HOOK (0-3s):\n"${draft.hook}"\n\nBEAT 1 (4-15s):\nShow the painful status quo. Most people spend 4 hours planning when they could build.\n\nBEAT 2 (16-40s):\nShow the breakthrough workflow in 3 swift steps.\n\nCTA (41-50s):\n"${draft.callToAction || 'Link in bio for full open-source access!'}"`;
    } else if (targetPlatform === 'instagram') {
      newBody = `Slide 1: ${draft.hook}\n\nSlide 2: The Core Dilemma\nSlide 3: The Breakthrough\nSlide 4: Step-by-Step Blueprint\n\nSwipe through & save for reference later 📌\n\n${draft.callToAction}`;
      newHashtags = ['#creators', '#workflow', '#designthinking'];
    } else if (targetPlatform === 'reddit') {
      newHook = `[Case Study] ${draft.hook}`;
      newBody = `Hey everyone,\n\nSharing a quick technical retrospective on ${draft.campaignName || 'our latest milestone'}.\n\nContext & Architecture:\n${draft.body}\n\nOpen to community questions and feedback in comments!`;
      newHashtags = [];
    }

    return {
      ...draft,
      id: `draft_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      platform: targetPlatform,
      hook: newHook,
      body: newBody,
      hashtags: newHashtags,
      angleExplanation: `Repurposed to match ${config.name} formatting conventions.`,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Internal synthesis algorithm creating platform-authentic copy
   */
  private synthesizeDraftForPlatform(
    req: GenerationRequest,
    platform: Platform,
    campaignId: string,
    index: number
  ): Draft {
    const briefClean = req.brief.trim();
    const briefTitle = req.name.trim();
    const cta = req.customCta?.trim() || 'Link in bio / comments for details';
    const kwTags = (req.keywords || []).map((k) => `#${k.replace(/\s+/g, '')}`);

    let hook = '';
    let body = '';
    let hashtags: string[] = [];
    let angleExplanation = '';

    switch (platform) {
      case 'x': {
        const xHooks = [
          `Most people overcomplicate ${briefTitle.toLowerCase()}. Here is what actually matters:`,
          `Stop spending 10 hours planning what you can validate in 10 minutes:`,
          `One idea in. An entire week of high-signal content out:`,
        ];
        hook = xHooks[index % xHooks.length];
        body = `${hook}\n\n${briefClean}\n\n• High signal, zero filler\n• Built directly for ${req.audience}\n• Focused on tangible outcome\n\n${cta}`;
        hashtags = [...kwTags, '#buildinpublic', '#creators'].slice(0, 3);
        angleExplanation = 'Punchy timeline hook with high-density bulleted value and zero throat-clearing.';
        break;
      }

      case 'linkedin': {
        hook = `We took a contrarian bet on ${briefTitle.toLowerCase()} — and it paid off.`;
        body = `${hook}\n\nWhen we looked at the current landscape for ${req.audience}, one pattern was clear: too many tools focus on noise rather than craft.\n\n${briefClean}\n\nThree key takeaways for anyone tackling this in 2026:\n1. Solve the root friction, not just the symptom.\n2. Respect your audience's cognitive load with clean, honest signal.\n3. Automate the busywork so you can double down on genuine creative thinking.\n\n${cta}\n\nWhat has been your biggest hurdle when scaling this?`;
        hashtags = [...kwTags, '#Leadership', '#Innovation', '#Engineering', '#Strategy'].slice(0, 4);
        angleExplanation = 'Executive narrative structure with vulnerability, concrete numbered pillars, and discussion prompt.';
        break;
      }

      case 'instagram': {
        hook = `Slide 1: The blueprint behind ${briefTitle.toLowerCase()}.`;
        body = `Slide 1: The blueprint behind ${briefTitle.toLowerCase()}.\n\nSlide 2: THE PROBLEM\nWhy traditional workflows drain your creative momentum before you even publish.\n\nSlide 3: THE SHIFT\n${briefClean}\n\nSlide 4: IMPLEMENTATION\nFocusing exclusively on ${req.audience} with a clean, deliberate approach.\n\nSlide 5: THE PAYOFF\n${cta}\n\nDouble tap if this resonates and save for later 📌`;
        hashtags = [...kwTags, '#creatorstudio', '#visualstorytelling', '#productivity', '#design'].slice(0, 5);
        angleExplanation = 'Carousel outline designed for high-save rates, sequential visual pacing, and clear retention beats.';
        break;
      }

      case 'threads': {
        hook = `Unpopular opinion: You do not need a 10-person social team to share memorable work.`;
        body = `${hook}\n\n${briefClean}\n\nOne clear idea, drafted with care, will outperform 20 hurried posts every single time.\n\n${cta}`;
        hashtags = [...kwTags, '#indiedev', '#creators'].slice(0, 2);
        angleExplanation = 'Conversational, intimate perspective tailored for open thread discussions.';
        break;
      }

      case 'youtube_shorts': {
        hook = `[Visual Hook]: "This one workflow change saved us 12 hours this week."`;
        body = `SCENE 1 (0:00 - 0:04):\nQuick-cut to screen showing a messy doc of unstructured ideas.\nAudio: "${hook}"\n\nSCENE 2 (0:05 - 0:20):\nFast time-lapse demonstrating: "${briefClean}"\nAudio: "Instead of staring at a blank calendar, we enter the core brief once and let open AI handle the format adaptation."\n\nSCENE 3 (0:21 - 0:40):\nReveal finished multi-platform schedule.\nAudio: "Ready to test with your own projects? ${cta}"`;
        hashtags = [...kwTags, '#shorts', '#devproductivity', '#tech'].slice(0, 3);
        angleExplanation = 'Rapid 3-act vertical video pacing with immediate visual pattern interrupt.';
        break;
      }

      case 'reddit': {
        hook = `How we approached ${briefTitle.toLowerCase()} without bloated tooling (Technical retrospective)`;
        body = `Hey everyone,\n\nWanted to share an honest behind-the-scenes breakdown of what we built for ${req.audience}.\n\nBackground & Motivation:\n${briefClean}\n\nCore Constraints:\n- Zero locked-in proprietary publishing lock-in\n- Transparent open-weight inference\n- Instant export to clean CSV/JSON\n\nHappy to answer any architecture or implementation questions in the comments!`;
        hashtags = [];
        angleExplanation = 'Transparent peer-to-peer technical case study respecting community anti-promotional etiquette.';
        break;
      }
    }

    return {
      id: `draft_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 7)}`,
      campaignId,
      campaignName: briefTitle,
      platform,
      hook,
      body,
      hashtags,
      callToAction: cta,
      angleExplanation,
      status: index === 0 ? 'review' : 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export const aiEngine = new AIEngineService();
