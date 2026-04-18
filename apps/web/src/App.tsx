import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from './components/Navigation';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Login } from './pages/Login';
import { Welcome } from './pages/Welcome';
import { Forms } from './pages/Forms';
import { ExecutiveDashboard } from './pages/dashboards/ExecutiveDashboard';
import { FinanceDashboard } from './pages/dashboards/FinanceDashboard';
import { RHDashboard } from './pages/dashboards/RHDashboard';
import { OperationsDashboard } from './pages/dashboards/OperationsDashboard';
import { LogistiqueDashboard } from './pages/dashboards/LogistiqueDashboard';
import { FormationDashboard } from './pages/dashboards/FormationDashboard';
import { LeanDashboard } from './pages/dashboards/LeanDashboard';

const AppHeader = ({ user }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-navy-900/95 backdrop-blur-sm border-b border-navy-700 z-30 flex items-center justify-between px-4 md:px-6">
      <div className="hidden md:block flex-shrink-0 w-64">
        <p className="text-gold-500 text-sm font-semibold truncate">
          {t('welcome.greeting')} {user?.name} ({user?.role})
        </p>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-sm md:text-xl font-bold text-gold-500">
          DGSN - {t('header.title')}
        </h1>
      </div>
      <div className="flex-shrink-0">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) i18n.changeLanguage(savedLang);
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-navy-950">
      <Navigation user={user} onLogout={() => { localStorage.clear(); setUser(null); }} />
      <AppHeader user={user} />
      <main className="pt-16 md:ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome user={user} />} />
          <Route path="/forms" element={<Forms user={user} />} />
          <Route path="/executive" element={<ExecutiveDashboard user={user} />} />
          <Route path="/finance" element={<FinanceDashboard user={user} />} />
          <Route path="/rh" element={<RHDashboard user={user} />} />
          <Route path="/operations" element={<OperationsDashboard user={user} />} />
          <Route path="/logistique" element={<LogistiqueDashboard user={user} />} />
          <Route path="/formation" element={<FormationDashboard user={user} />} />
          <Route path="/lean" element={<LeanDashboard user={user} />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
