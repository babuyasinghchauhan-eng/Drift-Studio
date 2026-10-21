import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MomentumSection } from './components/MomentumSection';
import { ProductInActionSection } from './components/ProductInActionSection';
import { IntelligentToolsSection } from './components/IntelligentToolsSection';
import { IntegrationsExportSection } from './components/IntegrationsExportSection';
import { WorkflowSection } from './components/WorkflowSection';
import { OpenAiSection } from './components/OpenAiSection';
import { InsideCampaignSection } from './components/InsideCampaignSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { StudioLayout } from './studio/StudioLayout';
import { StorageService } from './services/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'studio'>('landing');
  const [studioInitialTab, setStudioInitialTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = StorageService.getTheme();
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    StorageService.setTheme(next);
  };

  const handleNavigate = (view: 'landing' | 'studio', studioTab: string = 'dashboard') => {
    setCurrentView(view);
    setStudioInitialTab(studioTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToProduct = () => {
    const el = document.getElementById('scene-product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'studio') {
    return (
      <StudioLayout
        initialTab={studioInitialTab}
        onExitToLanding={() => handleNavigate('landing')}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0B12] text-[#19171F] dark:text-white transition-colors">
      {/* Top Bar Contract (Wordmark, single-line links, primary action) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections (Story-led narrative from Scene A to Scene J) */}
      <main>
        {/* Scene A: Hero with editorial headlines and multidimensional artwork */}
        <HeroSection
          onStartPlan={() => handleNavigate('studio', 'create')}
          onExplore={handleScrollToProduct}
        />

        {/* Scene B: Immersive transition with sculptural creative momentum */}
        <MomentumSection onOpenStudio={() => handleNavigate('studio', 'create')} />

        {/* Scene C: The product in action with realistic platform drafts */}
        <ProductInActionSection onOpenStudio={() => handleNavigate('studio', 'board')} />

        {/* Scene D: Intelligent content tools (tone switch, hook variations, etc.) */}
        <IntelligentToolsSection />

        {/* Scene E: Genuine integrations and exports (CSV, JSON, TXT, Clipboard) */}
        <IntegrationsExportSection />

        {/* Scene F: The 3-step workflow (01 Capture, 02 Open AI draft, 03 Review & organize) */}
        <WorkflowSection onStartWorkflow={() => handleNavigate('studio', 'create')} />

        {/* Scene G: Open AI, open possibilities with live engine telemetry */}
        <OpenAiSection />

        {/* Scene H: Inside a campaign before/after breakdown */}
        <InsideCampaignSection />

        {/* Scene I: Accessible FAQ */}
        <FaqSection />

        {/* Scene J: Final dramatic periwinkle/violet CTA */}
        <CtaSection onStartCreating={() => handleNavigate('studio', 'create')} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
