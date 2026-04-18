// ... (imports remain the same)
const AppHeader = ({ user }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-navy-900/95 backdrop-blur-sm border-b border-navy-700 z-30 flex items-center justify-between px-4 md:px-6">
      {/* Left: Greeting - Hide on mobile, show in mobile header */}
      <div className="hidden md:block flex-shrink-0 w-64">
        <p className="text-gold-500 text-sm font-semibold truncate">
          {t('welcome.greeting')} {user?.name} ({user?.role})
        </p>
      </div>
      
      {/* Center: Title */}
      <div className="flex-1 text-center">
        <h1 className="text-sm md:text-xl font-bold text-gold-500 whitespace-nowrap overflow-x-auto">
          DGSN - {t('header.title')}
        </h1>
      </div>
      
      {/* Right: Language Switcher */}
      <div className="flex-shrink-0">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

function App() {
  // ... (rest of the App component remains the same)
  return (
    <div className="min-h-screen bg-navy-950">
      <Navigation user={user} onLogout={() => { localStorage.clear(); setUser(null); }} />
      <AppHeader user={user} />
      {/* Adjust main content padding for mobile header and sidebar */}
      <main className="pt-16 md:ml-64">
        <Routes>
          {/* ... routes ... */}
        </Routes>
      </main>
    </div>
  );
}
export default App;
