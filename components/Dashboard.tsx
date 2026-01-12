import React, { useContext, useState } from 'react';
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
  FileBadge,
  User,
  MapPin,
  PlayCircle,
  ChevronDown,
  ChevronUp
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

// --- Operator Components ---

const ShiftFocusStrip: React.FC = () => (
  <div className="bg-slate-800 text-white rounded-lg p-4 shadow-md border border-slate-700 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
    <div className="flex items-center gap-6">
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
          <User size={10} /> Active Shift
        </span>
        <div className="text-lg font-bold text-white flex items-center gap-2">
          Line A <span className="text-slate-500">/</span> Station 04
        </div>
      </div>
      
      <div className="w-px h-8 bg-slate-600"></div>

      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
          <Layers size={10} /> Current Runbook
        </span>
        <div className="text-lg font-mono text-brand-400">
          S5: Module Assembly
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
       <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded border border-slate-600">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-300 uppercase">Station Active</span>
       </div>
       <div className="flex items-center gap-2 bg-red-900/30 px-3 py-2 rounded border border-red-900/50">
          <AlertTriangle size={14} className="text-red-400" />
          <span className="text-xs font-bold text-red-200">2 Exceptions</span>
       </div>
    </div>
  </div>
);

const OperatorAttention: React.FC = () => (
  <div className="bg-white rounded-lg border-l-4 border-amber-500 shadow-sm border-y border-r border-industrial-border p-4 animate-in fade-in duration-300">
     <div className="flex items-center gap-2 mb-3">
        <AlertOctagon size={18} className="text-amber-600" />
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Attention Required</h3>
     </div>
     <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-amber-50 rounded border border-amber-100 text-sm">
           <div className="flex items-center gap-2">
              <span className="font-bold text-amber-800">S5 Gate Locked</span>
              <span className="text-amber-700">- Enclosure Seal Integrity Check Failed</span>
           </div>
           <button className="text-xs bg-white border border-amber-200 text-amber-800 px-2 py-1 rounded hover:bg-amber-100 transition-colors font-medium">
              View QC Log
           </button>
        </div>
        <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 text-sm">
           <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Waiting for Material</span>
              <span className="text-slate-500">- Station 04 Starved (Thermal Pads)</span>
           </div>
           <span className="text-xs text-slate-400 font-mono">ETA: 10m</span>
        </div>
     </div>
  </div>
);

// --- Main Dashboard Component ---

export const Dashboard: React.FC = () => {
  const { role } = useContext(UserContext);
  const [expandAnalytics, setExpandAnalytics] = useState(false);

  // Role Logic
  const isAuditor = role === UserRole.MANAGEMENT || role === UserRole.COMPLIANCE;
  const isOperator = role === UserRole.OPERATOR;
  
  // Logic to show simplified view for operators
  // EXT-PP-030: We now allow showing full analytics but grouped under an accordion for Operators.
  // Ideally, non-operators see everything. Operators see focused view.
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System Overview <span className="text-slate-300">/</span> {isOperator ? 'My Station' : 'Track'}
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <Activity className="text-brand-600" size={24} />
             {isOperator ? 'Operator Dashboard' : 'System Dashboard'}
           </h1>
           <p className="text-slate-500 text-sm mt-1">
             {isOperator 
               ? 'Operational focus and station readiness. Identity/Trace is handled in S9 Registry.'
               : 'Operational tracking and executive snapshot. (Not for Trace/Identity lookup)'
             }
           </p>
        </div>
        
        {isAuditor ? (
          <div className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded text-xs font-bold border border-slate-300 uppercase flex items-center gap-2">
            <ShieldCheck size={14} />
            Auditor / Regulator – Read-Only View
          </div>
        ) : isOperator ? (
           <div className="bg-brand-50 text-brand-700 px-3 py-1 rounded text-xs font-bold border border-brand-200 uppercase flex items-center gap-2">
             <PlayCircle size={14} />
             Execution Mode
           </div>
        ) : (
          <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold border border-slate-200 uppercase">
            Executive Foundation
          </div>
        )}
      </div>

      {/* OPERATOR: Shift Focus Strip */}
      {isOperator && <ShiftFocusStrip />}

      {/* SECTION 1: EXECUTIVE SNAPSHOT (Cards) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider">
            <Layers size={16} />
            {isOperator ? 'Shift Context (Snapshot)' : 'Executive Snapshot (Real-time Track)'}
        </div>

        {/* Row 1: Manufacturing KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Planned</span>
                    <Clock size={16} className="text-slate-400" />
                </div>
                <div className="text-2xl font-bold text-slate-800">12</div>
                <div className="text-xs text-slate-400 mt-1">Batches</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Built</span>
                    <Factory size={16} className="text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-slate-800">1,240</div>
                <div className="text-xs text-slate-400 mt-1">Packs</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Yield</span>
                    <CheckCircle2 size={16} className="text-green-500" />
                </div>
                <div className="text-2xl font-bold text-slate-800">95.1%</div>
                <div className="text-xs text-green-600 mt-1">1,180 OK</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-industrial-border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Hold</span>
                    <AlertTriangle size={16} className="text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-slate-800">15</div>
                <div className="text-xs text-amber-600 mt-1">Review</div>
            </div>
        </div>

        {/* Row 2: Consolidated Summary - Simplified/Collapsed for Operator */}
        {!isOperator && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cards from EXT-PP-025 Foundation */}
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
        )}
      </section>

      {/* OPERATOR: Attention Required */}
      {isOperator && <OperatorAttention />}

      {/* SECTION 2: OPERATIONAL TRENDS (Graphs) */}
      <section className="space-y-4">
         <div className="flex items-center gap-2 text-slate-700 font-bold text-sm uppercase tracking-wider border-t border-slate-200 pt-6">
            <BarChart3 size={16} />
            {isOperator ? 'Relevant Trends' : 'Operational Trends'}
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* WIP Trend - Critical for everyone */}
            <ChartCard title="WIP Output Trend" subtitle="Last 7 Days (Units)">
               <SimpleLineChart data={TREND_DATA} />
            </ChartCard>

            {/* Exceptions - Critical for everyone */}
            <ChartCard title="Exception Severity" subtitle="Open Issues Count">
               <SimpleBarChart data={EXCEPTION_DATA} />
            </ChartCard>

            {/* Throughput - Collapsed/Hidden for Operator unless expanded */}
            {!isOperator && (
                <ChartCard title="Line Throughput" subtitle="Plan vs Actual (Units)">
                    <GroupedBarChart data={THROUGHPUT_DATA} />
                </ChartCard>
            )}
         </div>
      </section>

      {/* OPERATOR: Progressive Disclosure for More Analytics */}
      {isOperator && (
        <div className="border rounded-lg border-slate-200 bg-slate-50 overflow-hidden">
           <button 
              onClick={() => setExpandAnalytics(!expandAnalytics)}
              className="w-full flex items-center justify-between p-4 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
           >
              <div className="flex items-center gap-2">
                 <PieChart size={16} />
                 <span>More Analytics (Throughput, Distribution & Risk)</span>
              </div>
              {expandAnalytics ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
           </button>
           
           {expandAnalytics && (
              <div className="p-4 border-t border-slate-200 space-y-6 bg-white animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ChartCard title="Line Throughput" subtitle="Plan vs Actual (Units)">
                          <GroupedBarChart data={THROUGHPUT_DATA} />
                      </ChartCard>
                      <ChartCard title="Asset Lifecycle Phase" subtitle="Volume by Stage">
                          <SimpleBarChart data={STAGE_DISTRIBUTION} color="#818cf8" />
                      </ChartCard>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                      {/* Risk Tiles Reused from Foundation */}
                      <div className="bg-red-50 border border-red-200 p-3 rounded flex items-center justify-between">
                          <div>
                              <div className="text-xs font-bold text-red-800 uppercase">Exceptions</div>
                              <div className="text-xl font-bold text-red-900">5</div>
                          </div>
                          <AlertOctagon size={24} className="text-red-300" />
                      </div>
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded flex items-center justify-between">
                          <div>
                              <div className="text-xs font-bold text-amber-800 uppercase">Warranty</div>
                              <div className="text-xl font-bold text-amber-900">3</div>
                          </div>
                          <AlertTriangle size={24} className="text-amber-300" />
                      </div>
                  </div>
              </div>
           )}
        </div>
      )}

      {/* SECTION 3 & 4: Full Analytics & Risk (Non-Operators) */}
      {!isOperator && (
        <>
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
        </>
      )}

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