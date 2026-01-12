import React, { useState, useMemo } from 'react';
import { FileText, ScrollText, ShieldCheck, FileCode, Info, Clock } from 'lucide-react';
import { 
  SYSTEM_CONTEXT_CONTENT, 
  RULEBOOK_CONTENT, 
  PATCHLOG_CONTENT, 
  BACKEND_CONTRACT_CONTENT 
} from '../docs/artifacts';

type DocTab = 'context' | 'rulebook' | 'patchlog' | 'backend';

// Helper to extract last updated timestamp from patchlog
const getLastUpdated = (patchlog: string) => {
  // Try to find the last occurrence of the IST timestamp pattern in table rows
  // Format: | ... | YYYY-MM-DD HH:MM (IST) |
  const lines = patchlog.trim().split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.includes('|') && line.includes('(IST)')) {
       const parts = line.split('|');
       // Date is usually the last populated column
       const dateStr = parts[parts.length - 2]?.trim(); 
       if (dateStr) return dateStr;
    }
  }
  return 'Unknown';
};

export const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DocTab>('context');

  const lastUpdated = useMemo(() => getLastUpdated(PATCHLOG_CONTENT), []);

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System <span className="text-slate-300">/</span> Reference
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <FileText className="text-brand-600" size={24} />
             System Documentation
           </h1>
           <p className="text-slate-500 text-sm mt-1">Governance artifacts, patch history, and integration contracts.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded text-xs font-medium text-slate-600 border border-slate-200">
            <Clock size={12} />
            <span>Last Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
            onClick={() => setActiveTab('context')}
            className={`pb-2 px-1 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'context' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
            <Info size={16} /> System Context
        </button>
        <button 
            onClick={() => setActiveTab('rulebook')}
            className={`pb-2 px-1 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'rulebook' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
            <ShieldCheck size={16} /> Rulebook
        </button>
        <button 
            onClick={() => setActiveTab('patchlog')}
            className={`pb-2 px-1 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'patchlog' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
            <ScrollText size={16} /> Patchlog
        </button>
        <button 
            onClick={() => setActiveTab('backend')}
            className={`pb-2 px-1 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'backend' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
            <FileCode size={16} /> Backend Contract
        </button>
      </div>

      {/* Content Viewer */}
      <div className="flex-1 bg-slate-50 rounded-lg border border-industrial-border overflow-hidden flex flex-col">
         <div className="p-2 bg-white border-b border-slate-200 flex justify-between items-center px-4">
            <span className="text-xs font-mono text-slate-400">
                {activeTab === 'context' && 'SYSTEM_CONTEXT.md'}
                {activeTab === 'rulebook' && 'RULEBOOK.md'}
                {activeTab === 'patchlog' && 'PATCHLOG.md'}
                {activeTab === 'backend' && 'BACKEND_CONTRACT.md'}
            </span>
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-6 font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {activeTab === 'context' && SYSTEM_CONTEXT_CONTENT}
            {activeTab === 'rulebook' && RULEBOOK_CONTENT}
            {activeTab === 'patchlog' && PATCHLOG_CONTENT}
            {activeTab === 'backend' && BACKEND_CONTRACT_CONTENT}
         </div>
      </div>

    </div>
  );
};