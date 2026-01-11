import React from 'react';
import { ClipboardList, AlertCircle, Info, CheckCircle, ShieldAlert } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  severity: 'Info' | 'Success' | 'Warning' | 'Error';
  message: string;
}

const MOCK_LOGS: LogEntry[] = [
  { id: 'log-001', timestamp: '2026-01-12 01:50', source: 'System', severity: 'Info', message: 'System health check completed. All services operational.' },
  { id: 'log-002', timestamp: '2026-01-12 01:45', source: 'Workflow', severity: 'Success', message: 'Batch B-2026-01-001 released to production.' },
  { id: 'log-003', timestamp: '2026-01-12 01:30', source: 'Compliance', severity: 'Warning', message: 'Pack PCK-009 missing EU Passport metadata during validation.' },
  { id: 'log-004', timestamp: '2026-01-12 01:15', source: 'Security', severity: 'Error', message: 'Unauthorized access attempt detected on Gateway B.' },
  { id: 'log-005', timestamp: '2026-01-12 00:55', source: 'Workflow', severity: 'Info', message: 'Shift handover report generated automatically.' },
];

export const SystemLogs: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 border-b border-slate-200 pb-4">
        <div>
           <div className="flex items-center gap-1 text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">
              System <span className="text-slate-300">/</span> Audit
           </div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <ClipboardList className="text-brand-600" size={24} />
             System Event Logs
           </h1>
           <p className="text-slate-500 text-sm mt-1">Unified immutable log stream for audit and diagnostics.</p>
        </div>
        <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold border border-slate-200 uppercase">
          Frontend Event Log (Demo)
        </div>
      </div>

      {/* Log List */}
      <div className="bg-white rounded-lg shadow-sm border border-industrial-border overflow-hidden flex-1">
         <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 sticky top-0">
               <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-40">Timestamp (IST)</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-32">Source</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-24">Severity</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Message</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {MOCK_LOGS.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                     <td className="px-6 py-3 font-mono text-slate-600 text-xs">{log.timestamp}</td>
                     <td className="px-6 py-3 font-medium text-slate-800">{log.source}</td>
                     <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                           {log.severity === 'Info' && <Info size={16} className="text-blue-500" />}
                           {log.severity === 'Success' && <CheckCircle size={16} className="text-green-500" />}
                           {log.severity === 'Warning' && <AlertCircle size={16} className="text-amber-500" />}
                           {log.severity === 'Error' && <ShieldAlert size={16} className="text-red-500" />}
                           <span className={`text-xs font-bold ${
                              log.severity === 'Info' ? 'text-blue-700' :
                              log.severity === 'Success' ? 'text-green-700' :
                              log.severity === 'Warning' ? 'text-amber-700' :
                              'text-red-700'
                           }`}>{log.severity}</span>
                        </div>
                     </td>
                     <td className="px-6 py-3 text-slate-600">{log.message}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

    </div>
  );
};