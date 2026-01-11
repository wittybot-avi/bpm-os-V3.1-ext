import React, { useContext, useState, useEffect } from 'react';
import { APP_NAME, APP_VERSION, PATCH_ID, NavView, UserContext, UserRole } from '../types';
import { 
  Home, 
  Activity, 
  Box, 
  Layers, 
  ClipboardList, 
  BarChart2, 
  FileText,
  Settings,
  Cpu,
  ShoppingCart,
  Truck,
  CalendarClock,
  Wrench,
  ClipboardCheck,
  Battery,
  FileCheck,
  Database,
  PackageCheck,
  Package,
  Stamp,
  LogOut,
  LifeBuoy,
  Recycle,
  ShieldCheck,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors ${
      active 
        ? 'bg-brand-50 text-brand-700 border-r-4 border-brand-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border-r-4 border-transparent'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
  isActiveGroup?: boolean;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children, isActiveGroup = false }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Auto-expand if the group contains the active item
  useEffect(() => {
    if (isActiveGroup) setIsOpen(true);
  }, [isActiveGroup]);

  return (
    <div className="border-b border-slate-100 last:border-0 py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:bg-slate-50 hover:text-slate-700 transition-colors focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {isOpen && (
        <nav className="flex flex-col space-y-0.5 mt-1 pb-2">
          {children}
        </nav>
      )}
    </div>
  );
};

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { role } = useContext(UserContext);
  
  // RBAC Logic - Module Visibility
  const canSeeSystemSetup = role === UserRole.SYSTEM_ADMIN || role === UserRole.MANAGEMENT;
  
  const canSeeSkuBlueprint = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.ENGINEERING || 
    role === UserRole.MANAGEMENT;

  const canSeeProcurement = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.PROCUREMENT || 
    role === UserRole.MANAGEMENT;

  const canSeeInboundReceipt = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.STORES || 
    role === UserRole.SUPERVISOR || 
    role === UserRole.MANAGEMENT;

  const canSeeBatchPlanning = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.PLANNER ||
    role === UserRole.SUPERVISOR || 
    role === UserRole.MANAGEMENT;

  const canSeeModuleAssembly = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.OPERATOR ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeModuleQA = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.QA_ENGINEER ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeePackAssembly = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.OPERATOR ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeePackReview = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.QA_ENGINEER ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;
  
  const canSeeRegistry = 
    role === UserRole.SYSTEM_ADMIN || 
    role === UserRole.MANAGEMENT || 
    role === UserRole.ENGINEERING ||
    role === UserRole.QA_ENGINEER;

  const canSeeBMSProvisioning = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.ENGINEERING ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;
  
  const canSeeFinishedGoods = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.STORES ||
    role === UserRole.LOGISTICS ||
    role === UserRole.MANAGEMENT;

  const canSeePackaging = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.STORES ||
    role === UserRole.LOGISTICS ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeDispatchAuth = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.LOGISTICS ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeDispatchExec = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.LOGISTICS ||
    role === UserRole.STORES ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.MANAGEMENT;

  const canSeeService = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.SERVICE ||
    role === UserRole.MANAGEMENT;

  const canSeeRecycling = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.SUSTAINABILITY ||
    role === UserRole.SERVICE ||
    role === UserRole.MANAGEMENT;

  const canSeeCompliance = 
    role === UserRole.SYSTEM_ADMIN ||
    role === UserRole.COMPLIANCE ||
    role === UserRole.SUSTAINABILITY ||
    role === UserRole.MANAGEMENT;

  // Group Visibility Logic
  const showSystemSetup = canSeeSystemSetup || canSeeSkuBlueprint;
  const showProcurement = canSeeProcurement || canSeeInboundReceipt;
  const showProduction = canSeeBatchPlanning || canSeeModuleAssembly || canSeeModuleQA || canSeePackAssembly || canSeePackReview;
  const showTraceability = canSeeRegistry || canSeeBMSProvisioning;
  const showLogistics = canSeeFinishedGoods || canSeePackaging || canSeeDispatchAuth || canSeeDispatchExec;
  const showLifecycle = canSeeService || canSeeRecycling;
  const showGovernance = canSeeCompliance;

  // Active Group Checks
  const activeSystemSetup = ['system_setup', 'sku_blueprint'].includes(currentView);
  const activeProcurement = ['procurement', 'inbound_receipt'].includes(currentView);
  const activeProduction = ['batch_planning', 'module_assembly', 'module_qa', 'pack_assembly', 'pack_review'].includes(currentView);
  const activeTraceability = ['battery_registry', 'bms_provisioning'].includes(currentView);
  const activeLogistics = ['finished_goods', 'packaging_aggregation', 'dispatch_authorization', 'dispatch_execution'].includes(currentView);
  const activeLifecycle = ['service_warranty', 'recycling_recovery'].includes(currentView);
  const activeGovernance = ['compliance_audit'].includes(currentView);
  const activeSystem = ['documentation', 'live_status', 'system_inventory', 'production_line', 'system_logs', 'system_reports'].includes(currentView);

  return (
    <aside className="w-64 bg-white border-r border-industrial-border h-full flex flex-col shrink-0">
      
      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Dashboard (Always Visible) */}
        <div className="py-2 border-b border-slate-100">
            <NavItem 
              icon={Home} 
              label="Dashboard" 
              active={currentView === 'dashboard'} 
              onClick={() => onNavigate('dashboard')} 
            />
        </div>

        {/* Group A: System Setup */}
        {showSystemSetup && (
          <SidebarGroup title="System Setup" isActiveGroup={activeSystemSetup}>
              {canSeeSystemSetup && (
                <NavItem 
                  icon={Settings} 
                  label="System Setup (S0)" 
                  active={currentView === 'system_setup'} 
                  onClick={() => onNavigate('system_setup')} 
                />
              )}
              {canSeeSkuBlueprint && (
                <NavItem 
                  icon={Cpu} 
                  label="SKU & Blueprint (S1)" 
                  active={currentView === 'sku_blueprint'} 
                  onClick={() => onNavigate('sku_blueprint')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group B: Procurement & Inbound */}
        {showProcurement && (
          <SidebarGroup title="Procurement" isActiveGroup={activeProcurement}>
              {canSeeProcurement && (
                <NavItem 
                  icon={ShoppingCart} 
                  label="Procurement (S2)" 
                  active={currentView === 'procurement'} 
                  onClick={() => onNavigate('procurement')} 
                />
              )}
              {canSeeInboundReceipt && (
                <NavItem 
                  icon={Truck} 
                  label="Inbound Receipt (S3)" 
                  active={currentView === 'inbound_receipt'} 
                  onClick={() => onNavigate('inbound_receipt')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group C: Production Planning & Execution */}
        {showProduction && (
          <SidebarGroup title="Production" isActiveGroup={activeProduction}>
              {canSeeBatchPlanning && (
                <NavItem 
                  icon={CalendarClock} 
                  label="Batch Planning (S4)" 
                  active={currentView === 'batch_planning'} 
                  onClick={() => onNavigate('batch_planning')} 
                />
              )}
              {canSeeModuleAssembly && (
                <NavItem 
                  icon={Wrench} 
                  label="Module Assembly (S5)" 
                  active={currentView === 'module_assembly'} 
                  onClick={() => onNavigate('module_assembly')} 
                />
              )}
              {canSeeModuleQA && (
                <NavItem 
                  icon={ClipboardCheck} 
                  label="Module QA (S6)" 
                  active={currentView === 'module_qa'} 
                  onClick={() => onNavigate('module_qa')} 
                />
              )}
              {canSeePackAssembly && (
                <NavItem 
                  icon={Battery} 
                  label="Pack Assembly (S7)" 
                  active={currentView === 'pack_assembly'} 
                  onClick={() => onNavigate('pack_assembly')} 
                />
              )}
              {canSeePackReview && (
                <NavItem 
                  icon={FileCheck} 
                  label="Pack Review (S8)" 
                  active={currentView === 'pack_review'} 
                  onClick={() => onNavigate('pack_review')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group D: Trace & Identity */}
        {showTraceability && (
          <SidebarGroup title="Trace & Identity" isActiveGroup={activeTraceability}>
              {canSeeRegistry && (
                <NavItem 
                  icon={Database} 
                  label="Battery Registry (S9)" 
                  active={currentView === 'battery_registry'} 
                  onClick={() => onNavigate('battery_registry')} 
                />
              )}
              {canSeeBMSProvisioning && (
                <NavItem 
                  icon={Cpu} 
                  label="BMS Provisioning (S10)" 
                  active={currentView === 'bms_provisioning'} 
                  onClick={() => onNavigate('bms_provisioning')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group E: Logistics & Dispatch */}
        {showLogistics && (
          <SidebarGroup title="Logistics" isActiveGroup={activeLogistics}>
              {canSeeFinishedGoods && (
                <NavItem 
                  icon={PackageCheck} 
                  label="Finished Goods (S11)" 
                  active={currentView === 'finished_goods'} 
                  onClick={() => onNavigate('finished_goods')} 
                />
              )}
              {canSeePackaging && (
                <NavItem 
                  icon={Package} 
                  label="Packaging (S12)" 
                  active={currentView === 'packaging_aggregation'} 
                  onClick={() => onNavigate('packaging_aggregation')} 
                />
              )}
              {canSeeDispatchAuth && (
                <NavItem 
                  icon={Stamp} 
                  label="Dispatch Auth (S13)" 
                  active={currentView === 'dispatch_authorization'} 
                  onClick={() => onNavigate('dispatch_authorization')} 
                />
              )}
              {canSeeDispatchExec && (
                <NavItem 
                  icon={LogOut} 
                  label="Dispatch Exec (S14)" 
                  active={currentView === 'dispatch_execution'} 
                  onClick={() => onNavigate('dispatch_execution')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group F: Track & Lifecycle */}
        {showLifecycle && (
          <SidebarGroup title="Track & Lifecycle" isActiveGroup={activeLifecycle}>
              {canSeeService && (
                <NavItem 
                  icon={LifeBuoy} 
                  label="Service & Warranty (S15)" 
                  active={currentView === 'service_warranty'} 
                  onClick={() => onNavigate('service_warranty')} 
                />
              )}
              {canSeeRecycling && (
                <NavItem 
                  icon={Recycle} 
                  label="Recycling & Recovery (S16)" 
                  active={currentView === 'recycling_recovery'} 
                  onClick={() => onNavigate('recycling_recovery')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group G: Governance */}
        {showGovernance && (
          <SidebarGroup title="Governance" isActiveGroup={activeGovernance}>
              {canSeeCompliance && (
                <NavItem 
                  icon={ShieldCheck} 
                  label="Compliance & Audit (S17)" 
                  active={currentView === 'compliance_audit'} 
                  onClick={() => onNavigate('compliance_audit')} 
                />
              )}
          </SidebarGroup>
        )}

        {/* Group H: System */}
        <SidebarGroup title="System" isActiveGroup={activeSystem}>
            <NavItem 
              icon={Activity} 
              label="Live Status" 
              active={currentView === 'live_status'} 
              onClick={() => onNavigate('live_status')} 
            />
            <NavItem 
              icon={Box} 
              label="Inventory" 
              active={currentView === 'system_inventory'} 
              onClick={() => onNavigate('system_inventory')} 
            />
            <NavItem 
              icon={Layers} 
              label="Production Line" 
              active={currentView === 'production_line'} 
              onClick={() => onNavigate('production_line')} 
            />
            <NavItem 
              icon={ClipboardList} 
              label="Logs" 
              active={currentView === 'system_logs'} 
              onClick={() => onNavigate('system_logs')} 
            />
            <NavItem 
              icon={BarChart2} 
              label="Reports" 
              active={currentView === 'system_reports'} 
              onClick={() => onNavigate('system_reports')} 
            />
            <NavItem 
                icon={FileText} 
                label="Documentation" 
                active={currentView === 'documentation'}
                onClick={() => onNavigate('documentation')}
            />
        </SidebarGroup>

      </div>
      
      {/* Footer Watermark - Unified Patch ID Source */}
      <div className="p-4 border-t border-slate-100 text-center shrink-0 bg-white z-10">
        <p className="text-[10px] text-slate-400">
          {APP_NAME} {APP_VERSION} | Build {PATCH_ID}
          <br />
          &copy; 2025 Internal Use Only
        </p>
      </div>
    </aside>
  );
};