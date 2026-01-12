import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext, APP_VERSION, PATCH_ID } from '../types';
import { 
  Activity, 
  Lock, 
  GripHorizontal, 
  Minimize2, 
  Maximize2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SystemHUD: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  const hudRef = useRef<HTMLDivElement>(null);
  
  const user = useContext(UserContext);

  // Time Sync
  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const istDate = date.toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kolkata'
      });
      setCurrentDate(`${istDate} (IST)`);
    };
    updateDate();
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  // Global Drag Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      // Simple viewport constraints
      const maxX = window.innerWidth - (hudRef.current?.offsetWidth || 300);
      const maxY = window.innerHeight - (hudRef.current?.offsetHeight || 100);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const startDrag = (e: React.MouseEvent) => {
    // Only allow dragging from the handle
    if (hudRef.current) {
      const rect = hudRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      // If position is null (initial state), set it to current computed position to start dragging smoothly
      if (!position) {
        setPosition({ x: rect.left, y: rect.top });
      }
      setIsDragging(true);
    }
  };

  // Dynamic Styles
  const containerStyle: React.CSSProperties = position 
    ? { position: 'fixed', left: position.x, top: position.y } 
    : { position: 'fixed', bottom: '1rem', right: '1rem' }; // Default position

  return (
    <div 
      ref={hudRef}
      style={containerStyle}
      className={`z-50 flex flex-col items-end transition-shadow shadow-2xl rounded-lg ${isDragging ? 'cursor-grabbing' : ''}`}
    >
       {/* Expanded State */}
       {isExpanded && (
         <div className="bg-slate-900/95 backdrop-blur-md text-slate-200 rounded-lg w-72 border border-slate-700 text-sm font-mono overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Drag Handle & Header */}
            <div 
              onMouseDown={startDrag}
              className="bg-slate-800 border-b border-slate-700 p-2 flex justify-between items-center cursor-grab active:cursor-grabbing select-none"
              title="Drag to move"
            >
                <div className="flex items-center gap-2">
                   <GripHorizontal size={14} className="text-slate-500" />
                   <span className="font-bold text-xs text-slate-300">SYSTEM METADATA</span>
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                  title="Collapse HUD"
                >
                   <Minimize2 size={14} />
                </button>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-xs">Environment</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${user.isDemo ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50' : 'bg-green-900/30 text-green-400'}`}>
                    {user.isDemo ? 'DEMO MODE' : 'PRODUCTION'}
                  </span>
              </div>

              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Version</span>
                    <span className="text-emerald-400 font-bold">{APP_VERSION}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Patch</span>
                    <span className="text-emerald-400 font-mono">{PATCH_ID}</span>
                 </div>
              </div>

              <div className="pt-2 border-t border-slate-700 space-y-1">
                  <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Role</span>
                      <span className="text-blue-300 font-medium text-right truncate ml-4">{user.role}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Date</span>
                      <span className="text-slate-300">{currentDate}</span>
                  </div>
              </div>
              
              {/* Design Freeze Indicator */}
              <div className="mt-2 pt-2 border-t border-slate-700">
                 <div className="bg-blue-950/50 text-blue-200 p-2 rounded text-[10px] text-center border border-blue-900/50 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 font-bold text-blue-300">
                        <Lock size={10} />
                        DESIGN FROZEN
                    </div>
                    <span className="opacity-60">Visual Baseline Established</span>
                 </div>
              </div>
            </div>
         </div>
       )}

       {/* Collapsed State (Pill) */}
       {!isExpanded && (
         <div 
            className="flex items-center bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg border border-slate-600 transition-all overflow-hidden group select-none"
         >
            {/* Drag Area */}
            <div 
              onMouseDown={startDrag}
              className="pl-3 py-3 pr-2 cursor-grab active:cursor-grabbing border-r border-slate-700 flex items-center"
            >
               <Activity size={16} className="text-emerald-400" />
            </div>

            {/* Expand Action */}
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono font-bold text-slate-300 hover:text-white"
              title="Expand HUD"
            >
              <span>{PATCH_ID}</span>
              <Maximize2 size={12} className="opacity-50 group-hover:opacity-100" />
            </button>
         </div>
       )}
    </div>
  );
};