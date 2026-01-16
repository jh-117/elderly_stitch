import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { language } = useStore();
  const t = translations[language];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark max-w-md mx-auto">
      <div className="p-4 pt-6">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[240px] shadow-sm relative"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(109, 40, 217, 0) 0%, rgba(109, 40, 217, 0.4) 100%), url(https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800)',
          }}
        >
          <div className="flex flex-col p-6 w-full bg-gradient-to-t from-black/60 to-transparent">
            <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight drop-shadow-md">
              {language === 'ms' ? 'Selamat Datang' : 'Welcome'}
            </h1>
            <p className="text-white/90 text-lg font-medium mt-1 drop-shadow-md">
              {language === 'ms' ? 'Daftar akaun baru' : 'Create a new account'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-8">
        <h2 className="text-gray-900 dark:text-white tracking-tight text-[24px] font-bold leading-tight py-4">
          {t.auth.signup}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label={language === 'ms' ? 'Nama Penuh' : 'Full Name'}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={language === 'ms' ? 'Nama anda' : 'Your name'}
            icon={<span className="material-symbols-outlined text-2xl">person</span>}
            required
          />

          <Input
            label={t.auth.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            icon={<span className="material-symbols-outlined text-2xl">email</span>}
            required
          />

          <Input
            label={t.auth.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.auth.password}
            icon={<span className="material-symbols-outlined text-2xl">lock</span>}
            required
          />

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? t.common.loading : t.auth.signup}
          </Button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-base font-medium">
              {t.auth.haveAccount}
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate('/login')}
          >
            {t.auth.login}
          </Button>
        </form>
      </div>
    </div>
  );
};
