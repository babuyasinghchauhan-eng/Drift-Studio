import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  KanbanSquare,
  Calendar as CalendarIcon,
  FolderOpen,
  Cpu,
  Download,
  ArrowLeft,
  Sun,
  Moon,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Campaign, Draft, ContentStatus, ModelEngineStatus, ToastMessage } from '../types';
import { StorageService } from '../services/storage';
import { aiEngine } from '../services/aiEngine';
import { DashboardView } from './DashboardView';
import { CampaignCreatorView } from './CampaignCreatorView';
import { ContentBoardView } from './ContentBoardView';
import { CalendarView } from './CalendarView';
import { SavedDraftsView } from './SavedDraftsView';
import { DraftModal } from './DraftModal';
import { EngineStatusModal } from './EngineStatusModal';

interface StudioLayoutProps {
  initialTab?: string;
  onExitToLanding: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({
  initialTab = 'dashboard',
  onExitToLanding,
  theme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    initialTab === 'engine' ? 'dashboard' : initialTab
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [isEngineModalOpen, setIsEngineModalOpen] = useState<boolean>(initialTab === 'engine');
  const [engineStatus, setEngineStatus] = useState<ModelEngineStatus>(aiEngine.getStatus());
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const loadedCampaigns = StorageService.loadCampaigns();
    const loadedDrafts = StorageService.loadDrafts();
    setCampaigns(loadedCampaigns);
    setDrafts(loadedDrafts);

    const unsub = aiEngine.subscribe((s) => setEngineStatus(s));
    return unsub;
  }, []);

  const showToast = (title: string, description?: string, undoAction?: () => void) => {
    const id = Math.random().toString();
    setToast({ id, type: 'success', title, description, undoAction });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4200);
  };

  const handleCampaignCreated = (newCampaign: Campaign, newDrafts: Draft[]) => {
    const updatedCampaigns = [newCampaign, ...campaigns];
    const updatedDrafts = [...newDrafts, ...drafts];
    setCampaigns(updatedCampaigns);
    setDrafts(updatedDrafts);
    StorageService.saveCampaigns(updatedCampaigns);
    StorageService.saveDrafts(updatedDrafts);
    showToast(
      'Campaign created',
      `${newDrafts.length} platform drafts added to your board.`
    );
    setActiveTab('board');
  };

  const handleSaveDraft = (updated: Draft) => {
    const exists = drafts.some((d) => d.id === updated.id);
    const updatedDrafts = exists
      ? drafts.map((d) => (d.id === updated.id ? updated : d))
      : [updated, ...drafts];
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast('Draft saved');
  };

  const handleDeleteDraft = (id: string) => {
    const deletedDraft = drafts.find((d) => d.id === id);
    const previousDrafts = [...drafts];
    const updatedDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    setSelectedDraft(null);

    if (deletedDraft) {
      showToast('Draft deleted', undefined, () => {
        setDrafts(previousDrafts);
        StorageService.saveDrafts(previousDrafts);
      });
    }
  };

  const handleDuplicateDraft = (d: Draft) => {
    const duplicated: Draft = {
      ...d,
      id: `draft_${Date.now()}_copy`,
      hook: `${d.hook} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedDrafts = [duplicated, ...drafts];
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast('Draft duplicated');
    setSelectedDraft(duplicated);
  };

  const handleUpdateDraftStatus = (id: string, newStatus: ContentStatus) => {
    const updatedDrafts = drafts.map((d) =>
      d.id === id ? { ...d, status: newStatus, updatedAt: new Date().toISOString() } : d
    );
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast(`Draft moved to ${newStatus}`);
  };

  const handleRescheduleDraft = (id: string, date: string, time?: string) => {
    const updatedDrafts = drafts.map((d) =>
      d.id === id
        ? { ...d, scheduledDate: date || undefined, scheduledTime: date ? time : undefined }
        : d
    );
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast(date ? `Scheduled for ${date}` : 'Removed from schedule');
  };

  const handleCreateDraftInStage = (stage: ContentStatus) => {
    const newDraft: Draft = {
      id: `draft_${Date.now()}`,
      campaignId: campaigns[0]?.id || 'camp_manual',
      campaignName: campaigns[0]?.name || 'Direct Draft',
      platform: 'x',
      hook: 'New draft concept...',
      body: 'Write your social post content here...',
      hashtags: [],
      callToAction: '',
      angleExplanation: 'Manually created in Studio',
      status: stage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: 'manual',
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    StorageService.saveDrafts(updated);
    setSelectedDraft(newDraft);
  };

  const handleCreateDraftForDate = (date: string) => {
    const newDraft: Draft = {
      id: `draft_${Date.now()}`,
      campaignId: campaigns[0]?.id || 'camp_manual',
      campaignName: campaigns[0]?.name || 'Planned Release',
      platform: 'x',
      hook: 'Planned content idea...',
      body: 'Write your scheduled post here...',
      hashtags: [],
      callToAction: '',
      angleExplanation: 'Planned in weekly calendar',
      status: 'draft',
      scheduledDate: date,
      scheduledTime: '10:00',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: 'manual',
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    StorageService.saveDrafts(updated);
    setSelectedDraft(newDraft);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-[#F7F6FA] dark:bg-[#0D0B14] text-[#19171F] dark:text-white flex flex-col transition-colors`}>
      
      {/* Studio Top Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#120F1F]/95 backdrop-blur-md border-b border-[#19171F]/10 dark:border-white/10 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Back to Showcase + Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToLanding}
            className="px-3 py-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Showcase</span>
          </button>

          <div className="h-4 w-px bg-[#19171F]/10 dark:bg-white/10 hidden sm:block" />

          <button
            onClick={() => setActiveTab('dashboard')}
            className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#19171F] dark:text-white whitespace-nowrap"
          >
            Drift Studio
          </button>
        </div>

        {/* Center: Workspace Segmented Navigation Tabs */}
        <nav aria-label="Workspace views" className="hidden md:flex items-center gap-1 p-1 bg-[#F7F6FA] dark:bg-[#1C182B] rounded-xl border border-[#19171F]/10 dark:border-white/10 text-xs font-bold text-[#777481] dark:text-[#9E9AA8]">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'create', label: 'New Plan', icon: PlusCircle },
            { id: 'board', label: 'Board', icon: KanbanSquare },
            { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
            { id: 'drafts', label: 'Drafts', icon: FolderOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-[#2A2342] text-[#5515E8] dark:text-white shadow-sm'
                    : 'hover:text-[#19171F] dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Model Status Trigger + Export + Theme */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEngineModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-[#F0EDFF] dark:bg-[#5515E8]/20 text-[#5515E8] dark:text-[#7886F8] hover:bg-[#5515E8] hover:text-white transition-colors text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap"
            title="Inspect AI model status & runtime mode"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">
              {engineStatus.isDemoMode ? 'Demo Mode' : 'Live Open-AI'}
            </span>
          </button>

          <button
            onClick={() => {
              StorageService.exportToJSON(campaigns, drafts);
              showToast('Exported workspace JSON backup');
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/5 transition-colors"
            title="Download JSON Workspace Backup"
            aria-label="Download JSON Workspace Backup"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/5 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* Mobile Workspace Navigation Bar */}
      <div className="md:hidden bg-white dark:bg-[#120F1F] border-b border-[#19171F]/10 dark:border-white/10 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'create', label: '+ New Plan' },
          { id: 'board', label: 'Board' },
          { id: 'calendar', label: 'Calendar' },
          { id: 'drafts', label: 'Drafts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#5515E8] text-white'
                : 'bg-[#F7F6FA] dark:bg-[#1C182B] text-[#777481] dark:text-[#9E9AA8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            campaigns={campaigns}
            drafts={drafts}
            onCreateNewPlan={() => setActiveTab('create')}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onNavigateTab={(t) => setActiveTab(t)}
          />
        )}

        {activeTab === 'create' && (
          <CampaignCreatorView
            onCampaignCreated={handleCampaignCreated}
            onCancel={() => setActiveTab('dashboard')}
            onOpenEngineModal={() => setIsEngineModalOpen(true)}
          />
        )}

        {activeTab === 'board' && (
          <ContentBoardView
            drafts={drafts}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onUpdateDraftStatus={handleUpdateDraftStatus}
            onDeleteDraft={handleDeleteDraft}
            onDuplicateDraft={handleDuplicateDraft}
            onCreateDraftInStage={handleCreateDraftInStage}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            drafts={drafts}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onRescheduleDraft={handleRescheduleDraft}
            onCreateDraftForDate={handleCreateDraftForDate}
          />
        )}

        {activeTab === 'drafts' && (
          <SavedDraftsView
            drafts={drafts}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onDeleteDraft={handleDeleteDraft}
            onCreateNewPlan={() => setActiveTab('create')}
          />
        )}
      </main>

      {/* Draft Editor Modal */}
      {selectedDraft && (
        <DraftModal
          draft={selectedDraft}
          isOpen={Boolean(selectedDraft)}
          onClose={() => setSelectedDraft(null)}
          onSave={handleSaveDraft}
          onDelete={handleDeleteDraft}
          onDuplicate={handleDuplicateDraft}
        />
      )}

      {/* Model Diagnostics Modal */}
      <EngineStatusModal
        isOpen={isEngineModalOpen}
        onClose={() => setIsEngineModalOpen(false)}
      />

      {/* Accessible Toast Notification with Undo */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#19171F] dark:bg-white text-white dark:text-[#19171F] shadow-2xl border border-white/10 dark:border-black/10 text-xs"
        >
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold">{toast.title}</div>
            {toast.description && (
              <div className="text-white/75 dark:text-black/75 text-[11px] mt-0.5">
                {toast.description}
              </div>
            )}
          </div>
          {toast.undoAction && (
            <button
              onClick={() => {
                toast.undoAction?.();
                setToast(null);
              }}
              className="ml-2 px-3 py-1.5 rounded-lg bg-white/20 dark:bg-black/10 hover:bg-white/30 text-xs font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
