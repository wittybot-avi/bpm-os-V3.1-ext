import React from 'react';
import { Layers, Activity, Zap, Wrench, AlertCircle } from 'lucide-react';

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
           <p className="text-slate-500 text-sm mt-1">Line status monitoring and utilization metrics.</p>
        </div>
      </div>

      {/* Line Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* Line A */}
         <div className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-700">Line A (Modules)</h3>
               <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">Running</span>
            </div>
            <div className="p-6">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-50 rounded-full text-brand-600">
                     <Zap size={24} />
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-slate-800">85%</div>
                     <div className="text-xs text-slate-500">Utilization</div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Current Stage</span>
                     <span className="font-medium text-slate-800">Cell Loading</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Bottleneck</span>
                     <span className="font-medium text-slate-400">None</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Line B */}
         <div className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-700">Line B (High Voltage)</h3>
               <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold uppercase">Maintenance</span>
            </div>
            <div className="p-6 opacity-75">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                     <Wrench size={24} />
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-slate-800">0%</div>
                     <div className="text-xs text-slate-500">Utilization</div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Current Stage</span>
                     <span className="font-medium text-slate-800">Scheduled Service</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Bottleneck</span>
                     <span className="font-medium text-slate-400">Technician Assigned</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Pack Line */}
         <div className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-700">Pack Assembly Line</h3>
               <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">Running</span>
            </div>
            <div className="p-6">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-50 rounded-full text-brand-600">
                     <Activity size={24} />
                  </div>
                  <div>
                     <div className="text-2xl font-bold text-slate-800">92%</div>
                     <div className="text-xs text-slate-500">Utilization</div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Current Stage</span>
                     <span className="font-medium text-slate-800">Enclosure Sealing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Bottleneck</span>
                     <span className="font-medium text-amber-600 flex items-center gap-1">
                        <AlertCircle size={12} /> Label Printing
                     </span>
                  </div>
               </div>
            </div>
         </div>

      </div>

      <div className="text-center text-slate-400 text-sm italic mt-8">
         Control actions (Start/Stop/Emergency Halt) are disabled in this view.
      </div>

    </div>
  );
};