'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Globe, 
  FolderOpen, 
  Search, 
  Settings, 
  ChevronLeft,
  Plus,
  Database,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onAddDataset: () => void;
  onAddQuery: () => void;
  datasets: any[];
}

export function Sidebar({ 
  currentView, 
  onViewChange, 
  onAddDataset, 
  onAddQuery, 
  datasets 
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    {
      id: 'global-overview',
      label: 'Global Overview',
      icon: Globe,
      description: 'Big picture across all datasets'
    },
    {
      id: 'datasets',
      label: 'DNA Datasets',
      icon: FolderOpen,
      description: 'Individual dataset analysis'
    },
    {
      id: 'queries',
      label: 'Query Analysis',
      icon: Search,
      description: 'Single sequence analysis'
    }
  ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-card border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-semibold text-primary">EDeepNA</h2>
            <p className="text-xs text-muted-foreground">eDNA Analysis Platform</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            collapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-2">
        <Button 
          onClick={onAddDataset} 
          className="w-full justify-start"
          variant="default"
        >
          <Plus className="h-4 w-4 mr-2" />
          {!collapsed && "Add Dataset"}
        </Button>
        <Button 
          onClick={onAddQuery} 
          className="w-full justify-start"
          variant="outline"
        >
          <Search className="h-4 w-4 mr-2" />
          {!collapsed && "Add Query"}
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {!collapsed && (
                <div className="flex flex-col items-start">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              )}
            </Button>
          ))}
        </div>

        {!collapsed && datasets.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-2">
                Recent Datasets
              </h3>
              {datasets.slice(0, 5).map((dataset) => (
                <Button
                  key={dataset.id}
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => onViewChange(`dataset-${dataset.id}`)}
                >
                  <Database className="h-3 w-3 mr-2" />
                  <span className="truncate">{dataset.name}</span>
                </Button>
              ))}
            </div>
          </>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onViewChange('settings')}
        >
          <Settings className="h-4 w-4 mr-2" />
          {!collapsed && "Settings"}
        </Button>
        <div className={cn("flex", collapsed ? "justify-center" : "justify-start")}>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}