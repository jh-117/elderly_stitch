import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthStore {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,

            login: async (email, password) => {
                // Mock login - in real app, call API
                await new Promise(resolve => setTimeout(resolve, 1000));

                // For demo, accept any email/password
                const mockUser: User = {
                    id: '1',
                    name: 'Ah Hock',
                    email: email,
                    phone: '+60123456789',
                    avatar: undefined,
                };

                set({ user: mockUser, isLoggedIn: true });
                return true;
            },

            register: async (name, email, password, phone) => {
                // Mock registration - in real app, call API
                await new Promise(resolve => setTimeout(resolve, 1000));

                const mockUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    name,
                    email,
                    phone,
                    avatar: undefined,
                };

                set({ user: mockUser, isLoggedIn: true });
                return true;
            },

            logout: () => {
                set({ user: null, isLoggedIn: false });
            },

            updateProfile: (updates) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({ user: { ...currentUser, ...updates } });
                }
            },
        }),
        {
            name: 'suarashop-auth',
        }
    )
);
