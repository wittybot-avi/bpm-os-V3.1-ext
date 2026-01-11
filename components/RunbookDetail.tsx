import React, { useState } from 'react';
import { NavView } from '../types';
import { 
  ArrowLeft, 
  Radar, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  AlertOctagon, 
  PlayCircle, 
  Activity,
  Layers,
  Truck,
  Box,
  RotateCcw,
  Zap,
  ShieldCheck,
  User,
  Info,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface RunbookDetailProps {
  runbookId: string | null;
  onNavigate: (view: NavView) => void;
}

interface StageDefinition {
  id: string;
  name: string;
  sopRef: string;
  navTarget: NavView;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Hold';
  roles: string[];
  gate?: GateDefinition;
  exception?: {
    type: string;
    description: string;
  };
}

interface GateDefinition {
  type: 'Approval' | 'Validation' | 'Interlock';
  condition: string;
  evidence: string;
  owner: string;
  status: 'Open' | 'Closed' | 'Locked';
  impact: string;
}

interface RunbookData {
  id: string;
  title: string;
  range: string;
  purpose: string;
  status: 'Running' | 'Blocked' | 'Idle' | 'Healthy';
  stages: StageDefinition[];
}

// MOCK DATA DEFINITIONS
const RUNBOOKS: Record<string, RunbookData> = {
  'material': {
    id: 'material',
    title: 'Material Receipt & Serialization',
    range: 'S2 → S4',
    purpose: 'Inbound verification, QC, identity generation, and ledger binding.',
    status: 'Healthy',
    stages: [
      {
        id: 'stg-01',
        name: 'Inbound Receipt (S3)',
        sopRef: 'SOP-03-01',
        navTarget: 'inbound_receipt',
        status: 'Completed',
        roles: ['Stores', 'Logistics'],
        gate: {
          type: 'Validation',
          condition: 'Material count matches PO + No visual damage.',
          evidence: 'Digital Receipt Note (DRN)',
          owner: 'Stores Supervisor',
          status: 'Open',
          impact: 'Inventory cannot be serialized.'
        }
      },
      {
        id: 'stg-02',
        name: 'QC Inspection',
        sopRef: 'SOP-03-02',
        navTarget: 'inbound_receipt',
        status: 'In Progress',
        roles: ['QC Engineer'],
        gate: {
          type: 'Approval',
          condition: 'Sampling Plan AQL 2.5 Pass.',
          evidence: 'QC Report Signed',
          owner: 'Quality Lead',
          status: 'Closed',
          impact: 'Batch remains quarantined.'
        },
        exception: {
          type: 'Quality Deviation',
          description: 'AQL 2.5 Failure on Sample #4'
        }
      },
      {
        id: 'stg-03',
        name: 'Serialization',
        sopRef: 'SOP-03-03',
        navTarget: 'inbound_receipt',
        status: 'Pending',
        roles: ['System'],
        gate: {
          type: 'Interlock',
          condition: 'QC Approval + UID Generation.',
          evidence: 'System Log',
          owner: 'System (Auto)',
          status: 'Locked',
          impact: 'Production allocation disabled.'
        }
      },
      {
        id: 'stg-04',
        name: 'Ledger Binding',
        sopRef: 'SOP-09-01',
        navTarget: 'battery_registry',
        status: 'Pending',
        roles: ['Compliance'],
        gate: {
          type: 'Validation',
          condition: 'Battery Aadhaar Pre-Allocated.',
          evidence: 'Registry ACK',
          owner: 'Compliance Officer',
          status: 'Locked',
          impact: 'Cannot move to manufacturing.'
        }
      }
    ]
  },
  'manufacturing': {
    id: 'manufacturing',
    title: 'Manufacturing Execution Run',
    range: 'S4 → S8',
    purpose: 'Batch planning, assembly execution, QA validation, and release.',
    status: 'Blocked',
    stages: [
      {
        id: 'mfg-01',
        name: 'Batch Planning (S4)',
        sopRef: 'SOP-04-01',
        navTarget: 'batch_planning',
        status: 'Completed',
        roles: ['Planner'],
        gate: {
          type: 'Interlock',
          condition: 'Material Availability Check > 100%.',
          evidence: 'Inventory Lock',
          owner: 'System',
          status: 'Open',
          impact: 'Batch cannot be released to floor.'
        }
      },
      {
        id: 'mfg-02',
        name: 'Module Assembly (S5)',
        sopRef: 'SOP-05-01',
        navTarget: 'module_assembly',
        status: 'Hold',
        roles: ['Operator', 'Supervisor'],
        gate: {
          type: 'Validation',
          condition: 'All Station Checks OK.',
          evidence: 'Station Cycle Logs',
          owner: 'Supervisor',
          status: 'Locked',
          impact: 'Modules blocked from QA.'
        },
        exception: {
          type: 'Gate Block',
          description: 'Enclosure Seal Check Failed (Interlock)'
        }
      },
      {
        id: 'mfg-03',
        name: 'Module QA (S6)',
        sopRef: 'SOP-06-01',
        navTarget: 'module_qa',
        status: 'Pending',
        roles: ['QC Engineer'],
        gate: {
          type: 'Approval',
          condition: 'Electrical & Visual Specs Met.',
          evidence: 'QA Pass Report',
          owner: 'Quality Lead',
          status: 'Locked',
          impact: 'Cannot proceed to Pack Assembly.'
        }
      },
      {
        id: 'mfg-04',
        name: 'Pack Assembly (S7)',
        sopRef: 'SOP-07-01',
        navTarget: 'pack_assembly',
        status: 'Pending',
        roles: ['Operator'],
        gate: {
          type: 'Validation',
          condition: 'Enclosure Seal Integrity Pass.',
          evidence: 'Leak Test Data',
          owner: 'Supervisor',
          status: 'Locked',
          impact: 'Pack cannot enter Final Review.'
        }
      },
      {
        id: 'mfg-05',
        name: 'Pack Review (S8)',
        sopRef: 'SOP-08-01',
        navTarget: 'pack_review',
        status: 'Pending',
        roles: ['Quality Lead'],
        gate: {
          type: 'Approval',
          condition: 'EOL Tests (Hi-Pot) Passed.',
          evidence: 'Digital Passport Seal',
          owner: 'Quality Manager',
          status: 'Locked',
          impact: 'Goods cannot enter finished stock.'
        }
      }
    ]
  },
  'dispatch': {
    id: 'dispatch',
    title: 'Dispatch & Custody Chain',
    range: 'S11 → S14',
    purpose: 'Packing, gate pass generation, custody transfer, and logistics handover.',
    status: 'Healthy',
    stages: [
      {
        id: 'dsp-01',
        name: 'Finished Goods (S11)',
        sopRef: 'SOP-11-01',
        navTarget: 'finished_goods',
        status: 'Completed',
        roles: ['Stores'],
        gate: {
          type: 'Interlock',
          condition: 'Goods in "Available" State.',
          evidence: 'Stock Status',
          owner: 'System',
          status: 'Open',
          impact: 'Cannot reserve for order.'
        }
      },
      {
        id: 'dsp-02',
        name: 'Packaging (S12)',
        sopRef: 'SOP-12-01',
        navTarget: 'packaging_aggregation',
        status: 'Completed',
        roles: ['Logistics'],
        gate: {
          type: 'Validation',
          condition: 'Weight Check & Label Match.',
          evidence: 'Manifest ID',
          owner: 'Supervisor',
          status: 'Open',
          impact: 'Cannot authorize dispatch.'
        }
      },
      {
        id: 'dsp-03',
        name: 'Authorization (S13)',
        sopRef: 'SOP-13-01',
        navTarget: 'dispatch_authorization',
        status: 'In Progress',
        roles: ['Logistics Mgr'],
        gate: {
          type: 'Approval',
          condition: 'Credit Limit & Compliance Check.',
          evidence: 'Gate Pass Token',
          owner: 'Finance / Logistics',
          status: 'Closed',
          impact: 'Security will deny exit.'
        }
      },
      {
        id: 'dsp-04',
        name: 'Execution (S14)',
        sopRef: 'SOP-14-01',
        navTarget: 'dispatch_execution',
        status: 'Pending',
        roles: ['Security', 'Transporter'],
        gate: {
          type: 'Validation',
          condition: 'Driver ID & Vehicle Match.',
          evidence: 'Digital Signature',
          owner: 'Security Officer',
          status: 'Locked',
          impact: 'Custody transfer fails.'
        },
        exception: {
          type: 'Custody Mismatch',
          description: 'Driver ID Check Failed'
        }
      }
    ]
  },
  'warranty': {
    id: 'warranty',
    title: 'Warranty Lifecycle Management',
    range: 'S15 → S16',
    purpose: 'Service intake, RCA, warranty adjudication, and recovery routing.',
    status: 'Idle',
    stages: [
      {
        id: 'wty-01',
        name: 'Service Intake (S15)',
        sopRef: 'SOP-15-01',
        navTarget: 'service_warranty',
        status: 'Pending',
        roles: ['Service Eng'],
        gate: {
          type: 'Validation',
          condition: 'Valid Serial & Warranty Period.',
          evidence: 'Warranty Lookup',
          owner: 'System',
          status: 'Locked',
          impact: 'Claim rejected automatically.'
        }
      },
      {
        id: 'wty-02',
        name: 'Triage & RCA',
        sopRef: 'SOP-15-02',
        navTarget: 'service_warranty',
        status: 'Pending',
        roles: ['Service Eng'],
        gate: {
          type: 'Approval',
          condition: 'Root Cause Determined.',
          evidence: 'RCA Report',
          owner: 'Technical Lead',
          status: 'Locked',
          impact: 'Cannot propose resolution.'
        }
      },
      {
        id: 'wty-03',
        name: 'Recovery Routing (S16)',
        sopRef: 'SOP-16-01',
        navTarget: 'recycling_recovery',
        status: 'Pending',
        roles: ['Sustainability'],
        gate: {
          type: 'Validation',
          condition: 'Safety Check for Transport.',
          evidence: 'Hazmat Declaration',
          owner: 'Safety Officer',
          status: 'Locked',
          impact: 'Cannot ship to recycler.'
        }
      }
    ]
  }
};

export const RunbookDetail: React.FC<RunbookDetailProps> = ({ runbookId, onNavigate }) => {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  // Fallback if invalid ID
  if (!runbookId || !RUNBOOKS[runbookId]) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <AlertOctagon size={48} className="mb-4 text-slate-300" />
        <h2 className="text-xl font-bold">Runbook Not Found</h2>
        <button 
          onClick={() => onNavigate('control_tower')}
          className="mt-4 text-brand-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Return to Control Tower
        </button>
      </div>
    );
  }

  const runbook = RUNBOOKS[runbookId];
  
  // Default to first stage if none selected
  const activeStage = selectedStageId 
    ? runbook.stages.find(s => s.id === selectedStageId) 
    : runbook.stages[0];

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="shrink-0 pb-4 border-b border-slate-200">
        <button 
          onClick={() => onNavigate('control_tower')}
          className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2 transition-colors"
        >
          <ArrowLeft size={12} /> Control Tower
        </button>
        <div className="flex justify-between items-start">
          <div>
             <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
               <Radar className="text-brand-600" size={24} />
               {runbook.title}
             </h1>
             <div className="flex items-center gap-3 mt-1 text-sm">
                <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 text-xs">
                  {runbook.range}
                </span>
                <span className="text-slate-500">{runbook.purpose}</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                runbook.status === 'Healthy' ? 'bg-green-100 text-green-700 border-green-200' :
                runbook.status === 'Blocked' ? 'bg-red-100 text-red-700 border-red-200' :
                'bg-slate-100 text-slate-500 border-slate-200'
             }`}>
                STATUS: {runbook.status}
             </div>
             <div className="bg-slate-800 text-slate-300 px-3 py-1 rounded text-xs font-medium border border-slate-700">
                Operational View — No Actions
             </div>
          </div>
        </div>
      </div>

      {/* Main Content: Split View */}
      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0 overflow-hidden">
        
        {/* Left: Stage Spine */}
        <div className="col-span-7 overflow-y-auto pr-4 custom-scrollbar">
           <div className="relative pl-8 py-4">
              {/* Vertical Line */}
              <div className="absolute left-[29px] top-0 bottom-0 w-0.5 bg-slate-200 -z-10"></div>

              {runbook.stages.map((stage, idx) => (
                <div key={stage.id} className="mb-8 last:mb-0">
                   
                   {/* Stage Node */}
                   <div 
                      onClick={() => setSelectedStageId(stage.id)}
                      className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        (activeStage?.id === stage.id) 
                          ? 'bg-white border-brand-500 shadow-md translate-x-1' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      } ${stage.exception ? 'border-red-300 bg-red-50 hover:bg-red-100' : ''}`}
                   >
                      {/* Connector Dot */}
                      <div className={`absolute -left-[23px] w-6 h-6 rounded-full border-4 border-slate-50 flex items-center justify-center ${
                         stage.status === 'Completed' ? 'bg-green-500' :
                         stage.status === 'In Progress' ? 'bg-blue-500' :
                         stage.exception ? 'bg-red-500' :
                         'bg-slate-300'
                      }`}>
                         {stage.status === 'Completed' && <CheckCircle2 size={12} className="text-white" />}
                         {stage.exception && <AlertTriangle size={12} className="text-white" />}
                      </div>

                      <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                            <h3 className={`font-bold ${activeStage?.id === stage.id ? 'text-brand-700' : 'text-slate-700'}`}>
                              {stage.name}
                            </h3>
                            <div className="flex gap-2">
                                {stage.exception && (
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                                        <AlertOctagon size={10} /> Exception
                                    </span>
                                )}
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                   stage.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                   stage.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                                   stage.status === 'Hold' ? 'bg-red-50 text-red-700' :
                                   'bg-slate-100 text-slate-500'
                                }`}>
                                   {stage.status}
                                </span>
                            </div>
                         </div>
                         <div className="text-xs text-slate-500 flex gap-2">
                            <span>{stage.sopRef}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><User size={10} /> {stage.roles.join(', ')}</span>
                         </div>
                      </div>
                      
                      <div className="ml-4">
                         <ChevronRight size={16} className="text-slate-300" />
                      </div>
                   </div>

                   {/* Gate Node (if exists and not last) */}
                   {stage.gate && (
                      <div className="my-4 flex items-center pl-8">
                         <div className="w-8 h-8 rotate-45 border-2 bg-white flex items-center justify-center shadow-sm z-10 relative -left-[36px] group cursor-help" title="Decision Gate">
                            <div className={`w-3 h-3 rounded-full ${
                               stage.gate.status === 'Open' ? 'bg-green-500' : 
                               stage.gate.status === 'Closed' ? 'bg-slate-300' : 'bg-red-500'
                            }`}></div>
                         </div>
                         <div className="ml-[-10px] bg-slate-50 border border-slate-200 px-3 py-2 rounded text-xs text-slate-500 flex-1 flex justify-between items-center">
                            <span className="font-mono uppercase font-bold text-[10px] text-slate-400">GATE: {stage.gate.type}</span>
                            <span className={`font-bold ${
                                stage.gate.status === 'Open' ? 'text-green-600' :
                                stage.gate.status === 'Locked' ? 'text-red-600' : 'text-slate-600'
                            }`}>{stage.gate.status}</span>
                         </div>
                      </div>
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* Right: Context Panel */}
        <div className="col-span-5 bg-slate-50 border-l border-slate-200 p-6 flex flex-col overflow-y-auto">
           {activeStage ? (
             <>
               <div className="mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Selected Stage Context</div>
                  <h2 className="text-xl font-bold text-slate-800 mb-1">{activeStage.name}</h2>
                  <p className="text-sm text-slate-500 font-mono">{activeStage.sopRef}</p>
               </div>

               {/* Exception Context if present */}
               {activeStage.exception && (
                   <div className="bg-red-50 rounded-lg border border-red-200 p-4 mb-6 shadow-sm">
                       <div className="flex items-center gap-2 mb-2 text-red-700">
                           <AlertOctagon size={18} />
                           <h3 className="font-bold text-sm">Active Exception</h3>
                       </div>
                       <p className="text-sm text-red-800 font-medium mb-1">{activeStage.exception.type}</p>
                       <p className="text-xs text-red-600">{activeStage.exception.description}</p>
                   </div>
               )}

               {/* Gate Details */}
               {activeStage.gate && (
                 <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                       <ShieldCheck size={16} className="text-brand-600" />
                       <h3 className="font-bold text-sm text-slate-700">Gate Requirements</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                       <div>
                          <div className="text-xs text-slate-400 mb-0.5">Condition</div>
                          <div className="font-medium text-slate-800">{activeStage.gate.condition}</div>
                       </div>
                       <div>
                          <div className="text-xs text-slate-400 mb-0.5">Required Evidence</div>
                          <div className="font-medium text-slate-800">{activeStage.gate.evidence}</div>
                       </div>
                       <div className="flex justify-between">
                          <div>
                             <div className="text-xs text-slate-400 mb-0.5">Owner</div>
                             <div className="font-medium text-slate-800">{activeStage.gate.owner}</div>
                          </div>
                          <div className="text-right">
                             <div className="text-xs text-slate-400 mb-0.5">Impact</div>
                             <div className="font-medium text-red-600 text-xs">{activeStage.gate.impact}</div>
                          </div>
                       </div>
                    </div>
                    <div className="mt-3 p-2 bg-slate-50 rounded text-[10px] text-slate-400 flex items-start gap-1">
                       <Info size={12} className="shrink-0 mt-0.5" />
                       Gate enforcement logic is handled by the backend BPM engine. Frontend reflects state only.
                    </div>
                 </div>
               )}

               {/* Roles */}
               <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Roles Involved</h3>
                  <div className="flex flex-wrap gap-2">
                     {activeStage.roles.map(role => (
                        <span key={role} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 flex items-center gap-1">
                           <User size={12} /> {role}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Action / Nav */}
               <div className="mt-auto">
                  <button 
                    onClick={() => onNavigate(activeStage.navTarget)}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                     <span>Go to Operational Screen</span>
                     <ExternalLink size={16} />
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2">
                     Navigates to the functional SOP screen for this stage.
                  </p>
               </div>
             </>
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Layers size={48} className="mb-2 opacity-20" />
                <p>Select a stage to view details</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};