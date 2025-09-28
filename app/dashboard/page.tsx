'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Sidebar } from '@/components/layout/Sidebar';
import { GlobalOverview } from '@/components/dashboard/GlobalOverview';
import { DatasetAnalysis } from '@/components/dashboard/DatasetAnalysis';
import { QueryAnalysis } from '@/components/dashboard/QueryAnalysis';
import { ReviewPanel } from '@/components/dashboard/ReviewPanel';
import { Chatbot } from '@/components/dashboard/Chatbot';
import { UploadDialog } from '@/components/upload/UploadDialog';
import { Loader as Loader2, LogOut, Bell, Settings } from 'lucide-react';
const mockDatasets = [
  { id: 'ds1', name: 'DeepSea_Pacific_2024', createdAt: new Date('2024-01-15') },
  { id: 'ds2', name: 'Arctic_Samples_2024', createdAt: new Date('2024-01-10') },
  { id: 'ds3', name: 'Mediterranean_Deep_2023', createdAt: new Date('2023-12-20') }
];

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState('global-overview');
  const [uploadDialog, setUploadDialog] = useState<'dataset' | 'query' | null>(null);
  const [datasets] = useState(mockDatasets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'global-overview':
        return <GlobalOverview />;
      case 'datasets':
        return <div>Dataset overview would go here</div>;
      case 'queries':
        return <QueryAnalysis />;
      case 'review':
        return <ReviewPanel />;
      case 'settings':
        return <div>Settings would go here</div>;
      default:
        if (currentView.startsWith('dataset-')) {
          const datasetId = currentView.replace('dataset-', '');
          return <DatasetAnalysis datasetId={datasetId} />;
        }
        return <GlobalOverview />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddDataset={() => setUploadDialog('dataset')}
        onAddQuery={() => setUploadDialog('query')}
        datasets={datasets}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <h2 className="font-semibold">
                Dr. Marine Scientist
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                  D
                </div>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            {renderCurrentView()}
          </main>

          {/* Chatbot Panel */}
          <aside className="w-80 border-l bg-card p-4 overflow-hidden">
            <Chatbot />
          </aside>
        </div>
      </div>

      {/* Upload Dialogs */}
      <UploadDialog
        open={uploadDialog === 'dataset'}
        onClose={() => setUploadDialog(null)}
        type="dataset"
      />
      <UploadDialog
        open={uploadDialog === 'query'}
        onClose={() => setUploadDialog(null)}
        type="query"
      />
    </div>
  );
}