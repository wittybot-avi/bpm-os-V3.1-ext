import React from 'react';
import { Activity, Server, Zap, AlertTriangle, PlayCircle } from 'lucide-react';

export const LiveStatus: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System <span className="text-slate-300">/</span> Monitoring
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Activity className="text-brand-600" size={24} />
             Live Status
           </h1>
           <p className="text-slate-500 text-sm mt-1">Real-time system health and operational heartbeat.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs font-bold border border-blue-200 uppercase">
          Frontend Demo / Mocked Data
        </div>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-industrial-border flex flex-col items-center text-center">
            <div className="p-3 bg-green-50 rounded-full mb-3">
               <PlayCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-600 uppercase">Active Runs</h3>
            <div className="text-3xl font-bold text-slate-900 mt-2">3</div>
            <p className="text-xs text-slate-400 mt-1">Batch Execution in Progress</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-industrial-border flex flex-col items-center text-center">
            <div className="p-3 bg-blue-50 rounded-full mb-3">
               <Server size={32} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-600 uppercase">Stations Online</h3>
            <div className="text-3xl font-bold text-slate-900 mt-2">12 / 14</div>
            <p className="text-xs text-slate-400 mt-1">Workstation Connectivity</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-industrial-border flex flex-col items-center text-center">
            <div className="p-3 bg-purple-50 rounded-full mb-3">
               <Zap size={32} className="text-purple-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-600 uppercase">Packs In-Progress</h3>
            <div className="text-3xl font-bold text-slate-900 mt-2">45</div>
            <p className="text-xs text-slate-400 mt-1">WIP Inventory</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-industrial-border flex flex-col items-center text-center">
            <div className="p-3 bg-amber-50 rounded-full mb-3">
               <AlertTriangle size={32} className="text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-600 uppercase">Active Alerts</h3>
            <div className="text-3xl font-bold text-slate-900 mt-2">2</div>
            <p className="text-xs text-slate-400 mt-1">Requires Attention</p>
        </div>

      </div>

      {/* Backend Note */}
      <div className="flex-1 flex items-center justify-center">
         <div className="text-center max-w-md p-8 border-2 border-dashed border-slate-200 rounded-lg">
            <Activity className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700">Live Telemetry Stream</h3>
            <p className="text-slate-500 text-sm mt-2">
               This dashboard will consume the Websocket API <code>/ws/v1/system/telemetry</code> in the production environment.
               Current data is static for demonstration purposes.
            </p>
         </div>
      </div>

    </div>
  );
};