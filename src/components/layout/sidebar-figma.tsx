'use client';

import * as React from 'react';
import { Search, ChevronDown, ChevronRight, Plus, Settings, Key, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SidebarFigmaProps {
  className?: string;
}

export function SidebarFigma({ className }: SidebarFigmaProps) {
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['Edition', 'Brainstorming']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <aside
      className={cn(
        'flex h-screen w-[240px] flex-col border-r border-[#E5E5E5] bg-[#FAFAFA]',
        className
      )}
    >
      {/* Top: Company Header */}
      <div className="flex items-center gap-3 border-b border-[#E5E5E5] p-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900">
          <span className="text-sm font-semibold text-white">A</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-semibold text-gray-900">Acme inc</span>
          <span className="truncate text-xs text-gray-500">Line 2</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 pb-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search prompts"
            className="h-8 border-[#E5E5E5] bg-white pl-8 pr-3 text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Library Section - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Library Header */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Library</span>
          <button className="rounded p-0.5 hover:bg-gray-200">
            <Plus className="h-3.5 w-3.5 text-gray-500" />
          </button>
        </div>

        {/* Edition Section */}
        <CollapsibleSection
          title="Edition"
          isExpanded={expandedSections.includes('Edition')}
          onToggle={() => toggleSection('Edition')}
        >
          <MenuItem label="Summarize" />
          <MenuItem label="Check for coherence" />
          <MenuItem label="Review with my tone" />
        </CollapsibleSection>

        {/* Brainstorming Section */}
        <CollapsibleSection
          title="Brainstorming"
          isExpanded={expandedSections.includes('Brainstorming')}
          onToggle={() => toggleSection('Brainstorming')}
        >
          <MenuItem label="Label" />
          <MenuItem label="Idea / problem frame..." />
          <MenuItem label="Smart critic to text" />
        </CollapsibleSection>

        {/* Learning Section */}
        <CollapsibleSection
          title="Learning"
          isExpanded={expandedSections.includes('Learning')}
          onToggle={() => toggleSection('Learning')}
        />

        {/* Marketing Section */}
        <CollapsibleSection
          title="Marketing"
          isExpanded={expandedSections.includes('Marketing')}
          onToggle={() => toggleSection('Marketing')}
        />
      </div>

      {/* Bottom: Footer Actions */}
      <div className="border-t border-[#E5E5E5] p-2">
        <FooterItem icon={Settings} label="Settings" />
        <FooterItem icon={Key} label="API Keys" />
        <FooterItem icon={HelpCircle} label="Help" />
      </div>
    </aside>
  );
}

interface CollapsibleSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

function CollapsibleSection({ title, isExpanded, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
          )}
          <span>{title}</span>
        </div>
        <button
          className="rounded p-0.5 hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            // Handle add action
          }}
        >
          <Plus className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </button>

      {isExpanded && children && (
        <div className="ml-5 mt-0.5 space-y-0.5 border-l border-gray-200 pl-2">
          {children}
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  label: string;
}

function MenuItem({ label }: MenuItemProps) {
  return (
    <button className="w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900">
      {label}
    </button>
  );
}

interface FooterItemProps {
  icon: React.ElementType;
  label: string;
}

function FooterItem({ icon: Icon, label }: FooterItemProps) {
  return (
    <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
