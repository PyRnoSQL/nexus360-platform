import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Wallet, Users, MapPin, Truck, GraduationCap, TrendingUp, Zap } from 'lucide-react';

export const Welcome = ({ user }) => {
  const { t } = useTranslation();
  
  const stats = [
    { value: '10', label: t('welcome.regions'), icon: MapPin, color: 'text-blue-500' },
    { value: '58', label: t('welcome.cities'), icon: MapPin, color: 'text-green-500' },
    { value: '6', label: t('welcome.modules'), icon: Shield, color: 'text-purple-500' },
    { value: '24/7', label: t('welcome.availability'), icon: Zap, color: 'text-gold-500' },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gold-500 tracking-wider mb-3">{t('welcome.title')}</h1>
        <p className="text-xl text-white font-semibold">{t('welcome.subtitle')}</p>
        <div className="w-32 h-0.5 bg-gold-500/50 mx-auto my-4"></div>
      </div>

      {/* Welcome greeting at top right */}
      <div className="text-right mb-6">
        <p className="text-gold-500 text-lg font-semibold">{t('welcome.greeting')} {user?.name} ({user?.role})</p>
      </div>

      {/* Main Welcome Message */}
      <div className="glass rounded-xl p-8 mb-8">
        <p className="text-gray-200 text-lg leading-relaxed mb-8">
          {t('welcome.message1')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 p-4 bg-navy-800/50 rounded-lg">
            <Wallet className="w-10 h-10 text-green-500" />
            <span className="text-gray-200">{t('welcome.feature1')}</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-navy-800/50 rounded-lg">
            <Users className="w-10 h-10 text-blue-500" />
            <span className="text-gray-200">{t('welcome.feature2')}</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-navy-800/50 rounded-lg">
            <MapPin className="w-10 h-10 text-red-500" />
            <span className="text-gray-200">{t('welcome.feature3')}</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-navy-800/50 rounded-lg">
            <Truck className="w-10 h-10 text-yellow-500" />
            <span className="text-gray-200">{t('welcome.feature4')}</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-navy-800/50 rounded-lg">
            <GraduationCap className="w-10 h-10 text-purple-500" />
            <span className="text-gray-200">{t('welcome.feature5')}</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-navy-800/50 rounded-lg">
            <TrendingUp className="w-10 h-10 text-indigo-500" />
            <span className="text-gray-200">{t('welcome.feature6')}</span>
          </div>
        </div>

        <div className="bg-gold-500/10 border-l-4 border-gold-500 p-6 rounded-r-lg mb-6">
          <p className="text-gray-200 text-lg leading-relaxed">
            {t('welcome.message2')}
          </p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-gold-500 mb-2">{t('welcome.welcome_text')}</p>
          <p className="text-xl text-white font-semibold">{t('welcome.tagline')}</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('welcome.stats_title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass rounded-xl p-6 text-center hover:border-gold-500/30 transition-all">
              <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-navy-700">
        <p className="text-gray-500 italic">{t('welcome.footer')}</p>
      </div>
    </div>
  );
};
