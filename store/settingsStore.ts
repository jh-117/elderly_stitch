import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
    darkMode: boolean;
    textSize: number; // 0: Normal, 1: Large, 2: Huge
    notifications: boolean;
    voiceGuide: boolean;
    language: 'malay' | 'english';
    isAiNavigating: boolean;
    lastAiSearchQuery: string;
    setDarkMode: (enabled: boolean) => void;
    setTextSize: (size: number) => void;
    setNotifications: (enabled: boolean) => void;
    setVoiceGuide: (enabled: boolean) => void;
    setLanguage: (lang: 'malay' | 'english') => void;
    setIsAiNavigating: (isNavigating: boolean) => void;
    setLastAiSearchQuery: (query: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            darkMode: false,
            textSize: 1, // Default to Large for elderly
            notifications: true,
            voiceGuide: true,
            language: 'malay',

            isAiNavigating: false,
            lastAiSearchQuery: '',

            setDarkMode: (darkMode) => set({ darkMode }),
            setTextSize: (textSize) => set({ textSize }),
            setNotifications: (notifications) => set({ notifications }),
            setVoiceGuide: (voiceGuide) => set({ voiceGuide }),
            setLanguage: (language) => set({ language }),
            setIsAiNavigating: (isAiNavigating) => set({ isAiNavigating }),
            setLastAiSearchQuery: (lastAiSearchQuery) => set({ lastAiSearchQuery }),
        }),
        {
            name: 'suarashop-settings',
        }
    )
);
