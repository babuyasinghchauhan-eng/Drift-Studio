import { GenerationRequest, Draft, Platform, Tone, ModelEngineStatus, EngineMode } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

const DEFAULT_CHECKPOINT = 'HuggingFaceTB/SmolLM2-135M-Instruct';

class AIEngineService {
  private status: ModelEngineStatus = {
    mode: 'instant_demo',
    state: 'demo',
    modelName: 'SmolLM2-135M-Instruct (ONNX Q4)',
    modelCheckpoint: DEFAULT_CHECKPOINT,
    webgpuSupported: false,
    deviceTier: 'Checking browser capabilities...',
    downloadProgress: 0,
    downloadStatusText: 'Not loaded yet (Demo Mode active)',
    lastLatencyMs: undefined,
    isDemoMode: true,
    isModelLoaded: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private generatorPipeline: any = null;
  private isInitializing = false;
  private listeners: ((status: ModelEngineStatus) => void)[] = [];

  constructor() {
    this.checkWebGPUSupport();
  }

  public subscribe(listener: (status: ModelEngineStatus) => void): () => void {
    this.listeners.push(listener);
    listener({ ...this.status });
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
        const gpu = (navigator as unknown as {
          gpu?: { requestAdapter: () => Promise<{ info?: { description?: string; vendor?: string } } | null> };
        }).gpu;
        if (gpu && gpu.requestAdapter) {
          const adapter = await gpu.requestAdapter();
          if (adapter) {
            this.status.webgpuSupported = true;
            const vendor = adapter.info?.vendor || adapter.info?.description || 'WebGPU Hardware';
            this.status.deviceTier = `WebGPU Ready (${vendor})`;
            this.status.adapterInfo = vendor;
            this.notify();
            return;
          }
        }
      } catch {
        // Fallback to WASM / Demo
      }
    }
    this.status.webgpuSupported = false;
    this.status.deviceTier = 'WASM CPU / Demo Mode (WebGPU unavailable)';
    this.notify();
  }

  /**
   * Lazily initializes the actual Hugging Face Transformers.js pipeline in the browser.
   * Discloses download progress and handles offline/blocked environments gracefully.
   */
  public async initializeLocalModel(preferWebGPU: boolean = this.status.webgpuSupported): Promise<boolean> {
    if (this.generatorPipeline && this.status.isModelLoaded) {
      this.status.isDemoMode = false;
      this.status.state = 'ready';
      this.status.mode = preferWebGPU && this.status.webgpuSupported ? 'webgpu' : 'cpu_wasm';
      this.notify();
      return true;
    }

    if (this.isInitializing) return false;
    this.isInitializing = true;

    const targetDevice = preferWebGPU && this.status.webgpuSupported ? 'webgpu' : 'wasm';
    this.status.state = 'loading';
    this.status.mode = targetDevice === 'webgpu' ? 'webgpu' : 'cpu_wasm';
    this.status.downloadProgress = 5;
    this.status.downloadStatusText = `Initializing Transformers.js (${targetDevice.toUpperCase()})...`;
    this.status.errorMessage = undefined;
    this.notify();

    try {
      const { pipeline, env } = await import('@huggingface/transformers');
      env.allowLocalModels = false;

      this.generatorPipeline = await pipeline('text-generation', this.status.modelCheckpoint, {
        device: targetDevice,
        dtype: 'q4',
        progress_callback: (progressInfo: { status?: string; progress?: number; file?: string }) => {
          if (typeof progressInfo.progress === 'number') {
            this.status.downloadProgress = Math.round(progressInfo.progress);
            this.status.downloadStatusText = `Downloading ${progressInfo.file || 'weights'}: ${Math.round(
              progressInfo.progress
            )}%`;
            this.notify();
          } else if (progressInfo.status) {
            this.status.downloadStatusText = `Model status: ${progressInfo.status}`;
            this.notify();
          }
        },
      });

      this.status.isModelLoaded = true;
      this.status.isDemoMode = false;
      this.status.state = 'ready';
      this.status.downloadProgress = 100;
      this.status.downloadStatusText = 'Open-weight model loaded in browser memory';
      this.isInitializing = false;
      this.notify();
      return true;
    } catch (err: unknown) {
      this.isInitializing = false;
      this.status.isModelLoaded = false;
      this.status.isDemoMode = true;
      this.status.mode = 'instant_demo';
      this.status.state = 'unavailable';
      this.status.errorMessage =
        err instanceof Error
          ? `Local model initialization failed (${err.message}). Switched safely to Demo Mode.`
          : 'Local browser inference unavailable on this device. Switched safely to Demo Mode.';
      this.status.downloadStatusText = 'Local inference unavailable — Demo Mode active';
      this.notify();
      return false;
    }
  }

  public setMode(mode: EngineMode, isDemoMode: boolean = false) {
    if (mode === 'instant_demo' || isDemoMode) {
      this.status.mode = 'instant_demo';
      this.status.isDemoMode = true;
      this.status.state = 'demo';
      this.status.errorMessage = undefined;
      this.notify();
      return;
    }

    if (this.status.isModelLoaded && this.generatorPipeline) {
      this.status.mode = mode;
      this.status.isDemoMode = false;
      this.status.state = 'ready';
      this.notify();
    } else {
      void this.initializeLocalModel(mode === 'webgpu');
    }
  }

  public getStatus(): ModelEngineStatus {
    return { ...this.status };
  }

  /**
   * Runs actual open-weight token generation if the local pipeline is loaded,
   * or returns null so the caller can use the deterministic demo synthesizer.
   */
  private async runLiveInference(promptText: string, maxNewTokens: number = 90): Promise<string | null> {
    if (!this.status.isModelLoaded || !this.generatorPipeline || this.status.isDemoMode) {
      return null;
    }

    try {
      const messages = [
        {
          role: 'system',
          content:
            'You are a concise social media writer. Write one sharp, authentic social media post hook and short body paragraph. Plain text only, no HTML.',
        },
        {
          role: 'user',
          content: promptText,
        },
      ];

      const output = await this.generatorPipeline(messages, {
        max_new_tokens: maxNewTokens,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false,
      });

      if (Array.isArray(output) && output[0]?.generated_text) {
        const gen = output[0].generated_text;
        if (typeof gen === 'string') {
          return this.sanitizeModelOutput(gen);
        }
        if (Array.isArray(gen) && gen.length > 0) {
          const lastMsg = gen[gen.length - 1];
          if (typeof lastMsg?.content === 'string') {
            return this.sanitizeModelOutput(lastMsg.content);
          }
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  private sanitizeModelOutput(raw: string): string {
    return raw
      .replace(/<[^>]*>?/gm, '') // Strip any HTML tags for safety
      .trim();
  }

  /**
   * Generates a collection of structured, platform-specific social drafts.
   */
  public async generateDrafts(request: GenerationRequest, campaignId: string): Promise<Draft[]> {
    const previousState = this.status.state;
    this.status.state = 'generating';
    this.status.errorMessage = undefined;
    this.notify();
    const startTime = performance.now();

    try {
      const generatedDrafts: Draft[] = [];
      const requestedPlatforms =
        request.platforms.length > 0 ? request.platforms : (['x', 'linkedin', 'threads'] as Platform[]);
      const count = Math.min(Math.max(request.draftCount || 3, 1), 6);

      const usingLiveModel = this.status.isModelLoaded && !this.status.isDemoMode && Boolean(this.generatorPipeline);

      if (!usingLiveModel) {
        await new Promise((resolve) => setTimeout(resolve, 650));
      }

      for (let i = 0; i < count; i++) {
        const platform = requestedPlatforms[i % requestedPlatforms.length];
        let liveHookAndBody: string | null = null;

        if (usingLiveModel) {
          const prompt = `Platform: ${PLATFORM_CONFIGS[platform].name}. Tone: ${request.tone}. Audience: ${request.audience}. Topic: ${request.brief}. Write a short post:`;
          liveHookAndBody = await this.runLiveInference(prompt, 100);
        }

        const draft = this.synthesizeDraftForPlatform(
          request,
          platform,
          campaignId,
          i,
          liveHookAndBody,
          usingLiveModel ? 'open_weight_model' : 'demo_mode'
        );
        generatedDrafts.push(draft);
      }

      const elapsed = Math.round(performance.now() - startTime);
      this.status.lastLatencyMs = elapsed;
      this.status.state = usingLiveModel ? 'ready' : previousState === 'unavailable' ? 'unavailable' : 'demo';
      this.notify();

      return generatedDrafts;
    } catch (err: unknown) {
      this.status.state = 'error';
      this.status.errorMessage =
        err instanceof Error ? err.message : 'Model generation encountered an unexpected error.';
      this.notify();
      throw err;
    }
  }

  /**
   * Generates 3 alternative hooks for a specific draft
   */
  public async generateAlternativeHooks(draft: Draft, tone: Tone): Promise<string[]> {
    const usingLiveModel = this.status.isModelLoaded && !this.status.isDemoMode && Boolean(this.generatorPipeline);
    if (usingLiveModel) {
      const liveText = await this.runLiveInference(
        `Write one punchy ${tone} opening hook sentence for this post: ${draft.hook}`,
        45
      );
      if (liveText && liveText.length > 12) {
        const firstLine = liveText.split('\n')[0].replace(/^["']|["']$/g, '').trim();
        return [
          firstLine,
          `Counter-intuitive truth: ${draft.hook}`,
          `What nobody tells you about ${draft.campaignName.toLowerCase()}:`,
        ];
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 420));

    const topic = draft.hook.replace(/^(Slide 1:|Most|Why|Stop|I|We|How to)\s*/i, '');

    switch (tone) {
      case 'contrarian':
        return [
          `Almost everyone gets ${topic.slice(0, 38)} backwards. Here is the unvarnished reality.`,
          `Stop following the default playbook on this — it quietly burns your best creative hours.`,
          `The counter-intuitive shift around ${topic.slice(0, 32)} that actually moved the needle.`,
        ];
      case 'punchy':
        return [
          `One deliberate change: ${topic.slice(0, 45)}.`,
          `Zero filler. Just the exact architecture that worked in production.`,
          `Before you ship another update, test this constraint first.`,
        ];
      case 'storytelling':
        return [
          `Last Tuesday at 11:40 PM, our entire release plan changed because of one overlooked bottleneck.`,
          `We spent four weeks convinced our workflow was fast — until we measured where the hours went.`,
          `If I were starting this build from scratch today, I would cut 70% of the moving parts.`,
        ];
      default:
        return [
          `A practical breakdown of ${topic.slice(0, 38)} without the usual overhead.`,
          `Here is what happens when you optimize for long-term clarity instead of daily noise.`,
          `Three lessons from shipping ${draft.campaignName} with a lean, focused workflow.`,
        ];
    }
  }

  /**
   * Rewrites draft to be shorter and punchier
   */
  public async makeDraftShorter(draft: Draft): Promise<Draft> {
    await new Promise((resolve) => setTimeout(resolve, 380));

    const paragraphs = draft.body.split('\n\n').filter(Boolean);
    const condensedBody =
      paragraphs.length > 2
        ? `${paragraphs[0]}\n\n• Core takeaway: ${draft.hook}\n• Next step: ${draft.callToAction || 'Explore the workflow.'}`
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
    await new Promise((resolve) => setTimeout(resolve, 450));

    let modifiedHook = draft.hook;
    let modifiedBody = draft.body;

    if (newTone === 'contrarian') {
      modifiedHook = `Why conventional advice on this misses the mark: ${draft.hook}`;
      modifiedBody = `${modifiedHook}\n\n${draft.body}\n\nSkip the noisy rituals and focus on the artifact.`;
    } else if (newTone === 'playful') {
      modifiedHook = `Honest confession: ${draft.hook}`;
      modifiedBody = `${modifiedHook}\n\n${draft.body}\n\nPlot twist: doing the simpler thing actually worked on the first try.`;
    } else if (newTone === 'punchy') {
      modifiedHook = `Short version: ${draft.hook}`;
      const firstLine = draft.body.split('\n')[0];
      modifiedBody = `${firstLine}\n\nHigh signal. Zero busywork.\n\n${draft.callToAction}`;
    } else if (newTone === 'storytelling') {
      modifiedHook = `Behind the scenes on ${draft.campaignName}: ${draft.hook}`;
      modifiedBody = `${modifiedHook}\n\n${draft.body}`;
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
    await new Promise((resolve) => setTimeout(resolve, 450));

    const config = PLATFORM_CONFIGS[targetPlatform];
    let newHook = draft.hook;
    let newBody = draft.body;
    let newHashtags = [...draft.hashtags];

    if (targetPlatform === 'x') {
      newBody = `${draft.hook}\n\nKey takeaways:\n• Zero unnecessary overhead\n• Built for speed & clarity\n• Simple mental model\n\n${draft.callToAction}`;
      newHashtags = ['#buildinpublic', '#devtools'];
    } else if (targetPlatform === 'linkedin') {
      newBody = `${draft.hook}\n\nHere is what we learned working through this problem:\n\n1. Most complexity is self-inflicted.\n2. When you strip away vanity metrics, real craft stands out.\n3. Communities value transparent tradeoffs over polished buzzwords.\n\n${draft.callToAction}\n\nHow is your team approaching this?`;
      newHashtags = ['#SoftwareEngineering', '#ProductStrategy', '#OpenSource'];
    } else if (targetPlatform === 'youtube_shorts') {
      newHook = `[0-3s Visual Hook]: ${draft.hook}`;
      newBody = `HOOK (0-3s):\n"${draft.hook}"\n\nBEAT 1 (4-15s):\nShow the status quo bottleneck. Most creators spend hours reformatting the same note.\n\nBEAT 2 (16-40s):\nWalk through the 3-step system in real time.\n\nCTA (41-50s):\n"${draft.callToAction || 'Check the link in bio for the full repo.'}"`;
    } else if (targetPlatform === 'instagram') {
      newBody = `Slide 1: ${draft.hook}\n\nSlide 2: The Core Bottleneck\nSlide 3: The System Shift\nSlide 4: Step-by-Step Breakdown\n\nSave this reference for your next release cycle.\n\n${draft.callToAction}`;
      newHashtags = ['#creatorworkflow', '#indiehacker', '#designsystems'];
    } else if (targetPlatform === 'reddit') {
      newHook = `[Technical Breakdown] ${draft.hook}`;
      newBody = `Hey everyone,\n\nSharing a transparent retrospective on ${draft.campaignName || 'our latest build'}.\n\nContext & Implementation:\n${draft.body}\n\nHappy to answer any architecture questions or hear critique in the comments.`;
      newHashtags = [];
    } else if (targetPlatform === 'threads') {
      newBody = `${draft.hook}\n\n${draft.callToAction}`;
      newHashtags = ['#indiedev'];
    }

    return {
      ...draft,
      id: `draft_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      platform: targetPlatform,
      hook: newHook,
      body: newBody,
      hashtags: newHashtags,
      angleExplanation: `Repurposed to match ${config.name} structure.`,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    };
  }

  private synthesizeDraftForPlatform(
    req: GenerationRequest,
    platform: Platform,
    campaignId: string,
    index: number,
    liveModelText: string | null,
    generatedBy: 'open_weight_model' | 'demo_mode'
  ): Draft {
    const briefClean = req.brief.trim();
    const briefTitle = req.name.trim();
    const cta = req.customCta?.trim() || 'See the full breakdown in the comments';
    const kwTags = (req.keywords || []).map((k) => `#${k.replace(/\s+/g, '')}`);

    let hook = '';
    let body = '';
    let hashtags: string[] = [];
    let angleExplanation = '';

    if (liveModelText && liveModelText.length > 20) {
      const lines = liveModelText.split('\n').filter(Boolean);
      hook = lines[0]?.slice(0, 140) || `Notes on ${briefTitle}:`;
      body = `${liveModelText}\n\n${cta}`;
      hashtags = [...kwTags, '#openweights', '#buildinpublic'].slice(0, 3);
      angleExplanation = `Generated live via local open-weight model (${this.status.modelName}) for ${PLATFORM_CONFIGS[platform].name}.`;
    } else {
      switch (platform) {
        case 'x': {
          const xHooks = [
            `Most teams overcomplicate ${briefTitle.toLowerCase()}. Here is the leaner path:`,
            `Stop spending four hours reformatting what you can structure in three minutes:`,
            `One clear idea in. A full week of platform-native drafts out:`,
          ];
          hook = xHooks[index % xHooks.length];
          body = `${hook}\n\n${briefClean}\n\n• High signal, zero filler\n• Tailored for ${req.audience}\n• Built for sustainable shipping\n\n${cta}`;
          hashtags = [...kwTags, '#buildinpublic', '#devtools'].slice(0, 3);
          angleExplanation = 'Demo Mode structured synthesis: timeline hook + scannable bullet points.';
          break;
        }

        case 'linkedin': {
          hook = `We took a deliberate, slower approach to ${briefTitle.toLowerCase()} — and the results surprised us.`;
          body = `${hook}\n\nWhen talking with ${req.audience}, one pattern kept surfacing: most workflows optimize for volume instead of substance.\n\n${briefClean}\n\nThree takeaways from this cycle:\n1. Solve the root bottleneck, not the surface symptom.\n2. Respect your reader's time with concrete examples.\n3. Let open-weight tools handle repetitive formatting so humans stay focused on craft.\n\n${cta}\n\nHow are you structuring your creative workflow this quarter?`;
          hashtags = [...kwTags, '#Engineering', '#ProductDesign', '#OpenSource'].slice(0, 4);
          angleExplanation = 'Demo Mode structured synthesis: narrative lead-in + 3 numbered takeaways + discussion question.';
          break;
        }

        case 'instagram': {
          hook = `Slide 1: The architecture behind ${briefTitle}.`;
          body = `Slide 1: The architecture behind ${briefTitle}.\n\nSlide 2: THE FRICTION\nWhy repetitive post formatting drains momentum before you publish.\n\nSlide 3: THE CORE IDEA\n${briefClean}\n\nSlide 4: WHO IT HELPS\nBuilt specifically for ${req.audience}.\n\nSlide 5: NEXT STEP\n${cta}\n\nSave this breakdown for your next launch week.`;
          hashtags = [...kwTags, '#creatorstudio', '#productdesign', '#indiehacker'].slice(0, 4);
          angleExplanation = 'Demo Mode structured synthesis: 5-slide carousel script with clear pacing.';
          break;
        }

        case 'threads': {
          hook = `Unpopular take: You don't need a 12-tab spreadsheet to share meaningful work consistently.`;
          body = `${hook}\n\n${briefClean}\n\nDocument the real work once, adapt it cleanly, and get back to building.\n\n${cta}`;
          hashtags = [...kwTags, '#indiedev'].slice(0, 2);
          angleExplanation = 'Demo Mode structured synthesis: conversational micro-post for Threads.';
          break;
        }

        case 'youtube_shorts': {
          hook = `[0-3s Hook]: "This workflow shift saved our small team hours every week."`;
          body = `SCENE 1 (0:00 - 0:04):\nDirect camera framing with raw project notes on screen.\nAudio: ${hook}\n\nSCENE 2 (0:05 - 0:22):\nWalkthrough of the core concept: "${briefClean}"\nAudio: "Instead of rewriting from scratch for every channel, we capture the thesis once and adapt the structure."\n\nSCENE 3 (0:23 - 0:42):\nShow the organized weekly board.\nAudio: "${cta}"`;
          hashtags = [...kwTags, '#shorts', '#workflow'].slice(0, 3);
          angleExplanation = 'Demo Mode structured synthesis: 3-beat vertical video script.';
          break;
        }

        case 'reddit': {
          hook = `How we approached ${briefTitle} — architecture notes and lessons learned`;
          body = `Hey everyone,\n\nWanted to share a concise write-up on what we put together for ${req.audience}.\n\nContext & Problem:\n${briefClean}\n\nWhat we prioritized:\n- Transparent open-weight model architecture\n- Local browser persistence with CSV/JSON exports\n- Zero mandatory cloud lock-in\n\nWould love constructive feedback from the community.`;
          hashtags = [];
          angleExplanation = 'Demo Mode structured synthesis: peer-review discussion post with zero promotional fluff.';
          break;
        }
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
      generatedBy,
    };
  }
}

export const aiEngine = new AIEngineService();
