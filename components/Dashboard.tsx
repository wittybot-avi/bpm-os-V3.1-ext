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
  ShieldCheck,
  BarChart3,
  PieChart,
  Info,
  AlertOctagon,
  FileBadge
} from 'lucide-react';
import { 
  SimpleLineChart, 
  SimpleBarChart, 
  SimpleDonutChart, 
  GroupedBarChart, 
  ChartCard 
} from './charts/SimpleCharts';
import { 
  TREND_DATA, 
  STAGE_DISTRIBUTION, 
  EXCEPTION_DATA, 
  THROUGHPUT_DATA, 
  CUSTODY_DATA 
} from '../data/dashboardMetrics';

export const Dashboard: React.FC = () => {
  const { role } = useContext(UserContext);
  const isAuditor = role === UserRole.MANAGEMENT || role === UserRole.COMPLIANCE;
  const isOperator = role === UserRole.OPERATOR;
  
  // Logic to show simplified view for operators
  const showFullAnalytics = !isOperator;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System Overview <span className="text-slate-300">/</span> Track
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Activity className="text-brand-600" size={24} />
             System Dashboard
           </h1>
           <p className="text-slate-500 text-sm mt-1">
             Operational tracking and executive snapshot. 
             <span className="text-slate-400 italic ml-2">(Not for Trace/Identity lookup)</span>
           </p>
        </div>
        
        {isAuditor ? (
          <div className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded text-xs font-bold border border-slate-300 uppercase flex items-center gap-2">
            <ShieldCheck size={14} />
            Auditor / Regulator – Read-Only View
          </div>
        ) : (
          <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold border border-slate-200 uppercase">
            Executive Foundation
          </div>
        )}
      </div>

      {/* SECTION 1: EXECUTIVE SNAPSHOT (Cards) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider">
            <Layers size={16} />
            Executive Snapshot (Real-time Track)
        </div>

        {/* Row 1: Manufacturing KPIs */}
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Batches Planned</span>
                    <Clock size={16} className="text-slate-400" />
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

        {/* Row 2: Asset & Material Summary (Consolidated) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Asset Trackability */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-industrial-border flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <Battery size={18} className="text-brand-600" />
                            Asset Trackability
                        </h3>
                        <p className="text-xs text-slate-400">Total System Assets: <span className="font-bold text-slate-600">1,500</span></p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-1">
                        <span className="text-slate-600 flex items-center gap-2"><Factory size={14} /> Manufacturing</span>
                        <span className="font-mono font-bold">125</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-1">
                        <span className="text-slate-600 flex items-center gap-2"><Truck size={14} /> Field Deployed</span>
                        <span className="font-mono font-bold">850</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Recycle size={14} /> End-of-Life</span>
                        <span className="font-mono font-bold">15</span>
                    </div>
                </div>
            </div>

            {/* Custody Snapshot */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-industrial-border flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <Users size={18} className="text-brand-600" />
                            Custody Status
                        </h3>
                        <p className="text-xs text-slate-400">Legal Possession</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-1">
                        <span className="text-slate-600 flex items-center gap-2"><Package size={14} /> Warehouse</span>
                        <span className="font-mono font-bold">450</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-1">
                        <span className="text-slate-600 flex items-center gap-2"><Truck size={14} /> In Transit</span>
                        <span className="font-mono font-bold">60</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Users size={14} /> Customer</span>
                        <span className="font-mono font-bold">790</span>
                    </div>
                </div>
            </div>

            {/* Material Lifecycle */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-industrial-border flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <Scale size={18} className="text-brand-600" />
                            Material Lifecycle
                        </h3>
                        <p className="text-xs text-slate-400">EPR Tracking</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="text-xl font-mono font-bold text-slate-800">28t</div>
                        <div className="text-[10px] text-slate-500 uppercase">System Mass</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="text-xl font-mono font-bold text-slate-800">450kg</div>
                        <div className="text-[10px] text-slate-500 uppercase">Recycling Queue</div>
                    </div>
                </div>
                <div className="mt-2 text-center">
                    <div className="text-xs text-green-600 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 size={12} /> 100% EPR Compliant
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* SECTION 2: OPERATIONAL TRENDS (Graphs) */}
      <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider border-t border-slate-200 pt-6">
            <BarChart3 size={16} />
            Operational Trends
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard title="WIP Output Trend" subtitle="Last 7 Days (Units)">
               <SimpleLineChart data={TREND_DATA} />
            </ChartCard>

            <ChartCard title="Exception Severity" subtitle="Open Issues Count">
               <SimpleBarChart data={EXCEPTION_DATA} />
            </ChartCard>

            <ChartCard title="Line Throughput" subtitle="Plan vs Actual (Units)">
                <GroupedBarChart data={THROUGHPUT_DATA} />
            </ChartCard>
         </div>
      </section>

      {/* SECTION 3: LIFECYCLE & CUSTODY DISTRIBUTION (Graphs) */}
      {showFullAnalytics && (
        <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider border-t border-slate-200 pt-6">
                <PieChart size={16} />
                Lifecycle & Custody Distribution
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard title="Asset Lifecycle Phase" subtitle="Volume by Stage">
                    <SimpleBarChart data={STAGE_DISTRIBUTION} color="#818cf8" />
                </ChartCard>

                <ChartCard title="Custody Distribution" subtitle="Ownership Split">
                    <SimpleDonutChart data={CUSTODY_DATA} height={180} />
                </ChartCard>
            </div>
        </section>
      )}

      {/* SECTION 4: COMPLIANCE & RISK GLANCE */}
      <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider border-t border-slate-200 pt-6">
            <ShieldCheck size={16} />
            Compliance & Risk Signals
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-red-50 border border-red-200 p-3 rounded flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-red-800 uppercase">Open Exceptions</div>
                    <div className="text-xl font-bold text-red-900">5</div>
                </div>
                <AlertOctagon size={24} className="text-red-300" />
             </div>

             <div className="bg-amber-50 border border-amber-200 p-3 rounded flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-amber-800 uppercase">Warranty Claims</div>
                    <div className="text-xl font-bold text-amber-900">3</div>
                </div>
                <AlertTriangle size={24} className="text-amber-300" />
             </div>

             <div className="bg-blue-50 border border-blue-200 p-3 rounded flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-blue-800 uppercase">EU Passports</div>
                    <div className="text-xl font-bold text-blue-900">45</div>
                </div>
                <FileBadge size={24} className="text-blue-300" />
             </div>

             <div className="bg-green-50 border border-green-200 p-3 rounded flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-green-800 uppercase">Regulatory Audit</div>
                    <div className="text-sm font-bold text-green-900">Passed</div>
                </div>
                <CheckCircle2 size={24} className="text-green-300" />
             </div>
         </div>
      </section>

      {/* Footer Info */}
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-50 p-3 rounded border border-slate-100">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>
              <strong>Dashboard Semantics:</strong> This dashboard represents the <strong>TRACK</strong> state (current operational location and status). 
              For immutable history and provenance, consult the <strong>Battery Registry (TRACE)</strong>.
              All data is aggregated from backend microservices.
          </p>
      </div>

    </div>
  );
};