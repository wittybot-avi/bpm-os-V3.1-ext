import React from 'react';
import { Box, Layers, Battery, Database } from 'lucide-react';

export const SystemInventory: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System <span className="text-slate-300">/</span> Stock
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Box className="text-brand-600" size={24} />
             System-Level Inventory
           </h1>
           <p className="text-slate-500 text-sm mt-1">Consolidated view of material resources across all lifecycle stages.</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Total Units</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Available</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Reserved / WIP</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Consumed / Shipped</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                     <div className="p-1.5 bg-blue-50 text-blue-600 rounded"><Database size={16} /></div>
                     Raw Cells
                  </td>
                  <td className="px-6 py-4 font-mono">15,000</td>
                  <td className="px-6 py-4 font-mono text-green-600 font-bold">8,500</td>
                  <td className="px-6 py-4 font-mono text-amber-600">6,500</td>
                  <td className="px-6 py-4 font-mono text-slate-400">42,000</td>
               </tr>
               <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                     <div className="p-1.5 bg-purple-50 text-purple-600 rounded"><Layers size={16} /></div>
                     Modules
                  </td>
                  <td className="px-6 py-4 font-mono">350</td>
                  <td className="px-6 py-4 font-mono text-green-600 font-bold">120</td>
                  <td className="px-6 py-4 font-mono text-amber-600">230</td>
                  <td className="px-6 py-4 font-mono text-slate-400">1,800</td>
               </tr>
               <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                     <div className="p-1.5 bg-brand-50 text-brand-600 rounded"><Battery size={16} /></div>
                     Finished Packs
                  </td>
                  <td className="px-6 py-4 font-mono">85</td>
                  <td className="px-6 py-4 font-mono text-green-600 font-bold">45</td>
                  <td className="px-6 py-4 font-mono text-amber-600">40</td>
                  <td className="px-6 py-4 font-mono text-slate-400">450</td>
               </tr>
            </tbody>
         </table>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
         <Database className="text-amber-600 mt-1" size={20} />
         <div>
            <h4 className="text-sm font-bold text-amber-800">Backend Logic Responsibility</h4>
            <p className="text-xs text-amber-700 mt-1">
               Operational inventory logic (FIFO, reservation locking, batch allocation) is handled by the backend BPM engine.
               This view aggregates data from multiple microservices (WMS, MES, ERP).
            </p>
         </div>
      </div>

    </div>
  );
};