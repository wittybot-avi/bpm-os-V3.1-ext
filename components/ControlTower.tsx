import React from 'react';
import { 
  Radar, 
  PlayCircle, 
  AlertOctagon, 
  AlertTriangle, 
  Activity, 
  ArrowRight,
  User,
  CheckCircle2,
  Lock,
  PauseCircle,
  Truck,
  Box,
  Layers,
  Zap,
  RotateCcw
} from 'lucide-react';

interface RunbookProps {
  id: string;
  title: string;
  range: string;
  purpose: string;
  roles: string[];
  status: 'Healthy' | 'Degraded' | 'Blocked' | 'Idle';
  onNavigate: (id: string) => void;
  children: React.ReactNode;
}

const RunbookCard: React.FC<RunbookProps> = ({ id, title, range, purpose, roles, status, onNavigate, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden flex flex-col hover:shadow-md transition-shadow">
    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500">{range}</span>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
            status === 'Healthy' ? 'bg-green-100 text-green-700' :
            status === 'Degraded' ? 'bg-amber-100 text-amber-700' :
            status === 'Blocked' ? 'bg-red-100 text-red-700' :
            'bg-slate-100 text-slate-500'
          }`}>
            {status}
          </span>
        </div>
      </div>
      <button 
        onClick={() => onNavigate(id)}
        className="text-brand-600 hover:text-brand-800 transition-colors p-1 bg-brand-50 rounded border border-brand-100"
        title="View Runbook Detail"
      >
        <ArrowRight size={20} />
      </button>
    </div>
    
    <div className="p-4 bg-white border-b border-slate-50">
      <p className="text-xs text-slate-500">{purpose}</p>
    </div>

    <div className="flex-1 p-6 flex flex-col justify-center cursor-pointer" onClick={() => onNavigate(id)}>
        {/* Visualization Spine */}
        {children}
    </div>

    <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
      {roles.map((role, idx) => (
        <span key={idx} className="flex items-center gap-1 text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-full">
          <User size={10} /> {role}
        </span>
      ))}
    </div>
  </div>
);

const StageNode: React.FC<{ label: string; icon: React.ElementType; status: 'Done' | 'Active' | 'Pending' | 'Hold' }> = ({ label, icon: Icon, status }) => (
  <div className="flex flex-col items-center gap-2 z-10 w-24">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm ${
      status === 'Done' ? 'bg-green-50 border-green-500 text-green-600' :
      status === 'Active' ? 'bg-blue-50 border-blue-500 text-blue-600' :
      status === 'Hold' ? 'bg-red-50 border-red-500 text-red-600' :
      'bg-slate-50 border-slate-300 text-slate-300'
    }`}>
      <Icon size={18} />
    </div>
    <span className={`text-[10px] font-bold text-center leading-tight ${
      status === 'Pending' ? 'text-slate-400' : 'text-slate-700'
    }`}>
      {label}
    </span>
  </div>
);

const GateNode: React.FC<{ status: 'Open' | 'Closed' | 'Locked' }> = ({ status }) => (
  <div className="flex items-center justify-center w-8 -mx-2 z-0">
    <div className={`h-0.5 w-full ${status === 'Locked' ? 'bg-slate-200' : 'bg-slate-300'}`}></div>
    <div className={`absolute w-5 h-5 rotate-45 border-2 flex items-center justify-center bg-white ${
      status === 'Open' ? 'border-green-500' : 
      status === 'Closed' ? 'border-slate-300' : 
      'border-red-500'
    }`}>
        {status === 'Open' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
        {status === 'Locked' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
    </div>
  </div>
);

interface ControlTowerProps {
  onNavigate: (runbookId: string) => void;
}

export const ControlTower: React.FC<ControlTowerProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              Govern <span className="text-slate-300">/</span> Orchestration
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Radar className="text-brand-600" size={24} />
             Control Tower
           </h1>
           <p className="text-slate-500 text-sm mt-1">Operational visibility and orchestration across plant workflows.</p>
        </div>
        <div className="bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-bold border border-slate-700 uppercase flex items-center gap-2 shadow-sm">
          <Activity size={14} className="text-green-400" />
          <span>Operational Spine Active</span>
        </div>
      </div>

      {/* Metadata Strip */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-3 rounded-lg border border-industrial-border shadow-sm flex items-center justify-between">
           <div>
              <div className="text-xs text-slate-500 uppercase font-bold">Active Runs</div>
              <div className="text-2xl font-bold text-slate-800">8</div>
           </div>
           <PlayCircle className="text-green-500" size={24} />
        </div>
        <div className="bg-white p-3 rounded-lg border border-industrial-border shadow-sm flex items-center justify-between">
           <div>
              <div className="text-xs text-slate-500 uppercase font-bold">Blocked Gates</div>
              <div className="text-2xl font-bold text-slate-800">2</div>
           </div>
           <AlertOctagon className="text-red-500" size={24} />
        </div>
        <div className="bg-white p-3 rounded-lg border border-industrial-border shadow-sm flex items-center justify-between">
           <div>
              <div className="text-xs text-slate-500 uppercase font-bold">Exceptions</div>
              <div className="text-2xl font-bold text-slate-800">5</div>
           </div>
           <AlertTriangle className="text-amber-500" size={24} />
        </div>
        <div className="bg-white p-3 rounded-lg border border-industrial-border shadow-sm flex items-center justify-between">
           <div>
              <div className="text-xs text-slate-500 uppercase font-bold">System Health</div>
              <div className="text-2xl font-bold text-slate-800">99.9%</div>
           </div>
           <Activity className="text-blue-500" size={24} />
        </div>
      </div>

      {/* Operational Runbooks */}
      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0 overflow-y-auto pb-4">
        
        {/* A) Material Receipt & Serialization */}
        <RunbookCard 
          id="material"
          title="Material Receipt & Serialization" 
          range="S2 → S4" 
          purpose="Inbound verification, QC, identity generation, and ledger binding."
          roles={['Stores', 'QC Engineer', 'System']}
          status="Healthy"
          onNavigate={onNavigate}
        >
           <div className="flex items-center justify-between px-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
              <StageNode label="Inbound" icon={Truck} status="Done" />
              <GateNode status="Open" />
              <StageNode label="QC Check" icon={CheckCircle2} status="Active" />
              <GateNode status="Closed" />
              <StageNode label="Serialize" icon={Layers} status="Pending" />
              <GateNode status="Locked" />
              <StageNode label="Bind" icon={Lock} status="Pending" />
           </div>
        </RunbookCard>

        {/* B) Manufacturing Execution */}
        <RunbookCard 
          id="manufacturing"
          title="Manufacturing Execution Run" 
          range="S4 → S8" 
          purpose="Batch planning, assembly execution, QA validation, and release."
          roles={['Planner', 'Operator', 'QA Lead']}
          status="Blocked"
          onNavigate={onNavigate}
        >
           <div className="flex items-center justify-between px-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
              <StageNode label="Plan" icon={Layers} status="Done" />
              <GateNode status="Open" />
              <StageNode label="Assembly" icon={Zap} status="Hold" />
              <GateNode status="Locked" />
              <StageNode label="QA" icon={Activity} status="Pending" />
              <GateNode status="Locked" />
              <StageNode label="Release" icon={CheckCircle2} status="Pending" />
           </div>
        </RunbookCard>

        {/* C) Dispatch & Custody Chain */}
        <RunbookCard 
          id="dispatch"
          title="Dispatch & Custody Chain" 
          range="S11 → S14" 
          purpose="Packing, gate pass generation, custody transfer, and logistics handover."
          roles={['Logistics', 'Security', 'Transporter']}
          status="Healthy"
          onNavigate={onNavigate}
        >
           <div className="flex items-center justify-between px-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
              <StageNode label="Pick" icon={Box} status="Done" />
              <GateNode status="Open" />
              <StageNode label="Pack" icon={Layers} status="Done" />
              <GateNode status="Open" />
              <StageNode label="Auth" icon={Lock} status="Active" />
              <GateNode status="Closed" />
              <StageNode label="Handover" icon={Truck} status="Pending" />
           </div>
        </RunbookCard>

        {/* D) Warranty Lifecycle Management */}
        <RunbookCard 
          id="warranty"
          title="Warranty Lifecycle Management" 
          range="S15 → S16" 
          purpose="Service intake, RCA, warranty adjudication, and recovery routing."
          roles={['Service Eng', 'Sustainability', 'Customer']}
          status="Idle"
          onNavigate={onNavigate}
        >
           <div className="flex items-center justify-between px-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
              <StageNode label="Intake" icon={RotateCcw} status="Pending" />
              <GateNode status="Locked" />
              <StageNode label="Triage" icon={Activity} status="Pending" />
              <GateNode status="Locked" />
              <StageNode label="Action" icon={Zap} status="Pending" />
              <GateNode status="Locked" />
              <StageNode label="Close" icon={CheckCircle2} status="Pending" />
           </div>
        </RunbookCard>

      </div>

      <div className="text-center text-xs text-slate-400">
         Frontend Demo • Operations Control Layer • v3.1-EXT
      </div>

    </div>
  );
};