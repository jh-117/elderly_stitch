import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

interface NavbarProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showTextSize?: boolean;
  showNotifications?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  showBack = false,
  showCart = false,
  showTextSize = false,
  showNotifications = false,
}) => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { cartCount, language } = useStore();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center p-4 justify-between h-16 max-w-md mx-auto">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
            aria-label={t.common.back}
          >
            <span className="material-symbols-outlined text-gray-900 dark:text-white text-[28px]">
              arrow_back
            </span>
          </button>
        ) : (
          <div className="flex-1">
            {profile && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t.home.greeting}
                </span>
                <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight">
                  {profile.full_name || 'User'}
                </h2>
              </div>
            )}
          </div>
        )}

        {title && (
          <h1 className="text-gray-900 dark:text-white text-xl font-bold leading-tight flex-1 text-center">
            {title}
          </h1>
        )}

        <div className="flex items-center justify-end gap-3">
          {showTextSize && (
            <button
              aria-label="Increase text size"
              className="flex items-center justify-center rounded-full h-12 w-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-3xl">text_increase</span>
            </button>
          )}

          {showNotifications && (
            <button
              aria-label="Notifications"
              className="flex items-center justify-center rounded-full h-12 w-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-3xl">notifications</span>
            </button>
          )}

          {showCart && (
            <button
              onClick={() => navigate('/cart')}
              aria-label="Cart"
              className="flex size-12 shrink-0 items-center justify-center rounded-full relative active:bg-gray-100 dark:active:bg-gray-700"
            >
              <span className="material-symbols-outlined text-gray-900 dark:text-white text-[28px]">
                shopping_cart
              </span>
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
