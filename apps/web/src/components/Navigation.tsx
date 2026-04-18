import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRBAC } from '../hooks/useRBAC';
import { 
  LayoutDashboard, Wallet, Users, Shield, Truck, 
  GraduationCap, TrendingUp, FileText, LogOut, 
  Activity, ChevronLeft, ChevronRight, Menu, X 
} from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { canAccessForms, canAccessDashboard } = useRBAC();

  const menuItems = [
    { path: '/welcome', label: t('nav.welcome'), icon: Activity, required: true },
    { path: '/executive', label: t('nav.executive'), icon: LayoutDashboard, dashboard: 'executive' },
    { path: '/finance', label: t('nav.finance'), icon: Wallet, dashboard: 'finance' },
    { path: '/rh', label: t('nav.hr'), icon: Users, dashboard: 'rh' },
    { path: '/operations', label: t('nav.operations'), icon: Shield, dashboard: 'operations' },
    { path: '/logistique', label: t('nav.logistics'), icon: Truck, dashboard: 'logistique' },
    { path: '/formation', label: t('nav.training'), icon: GraduationCap, dashboard: 'formation' },
    { path: '/lean', label: t('nav.lean'), icon: TrendingUp, dashboard: 'lean' },
  ];

  const visibleItems = menuItems.filter(item => {
    if (item.path === '/welcome') return true;
    if (item.dashboard) return canAccessDashboard(item.dashboard);
    return true;
  });

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Desktop Sidebar Render
  const DesktopSidebar = () => (
    <nav className={`fixed left-0 top-0 h-full bg-navy-900 border-r border-navy-700 flex flex-col transition-all duration-300 z-50 hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* ... (Desktop sidebar content - same as before) ... */}
      <div className={`p-6 border-b border-navy-700 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center relative`}>
        {!isCollapsed && <><h1 className="text-xl font-bold text-gold-500">NEXUS360</h1><p className="text-xs text-gray-500">DGSN</p></>}
        {isCollapsed && <Shield className="w-6 h-6 text-gold-500" />}
        <button onClick={toggleCollapse} className="p-1 hover:bg-navy-800 rounded-lg absolute -right-3 top-20 bg-navy-700 border border-navy-600 rounded-full hidden md:block">
          {isCollapsed ? <ChevronRight className="w-4 h-4 text-gold-500" /> : <ChevronLeft className="w-4 h-4 text-gold-500" />}
        </button>
      </div>
      <div className="flex-1 py-6 px-3 space-y-2">
        {/* ... menu items ... */}
        {visibleItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-400 hover:bg-navy-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? item.label : ''}>
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
        {canAccessForms && (
          <Link to="/forms" className={`flex items-center gap-3 px-3 py-2 rounded-lg ${location.pathname === '/forms' ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-400 hover:bg-navy-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`}>
            <FileText className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-sm">{t('nav.forms')}</span>}
          </Link>
        )}
      </div>
      <div className="p-4 border-t border-navy-700 space-y-2">
        <LanguageSwitcher />
        <div className={`px-3 py-2 bg-navy-800 rounded-lg ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed ? <><p className="text-sm text-white truncate">{user?.name}</p><p className="text-xs text-gray-500">{user?.role}</p></> : <div className="flex justify-center"><div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center"><span className="text-gold-500 text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span></div></div>}
        </div>
        <button onClick={onLogout} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm">{t('nav.logout')}</span>}
        </button>
      </div>
    </nav>
  );

  // Mobile Overlay Menu
  const MobileMenu = () => (
    <>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileMenu}></div>
      )}
      <div className={`fixed top-0 left-0 h-full w-64 bg-navy-900 border-r border-navy-700 flex flex-col transition-transform duration-300 z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-navy-700 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gold-500">NEXUS360</h1>
          <button onClick={toggleMobileMenu} className="p-2 hover:bg-navy-800 rounded-lg">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex-1 py-4 px-3 space-y-2">
          {visibleItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={toggleMobileMenu} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${active ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-400 hover:bg-navy-800 hover:text-white'}`}>
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
          {canAccessForms && (
            <Link to="/forms" onClick={toggleMobileMenu} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${location.pathname === '/forms' ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-400 hover:bg-navy-800 hover:text-white'}`}>
              <FileText className="w-5 h-5" />
              <span className="text-sm">{t('nav.forms')}</span>
            </Link>
          )}
        </div>
        <div className="p-4 border-t border-navy-700 space-y-2">
          <LanguageSwitcher />
          <div className="px-3 py-2 bg-navy-800 rounded-lg">
            <p className="text-sm text-white">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">{t('nav.logout')}</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header with Menu Button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-navy-900/95 backdrop-blur-sm border-b border-navy-700 z-40 flex items-center justify-between px-4 md:hidden">
        <button onClick={toggleMobileMenu} className="p-2 hover:bg-navy-800 rounded-lg">
          <Menu className="w-5 h-5 text-gold-500" />
        </button>
        <h1 className="text-lg font-bold text-gold-500">NEXUS360</h1>
        <div className="w-8"></div> {/* Placeholder for balance */}
      </div>
      <DesktopSidebar />
      <MobileMenu />
      {/* Spacer for mobile header */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};
