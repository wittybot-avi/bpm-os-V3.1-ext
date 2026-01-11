import React, { useContext } from 'react';
import { UserContext, UserRole } from '../types';
import { 
  Activity, 
  Battery, 
  Factory, 
  Truck, 
  Recycle, 
  Users, 
  Package, 
  Scale, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { role } = useContext(UserContext);
  const isAuditor = role === UserRole.MANAGEMENT;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System Overview
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Activity className="text-brand-600" size={24} />
             System Dashboard
           </h1>
           <p className="text-slate-500 text-sm mt-1">High-level visibility into manufacturing, assets, and lifecycle custody.</p>
        </div>
        
        {isAuditor ? (
          <div className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded text-xs font-bold border border-slate-300 uppercase flex items-center gap-2">
            <ShieldCheck size={14} />
            Auditor / Regulator – Read-Only View
          </div>
        ) : (
          <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold border border-slate-200 uppercase">
            Read-Only View
          </div>
        )}
      </div>

      {/* A1: Manufacturing Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Batches Planned</span>
                <Layers size={16} className="text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800">12</div>
            <div className="text-xs text-slate-400 mt-1">Production Runs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Manufactured</span>
                <Factory size={16} className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">1,240</div>
            <div className="text-xs text-slate-400 mt-1">Total Packs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Approved</span>
                <CheckCircle2 size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">1,180</div>
            <div className="text-xs text-green-600 mt-1">95.1% Yield</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">On Hold</span>
                <AlertTriangle size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800">15</div>
            <div className="text-xs text-amber-600 mt-1">Requires Review</div>
        </div>
      </div>

      {/* A2 & A3 Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* A2: Asset Trackability Snapshot */}
        <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <Battery size={18} className="text-brand-600" />
                    Asset Trackability
                </h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                    <div className="text-sm text-slate-500 mb-1">Total System Assets</div>
                    <div className="text-3xl font-bold text-slate-900">1,500</div>
                    <div className="text-xs text-slate-400 mt-1">Unique Digital IDs</div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Factory size={14} /> Manufacturing</span>
                        <span className="font-mono font-bold">125</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Truck size={14} /> Field Deployed</span>
                        <span className="font-mono font-bold">850</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Recycle size={14} /> End-of-Life</span>
                        <span className="font-mono font-bold">15</span>
                    </div>
                </div>
            </div>
        </div>

        {/* A3: Custody & Lifecycle */}
        <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <Users size={18} className="text-brand-600" />
                    Custody & Lifecycle
                </h3>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded border border-slate-200 text-slate-500"><Package size={16} /></div>
                            <span className="text-sm font-medium text-slate-700">Warehouse Storage</span>
                        </div>
                        <span className="font-bold text-slate-800">450 Units</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded border border-slate-200 text-slate-500"><Truck size={16} /></div>
                            <span className="text-sm font-medium text-slate-700">In Transit (Logistics)</span>
                        </div>
                        <span className="font-bold text-slate-800">60 Units</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded border border-slate-200 text-slate-500"><Users size={16} /></div>
                            <span className="text-sm font-medium text-slate-700">Customer Fleet</span>
                        </div>
                        <span className="font-bold text-slate-800">790 Units</span>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* A4: Material Lifecycle */}
      <div className="bg-white rounded-lg shadow-sm border border-industrial-border flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <Scale size={18} className="text-brand-600" />
                  Material Lifecycle
              </h3>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">EPR Tracking</span>
          </div>
          <div className="p-6 grid grid-cols-3 gap-8 text-center divide-x divide-slate-100">
              <div>
                  <div className="text-xs uppercase font-bold text-slate-400 mb-1">Total Mass in System</div>
                  <div className="text-2xl font-mono font-bold text-slate-800">~28,000 kg</div>
                  <div className="text-xs text-slate-400 mt-1">Aggregated Weight</div>
              </div>
              <div>
                  <div className="text-xs uppercase font-bold text-slate-400 mb-1">EPR Relevant Units</div>
                  <div className="text-2xl font-mono font-bold text-slate-800">1,240</div>
                  <div className="text-xs text-slate-400 mt-1">Registered for Recovery</div>
              </div>
              <div>
                  <div className="text-xs uppercase font-bold text-slate-400 mb-1">Eligible for Recycling</div>
                  <div className="text-2xl font-mono font-bold text-slate-800">~450 kg</div>
                  <div className="text-xs text-slate-400 mt-1">Current Backlog</div>
              </div>
          </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-xs text-slate-400 py-4">
          System Dashboard — Demo / Placeholder Data for V3.1
      </div>

    </div>
  );
};