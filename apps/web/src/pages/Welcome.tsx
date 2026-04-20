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
      {/* Header Section - Directly NEXUS360 without greeting */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gold-500 tracking-wider mb-3">{t('welcome.title')}</h1>
        <p className="text-lg md:text-xl text-white font-semibold">{t('welcome.subtitle')}</p>
        <div className="w-24 md:w-32 h-0.5 bg-gold-500/50 mx-auto my-4"></div>
      </div>

      {/* Main Welcome Message */}
      <div className="glass rounded-xl p-6 md:p-8 mb-8">
        <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {t('welcome.message1')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-navy-800/50 rounded-lg">
            <Wallet className="w-6 h-6 md:w-10 md:h-10 text-green-500" />
            <span className="text-gray-200 text-sm md:text-base">{t('welcome.feature1')}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-navy-800/50 rounded-lg">
            <Users className="w-6 h-6 md:w-10 md:h-10 text-blue-500" />
            <span className="text-gray-200 text-sm md:text-base">{t('welcome.feature2')}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-navy-800/50 rounded-lg">
            <MapPin className="w-6 h-6 md:w-10 md:h-10 text-red-500" />
            <span className="text-gray-200 text-sm md:text-base">{t('welcome.feature3')}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-navy-800/50 rounded-lg">
            <Truck className="w-6 h-6 md:w-10 md:h-10 text-yellow-500" />
            <span className="text-gray-200 text-sm md:text-base">{t('welcome.feature4')}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-navy-800/50 rounded-lg">
            <GraduationCap className="w-6 h-6 md:w-10 md:h-10 text-purple-500" />
            <span className="text-gray-200 text-sm md:text-base">{t('welcome.feature5')}</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-navy-800/50 rounded-lg">
            <TrendingUp className="w-6 h-6 md:w-10 md:h-10 text-indigo-500" />
            <span className="text-gray-200 text-sm md:text-base">{t('welcome.feature6')}</span>
          </div>
        </div>

        <div className="bg-gold-500/10 border-l-4 border-gold-500 p-4 md:p-6 rounded-r-lg mb-6">
          <p className="text-gray-200 text-base md:text-lg leading-relaxed">
            {t('welcome.message2')}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-gold-500 mb-2">{t('welcome.welcome_text')}</p>
          <p className="text-lg md:text-xl text-white font-semibold">{t('welcome.tagline')}</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">{t('welcome.stats_title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass rounded-xl p-4 md:p-6 text-center hover:border-gold-500/30 transition-all">
              <stat.icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color} mx-auto mb-2 md:mb-3`} />
              <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-navy-700">
        <p className="text-gray-500 italic text-xs md:text-sm">{t('welcome.footer')}</p>
      </div>
    </div>
  );
};
