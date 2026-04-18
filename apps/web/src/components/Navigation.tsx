import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Wallet, Users, Shield, Truck, GraduationCap, TrendingUp, FileText, LogOut, Activity, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const role = user?.role;

  const canAccessForms = role === 'OFFICIER' || role === 'SUPER_ADMIN';
  const canAccessDashboard = (dashboard) => {
    if (role === 'SUPER_ADMIN') return true;
    if (role === 'DG') return true;
    if (role === 'COMMISSAIRE' && ['operations', 'logistique', 'formation'].includes(dashboard)) return true;
    return false;
  };

  const menuItems = [
    { path: '/welcome', label: t('nav.welcome'), icon: Activity },
    { path: '/executive', label: t('nav.executive'), icon: LayoutDashboard, dashboard: 'executive' },
    { path: '/finance', label: t('nav.finance'), icon: Wallet, dashboard: 'finance' },
    { path: '/rh', label: t('nav.hr'), icon: Users, dashboard: 'rh' },
    { path: '/operations', label: t('nav.operations'), icon: Shield, dashboard: 'operations' },
    { path: '/logistique', label: t('nav.logistics'), icon: Truck, dashboard: 'logistique' },
    { path: '/formation', label: t('nav.training'), icon: GraduationCap, dashboard: 'formation' },
    { path: '/lean', label: t('nav.lean'), icon: TrendingUp, dashboard: 'lean' },
  ];

  const visibleItems = menuItems.filter(item => !item.dashboard || canAccessDashboard(item.dashboard));

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileOpen(false);

  const SidebarContent = () => (
    <>
      <div className={`p-6 border-b border-navy-700 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center relative`}>
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-gold-500">NEXUS360</h1>
            <p className="text-xs text-gray-500">DGSN</p>
          </div>
        )}
        {isCollapsed && <Shield className="w-6 h-6 text-gold-500" />}
        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1 hover:bg-navy-800 rounded-lg absolute -right-3 top-20 bg-navy-700 border border-navy-600 rounded-full"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4 text-gold-500" /> : <ChevronLeft className="w-4 h-4 text-gold-500" />}
        </button>
        {/* Close button — mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1 hover:bg-navy-800 rounded-lg text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {visibleItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-400 hover:bg-navy-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
        {canAccessForms && (
          <Link
            to="/forms"
            onClick={handleNavClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${location.pathname === '/forms' ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-400 hover:bg-navy-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? t('nav.forms') : ''}
          >
            <FileText className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-sm">{t('nav.forms')}</span>}
          </Link>
        )}
      </div>

      <div className="p-4 border-t border-navy-700 space-y-2">
        <LanguageSwitcher />
        <div className={`px-3 py-2 bg-navy-800 rounded-lg ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed
            ? <><p className="text-sm text-white">{user?.name}</p><p className="text-xs text-gray-500">{user?.role}</p></>
            : <div className="flex justify-center"><div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center"><span className="text-gold-500 text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span></div></div>
          }
        </div>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm">{t('nav.logout')}</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── MOBILE hamburger button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-navy-900 border border-navy-700 rounded-lg text-gold-500"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── MOBILE backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE drawer ── */}
      <nav className={`md:hidden fixed left-0 top-0 h-full w-72 bg-navy-900 border-r border-navy-700 flex flex-col z-50 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </nav>

      {/* ── DESKTOP sidebar (unchanged behaviour) ── */}
      <nav className={`hidden md:flex fixed left-0 top-0 h-full bg-navy-900 border-r border-navy-700 flex-col transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <SidebarContent />
      </nav>
    </>
  );
};
