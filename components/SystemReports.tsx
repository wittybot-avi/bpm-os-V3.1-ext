import React from 'react';
import { BarChart2, FileText, Download, ShieldCheck, Battery, Database } from 'lucide-react';

interface ReportTile {
  title: string;
  description: string;
  icon: React.ElementType;
  owner: string;
}

const REPORTS: ReportTile[] = [
  { 
    title: 'Manufacturing Summary', 
    description: 'Yield rates, cycle times, and defect pareto analysis for current shift.',
    icon: BarChart2,
    owner: 'MES Backend'
  },
  { 
    title: 'Compliance Snapshot', 
    description: 'Regulatory adherence report (AIS-156, Battery Passport readiness).',
    icon: ShieldCheck,
    owner: 'Governance Module'
  },
  { 
    title: 'Warranty Overview', 
    description: 'Active claims, fleet health distribution, and risk exposure.',
    icon: Battery,
    owner: 'Service Backend'
  },
  { 
    title: 'Traceability Export', 
    description: 'Full genealogy dump for auditor review (CSV/JSON).',
    icon: Database,
    owner: 'Trace Ledger'
  },
];

export const SystemReports: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System <span className="text-slate-300">/</span> Intelligence
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <FileText className="text-brand-600" size={24} />
             System Reports
           </h1>
           <p className="text-slate-500 text-sm mt-1">Generated analytics and compliance documentation.</p>
        </div>
      </div>

      {/* Report Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {REPORTS.map((report, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-industrial-border flex flex-col">
               <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-brand-600">
                     <report.icon size={24} />
                  </div>
                  <div className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-mono rounded uppercase">
                     Owner: {report.owner}
                  </div>
               </div>
               <h3 className="text-lg font-bold text-slate-800 mb-2">{report.title}</h3>
               <p className="text-sm text-slate-500 flex-1">{report.description}</p>
               <div className="mt-6 pt-4 border-t border-slate-100">
                  <button 
                     disabled 
                     className="w-full bg-slate-50 border border-slate-200 text-slate-400 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 cursor-not-allowed hover:bg-slate-100 transition-colors"
                     title="Backend integration pending"
                  >
                     <Download size={16} />
                     Generate Report
                  </button>
               </div>
            </div>
         ))}
      </div>

    </div>
  );
};