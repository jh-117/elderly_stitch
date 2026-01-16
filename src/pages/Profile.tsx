import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile } = useAuth();
  const { language, setLanguage, textSize, setTextSize, darkMode, setDarkMode } = useStore();
  const t = translations[language];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'ms' : 'en';
    setLanguage(newLang);
    if (profile) {
      await updateProfile({ language: newLang });
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (profile) {
      await updateProfile({ dark_mode: newMode });
    }
  };

  if (!user) {
    return (
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
        <Navbar title={t.profile.title} />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            {language === 'ms' ? 'Sila log masuk untuk melihat profil anda' : 'Please log in to view your profile'}
          </p>
          <Button onClick={() => navigate('/login')}>{t.auth.login}</Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <Navbar title={t.profile.title} />

      <main className="flex-1 overflow-y-auto pb-24 p-4">
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || 'User'}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary">person</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold">
                {profile?.full_name || 'User'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-2 mb-6">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold px-2 mb-3">
            {t.profile.settings}
          </h3>

          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">language</span>
              <span className="text-gray-900 dark:text-white font-medium">{t.profile.language}</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary font-bold"
            >
              {language === 'en' ? 'English' : 'Bahasa Malaysia'}
            </button>
          </Card>

          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">text_increase</span>
              <span className="text-gray-900 dark:text-white font-medium">{t.profile.textSize}</span>
            </div>
            <select
              value={textSize}
              onChange={(e) => setTextSize(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary font-bold border-none"
            >
              <option value="small">{language === 'ms' ? 'Kecil' : 'Small'}</option>
              <option value="medium">{language === 'ms' ? 'Sederhana' : 'Medium'}</option>
              <option value="large">{language === 'ms' ? 'Besar' : 'Large'}</option>
              <option value="extra-large">{language === 'ms' ? 'Sangat Besar' : 'Extra Large'}</option>
            </select>
          </Card>

          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">dark_mode</span>
              <span className="text-gray-900 dark:text-white font-medium">{t.profile.darkMode}</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold px-2 mb-3">
            {language === 'ms' ? 'Akaun' : 'Account'}
          </h3>

          <Card
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => navigate('/orders')}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">receipt_long</span>
              <span className="text-gray-900 dark:text-white font-medium">{t.orders.title}</span>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </Card>

          <Card className="p-4 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <span className="text-gray-900 dark:text-white font-medium">{t.profile.addresses}</span>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </Card>
        </div>

        <div className="mt-8">
          <Button variant="outline" size="lg" onClick={handleSignOut} className="w-full">
            <span className="material-symbols-outlined mr-2">logout</span>
            {t.auth.logout}
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
