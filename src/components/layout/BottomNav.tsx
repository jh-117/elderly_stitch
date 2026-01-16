import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, cartCount } = useStore();
  const t = translations[language];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        <button
          onClick={() => navigate('/')}
          className={clsx(
            'flex flex-col items-center justify-center w-20 py-1 gap-1 transition-colors',
            isActive('/') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          )}
        >
          <span className="material-symbols-outlined text-3xl">home</span>
          <span className="text-xs font-medium">{t.nav.home}</span>
        </button>

        <button
          onClick={() => navigate('/cart')}
          className={clsx(
            'flex flex-col items-center justify-center w-20 py-1 gap-1 relative transition-colors',
            isActive('/cart') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          )}
        >
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          <span className="text-xs font-medium">{t.nav.cart}</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-6 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>

        <button
          onClick={() => navigate('/orders')}
          className={clsx(
            'flex flex-col items-center justify-center w-20 py-1 gap-1 transition-colors',
            isActive('/orders') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          )}
        >
          <span className="material-symbols-outlined text-3xl">receipt_long</span>
          <span className="text-xs font-medium">{t.nav.orders}</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={clsx(
            'flex flex-col items-center justify-center w-20 py-1 gap-1 transition-colors',
            isActive('/profile') ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
          )}
        >
          <span className="material-symbols-outlined text-3xl">person</span>
          <span className="text-xs font-medium">{t.nav.profile}</span>
        </button>
      </div>
    </nav>
  );
};
