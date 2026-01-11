import React, { useState } from 'react';
import { FileText, ScrollText, ShieldCheck, FileCode, Info } from 'lucide-react';

type DocTab = 'context' | 'rulebook' | 'patchlog' | 'backend';

// Hardcoded content placeholders to simulate markdown rendering in this demo environment
const CONTENT_CONTEXT = `
# BPM-OS System Context (V3.1-EXT)

## 1. Product Vision
Battery Pack Manufacturing Operating System (BPM-OS) is a specialized MES designed for high-compliance battery assembly.
It bridges the gap between physical manufacturing (OT) and digital traceability (IT).

## 2. Operational Flow (SOP Map)
The system follows a strict linear sequence defined by the SOP:

- **S0-S1:** System Setup & Product Definition (Blueprint)
- **S2-S3:** Inbound Logistics & Material Verification
- **S4:** Production Planning & Batch Scheduling
- **S5-S8:** Manufacturing Execution (Cell -> Module -> Pack -> QA)
- **S9-S10:** Digital Identity & BMS Provisioning (Trace)
- **S11-S14:** Outbound Logistics & Dispatch
- **S15-S17:** Lifecycle Service & Compliance Governance

## 3. V3.1-EXT Scope
The "EXT" (Operations, Control & Dashboards) extension adds:
- Enhanced sidebar navigation for scalability.
- Consolidated system-level views (Inventory, Logs, Status).
- Separation of concerns between Frontend (Visual) and Backend (Logic).
- Strict "Trace" vs "Track" semantic enforcement.

## 4. Handover Notes
This frontend is a **state-driven visual shell**. 
It contains NO business logic for:
- Inventory transactions
- Serial number generation
- Regulatory validation checks
- Hardware integration (CAN/Modbus)

All such logic must be implemented in the backend microservices.
`;

const CONTENT_RULEBOOK = `
# BPM-OS Frontend Vibe-Coding Rulebook (V3.1-EXT)

A. Frontend-Only Scope
   - NO Backend Logic
   - NO Databases
   - NO Persistent State

B. Date Authority
   - IST Human-Provided Timestamps ONLY.
   - Do not invent dates.

C. EXT Naming
   - EXT-BP (Bridge)
   - EXT-PP (Primary)
   - EXT-FP (Fix)
   - EXT-HO (Handover)

D. Semantic Hardening
   - TRACE = Past / Identity
   - TRACK = Present / State
`;

const CONTENT_PATCHLOG = `
# BPM-OS Frontend PATCHLOG

... [Previous V3.1 Core Patches] ...

| EXT-BP-000 | Bridge Patch | EXT Phase Initialization | 2026-01-12 01:35 (IST) |
| EXT-BP-001 | Bridge Patch | Sidebar UX & Scalability | 2026-01-12 01:40 (IST) |
| EXT-BP-002 | Bridge Patch | System Section Handover  | 2026-01-12 01:55 (IST) |
`;

const CONTENT_CONTRACT = `
# BPM-OS V3.1 — BACKEND HANDOVER CONTRACT

[FROZEN V3.1 CORE CONTRACT]

# V3.1-EXT EXTENSION CONTRACT (SCAFFOLD)

1. EXT MODULES (Planned)
   - Dashboarding & Analytics
   - Operational Runbooks
   - Advanced Control Systems

2. DATA REQUIREMENTS
   - Real-time aggregated metrics endpoint
   - Historical trend analysis API
   - WebSocket stream for live alerts
`;

export const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DocTab>('context');

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
                {activeTab === 'context' && 'README_EXT.md'}
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
            {activeTab === 'context' && CONTENT_CONTEXT}
            {activeTab === 'rulebook' && CONTENT_RULEBOOK}
            {activeTab === 'patchlog' && CONTENT_PATCHLOG}
            {activeTab === 'backend' && CONTENT_CONTRACT}
         </div>
      </div>

    </div>
  );
};