import React from 'react';
import { Layers, Activity, Zap, Wrench, AlertCircle, Info, CheckCircle2, PauseCircle, StopCircle, BarChart3 } from 'lucide-react';

interface Station {
  name: string;
  state: 'Ready' | 'Running' | 'Blocked' | 'Idle';
}

interface LineData {
  id: string;
  name: string;
  type: string;
  status: 'Running' | 'Maintenance' | 'Blocked';
  oee: {
    availability: string;
    performance: string;
    quality: string;
  };
  stations: Station[];
}

const LINES: LineData[] = [
  {
    id: 'line-a',
    name: 'Line A (Modules)',
    type: 'Automated Assembly',
    status: 'Running',
    oee: {
      availability: '94%',
      performance: '88%',
      quality: '99%'
    },
    stations: [
      { name: 'Cell Load', state: 'Running' },
      { name: 'OCV Test', state: 'Running' },
      { name: 'Stacking', state: 'Blocked' },
      { name: 'Busbar Weld', state: 'Idle' },
      { name: 'Visual QA', state: 'Ready' }
    ]
  },
  {
    id: 'line-b',
    name: 'Line B (High Voltage)',
    type: 'Manual Assembly',
    status: 'Maintenance',
    oee: {
      availability: '-- %',
      performance: '-- %',
      quality: '-- %'
    },
    stations: [
      { name: 'HV Prep', state: 'Idle' },
      { name: 'Harnessing', state: 'Idle' },
      { name: 'Enclosure', state: 'Idle' },
      { name: 'Testing', state: 'Idle' }
    ]
  },
  {
    id: 'line-pack',
    name: 'Pack Assembly Line',
    type: 'Final Integration',
    status: 'Running',
    oee: {
      availability: '98%',
      performance: '92%',
      quality: '100%'
    },
    stations: [
      { name: 'Module Insert', state: 'Running' },
      { name: 'BMS Mount', state: 'Running' },
      { name: 'Thermal', state: 'Running' },
      { name: 'Sealing', state: 'Running' },
      { name: 'EOL Test', state: 'Ready' }
    ]
  }
];

const StationBadge: React.FC<{ state: Station['state'] }> = ({ state }) => {
  const styles = {
    'Running': 'bg-green-100 text-green-700 border-green-200',
    'Ready': 'bg-blue-50 text-blue-600 border-blue-200',
    'Blocked': 'bg-red-100 text-red-700 border-red-200',
    'Idle': 'bg-slate-100 text-slate-500 border-slate-200'
  };

  const icons = {
    'Running': <Activity size={10} className="animate-pulse" />,
    'Ready': <CheckCircle2 size={10} />,
    'Blocked': <StopCircle size={10} />,
    'Idle': <PauseCircle size={10} />
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded border flex items-center gap-1 font-bold uppercase ${styles[state]}`}>
      {icons[state]}
      {state}
    </span>
  );
};

export const ProductionLine: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System <span className="text-slate-300">/</span> Manufacturing
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Layers className="text-brand-600" size={24} />
             Production Line Visibility
           </h1>
           <p className="text-slate-500 text-sm mt-1">OEE structural definition and station readiness map.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded text-xs font-bold border border-slate-200">
           <Info size={14} />
           <span>Visual Contract Only (No Logic)</span>
        </div>
      </div>

      {/* OEE Summary Strip */}
      <div className="grid grid-cols-4 gap-4">
         <div className="bg-slate-800 text-white p-4 rounded-lg shadow-sm border border-slate-700">
            <div className="text-xs text-slate-400 uppercase font-bold mb-1">OEE Overall (Target)</div>
            <div className="text-2xl font-mono font-bold text-emerald-400">85.0%</div>
            <div className="text-[10px] text-slate-500 mt-1">Placeholder / Mock</div>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Lines Running</div>
            <div className="text-2xl font-bold text-slate-800">2</div>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Lines Blocked</div>
            <div className="text-2xl font-bold text-slate-800">0</div>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Maintenance</div>
            <div className="text-2xl font-bold text-slate-800">1</div>
         </div>
      </div>

      {/* Line Cards */}
      <div className="grid grid-cols-1 gap-6">
         {LINES.map((line) => (
            <div key={line.id} className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden">
               
               {/* Line Header */}
               <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded ${
                        line.status === 'Running' ? 'bg-green-100 text-green-700' :
                        line.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                     }`}>
                        <Layers size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-800">{line.name}</h3>
                        <p className="text-xs text-slate-500">{line.type}</p>
                     </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                        line.status === 'Running' ? 'bg-green-100 text-green-700' :
                        line.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                  }`}>
                     {line.status}
                  </span>
               </div>

               <div className="p-6 grid grid-cols-12 gap-8">
                  
                  {/* OEE Zones */}
                  <div className="col-span-5 border-r border-slate-100 pr-8">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <BarChart3 size={14} />
                        OEE Components (Backend Computed)
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-slate-50 rounded border border-slate-100 text-center">
                           <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Availability</div>
                           <div className="text-xl font-bold text-slate-800">{line.oee.availability}</div>
                           <div className="text-[10px] text-slate-400 mt-1 leading-tight">Uptime vs Planned</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-slate-100 text-center">
                           <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Performance</div>
                           <div className="text-xl font-bold text-slate-800">{line.oee.performance}</div>
                           <div className="text-[10px] text-slate-400 mt-1 leading-tight">Actual vs Ideal</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-slate-100 text-center">
                           <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Quality</div>
                           <div className="text-xl font-bold text-slate-800">{line.oee.quality}</div>
                           <div className="text-[10px] text-slate-400 mt-1 leading-tight">Good vs Total</div>
                        </div>
                     </div>
                  </div>

                  {/* Station Readiness */}
                  <div className="col-span-7">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Activity size={14} />
                        Station Readiness (Visual)
                     </div>
                     <div className="flex flex-wrap gap-3 items-center">
                        {/* Line Start Node */}
                        <div className="h-2 w-2 bg-slate-300 rounded-full"></div>
                        
                        {line.stations.map((station, idx) => (
                           <React.Fragment key={idx}>
                              <div className="flex flex-col gap-1 items-center">
                                 <StationBadge state={station.state} />
                                 <span className="text-[10px] text-slate-500 font-medium">{station.name}</span>
                              </div>
                              {idx !== line.stations.length - 1 && (
                                 <div className="h-px w-8 bg-slate-200 mb-4"></div>
                              )}
                           </React.Fragment>
                        ))}

                        {/* Line End Node */}
                        <div className="h-2 w-2 bg-slate-300 rounded-full ml-auto"></div>
                     </div>
                  </div>

               </div>
            </div>
         ))}
      </div>

      <div className="text-center text-slate-400 text-sm italic mt-8">
         Control actions (Start/Stop/Emergency Halt) are disabled. Metrics are mocked for UI verification.
      </div>

    </div>
  );
};