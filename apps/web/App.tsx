import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from './components/Navigation';
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

function App() {
  const [user, setUser] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    // Load saved language
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) i18n.changeLanguage(savedLang);
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-navy-950">
      <Navigation user={user} onLogout={() => { localStorage.clear(); setUser(null); }} />
      <main className="ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome user={user} />} />
          <Route path="/forms" element={<Forms user={user} />} />
          <Route path="/executive" element={<ExecutiveDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/rh" element={<RHDashboard />} />
          <Route path="/operations" element={<OperationsDashboard />} />
          <Route path="/logistique" element={<LogistiqueDashboard />} />
          <Route path="/formation" element={<FormationDashboard />} />
          <Route path="/lean" element={<LeanDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
