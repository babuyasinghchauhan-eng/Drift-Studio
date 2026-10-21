export type Platform = 'x' | 'linkedin' | 'instagram' | 'threads' | 'youtube_shorts' | 'reddit';

export type ContentStatus = 'idea' | 'draft' | 'review' | 'ready';

export type Tone = 
  | 'authentic' 
  | 'punchy' 
  | 'educational' 
  | 'playful' 
  | 'storytelling' 
  | 'contrarian';

export type Objective = 
  | 'awareness' 
  | 'engagement' 
  | 'community' 
  | 'launch' 
  | 'educational' 
  | 'lead_generation';

export interface Draft {
  id: string;
  campaignId: string;
  campaignName: string;
  platform: Platform;
  hook: string;
  body: string;
  hashtags: string[];
  callToAction: string;
  angleExplanation: string;
  status: ContentStatus;
  scheduledDate?: string; // YYYY-MM-DD
  scheduledTime?: string; // HH:mm
  createdAt: string;
  updatedAt: string;
  characterCount?: number;
  generatedBy?: 'open_weight_model' | 'demo_mode' | 'manual';
}

export interface Campaign {
  id: string;
  name: string;
  brief: string;
  audience: string;
  objective: Objective;
  tone: Tone;
  language: string;
  platforms: Platform[];
  draftCount: number;
  keywords?: string[];
  customCta?: string;
  constraints?: string;
  draftsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GenerationRequest {
  name: string;
  brief: string;
  audience: string;
  objective: Objective;
  tone: Tone;
  language: string;
  platforms: Platform[];
  draftCount: number;
  keywords?: string[];
  customCta?: string;
  constraints?: string;
}

export type EngineMode = 'webgpu' | 'cpu_wasm' | 'instant_demo';

export type EngineLifecycleState =
  | 'demo'
  | 'loading'
  | 'ready'
  | 'generating'
  | 'unavailable'
  | 'error';

export interface ModelEngineStatus {
  mode: EngineMode;
  state: EngineLifecycleState;
  modelName: string;
  modelCheckpoint: string;
  webgpuSupported: boolean;
  adapterInfo?: string;
  deviceTier?: string;
  downloadProgress?: number;
  downloadStatusText?: string;
  lastLatencyMs?: number;
  errorMessage?: string;
  isDemoMode: boolean;
  isModelLoaded: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
  undoAction?: () => void;
}
