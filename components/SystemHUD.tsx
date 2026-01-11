import React, { useState, useEffect, useContext } from 'react';
import { UserContext, APP_VERSION, PATCH_ID, APP_NAME } from '../types';
import { ChevronUp, ChevronDown, Activity, Lock } from 'lucide-react';

export const SystemHUD: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const user = useContext(UserContext);

  useEffect(() => {
    // Calculate IST date strictly using Asia/Kolkata timezone
    const updateDate = () => {
      const date = new Date();
      // Using en-CA locale creates a YYYY-MM-DD format
      const istDate = date.toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kolkata'
      });
      setCurrentDate(`${istDate} (IST)`);
    };

    updateDate();
    // Update every minute
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
       {/* Collapsible Panel */}
       {isOpen && (
         <div className="bg-slate-900/95 backdrop-blur-sm text-slate-200 p-4 rounded-t-lg shadow-2xl w-72 border border-slate-700 text-sm font-mono space-y-3 mb-0 animate-in slide-in-from-bottom-5 fade-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <Activity size={14} className="text-green-400" />
                  SYSTEM METADATA
                </span>
                <span className="text-[10px] text-slate-500">READ-ONLY</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                  <span className="text-slate-500">Version:</span>
                  <span className="text-emerald-400 font-bold">{APP_VERSION}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-slate-500">Patch ID:</span>
                  <span className="text-emerald-400">{PATCH_ID}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-slate-500">Environment:</span>
                  <span className={`font-bold ${user.isDemo ? 'text-amber-400' : 'text-slate-200'}`}>
                    {user.isDemo ? 'DEMO / SANDBOX' : 'PRODUCTION'}
                  </span>
              </div>
              <div className="flex justify-between items-start">
                  <span className="text-slate-500 whitespace-nowrap mr-4">Active Role:</span>
                  <span className="text-blue-300 text-right font-medium leading-tight">{user.role}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                  <span className="text-slate-500">System Date:</span>
                  <span className="text-slate-300">{currentDate}</span>
              </div>
              
              {/* Design Freeze Indicator */}
              <div className="mt-2 pt-2 border-t border-slate-700">
                 <div className="bg-blue-900/30 text-blue-200 p-2 rounded text-xs text-center border border-blue-800/50 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 font-bold">
                        <Lock size={12} />
                        DESIGN FROZEN
                    </div>
                    <span className="text-[10px] opacity-75">BPM-OS v3.1 • {PATCH_ID}</span>
                    <span className="text-[10px] opacity-60">2026-01-12 01:25 (IST)</span>
                 </div>
              </div>
            </div>
         </div>
       )}

       {/* Toggle Button / Mini Status */}
       <button
         onClick={() => setIsOpen(!isOpen)}
         className={`flex items-center space-x-3 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 shadow-xl transition-all border border-slate-600 ${isOpen ? 'rounded-b-lg border-t-0' : 'rounded-lg'}`}
       >
         <div className="flex flex-col items-start">
           <span className="text-[10px] text-slate-400 leading-none uppercase font-bold tracking-wider">BPM-OS Status</span>
           <span className="text-xs font-mono font-bold text-emerald-400">{PATCH_ID}</span>
         </div>
         <div className="h-6 w-px bg-slate-600 mx-2"></div>
         {isOpen ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronUp size={18} className="text-slate-400" />}
       </button>
    </div>
  );
};