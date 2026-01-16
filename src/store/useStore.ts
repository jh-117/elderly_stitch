import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  language: 'en' | 'ms';
  textSize: 'small' | 'medium' | 'large' | 'extra-large';
  darkMode: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  cartCount: number;
  voiceEnabled: boolean;
  chatOpen: boolean;

  setLanguage: (language: 'en' | 'ms') => void;
  setTextSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void;
  setDarkMode: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setCartCount: (count: number) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      language: 'en',
      textSize: 'medium',
      darkMode: false,
      highContrast: false,
      reducedMotion: false,
      cartCount: 0,
      voiceEnabled: false,
      chatOpen: false,

      setLanguage: (language) => set({ language }),
      setTextSize: (textSize) => set({ textSize }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setCartCount: (cartCount) => set({ cartCount }),
      setVoiceEnabled: (voiceEnabled) => set({ voiceEnabled }),
      setChatOpen: (chatOpen) => set({ chatOpen }),
    }),
    {
      name: 'suarashop-storage',
    }
  )
);
