import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
    darkMode: boolean;
    textSize: number; // 0: Normal, 1: Large, 2: Huge
    notifications: boolean;
    voiceGuide: boolean;
    language: 'malay' | 'english';
    setDarkMode: (enabled: boolean) => void;
    setTextSize: (size: number) => void;
    setNotifications: (enabled: boolean) => void;
    setVoiceGuide: (enabled: boolean) => void;
    setLanguage: (lang: 'malay' | 'english') => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            darkMode: false,
            textSize: 1, // Default to Large for elderly
            notifications: true,
            voiceGuide: true,
            language: 'malay',

            setDarkMode: (darkMode) => set({ darkMode }),
            setTextSize: (textSize) => set({ textSize }),
            setNotifications: (notifications) => set({ notifications }),
            setVoiceGuide: (voiceGuide) => set({ voiceGuide }),
            setLanguage: (language) => set({ language }),
        }),
        {
            name: 'suarashop-settings',
        }
    )
);
