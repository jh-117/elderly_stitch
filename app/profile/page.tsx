"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProfilePage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    const menuItems = [
        {
            icon: "person",
            label: t.profile.edit_profile,
            path: "/profile/edit",
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            icon: "location_on",
            label: t.profile.addresses,
            path: "/profile/addresses",
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-900/20"
        },
        {
            icon: "settings",
            label: t.profile.settings,
            path: "/profile/settings",
            color: "text-gray-500",
            bg: "bg-gray-50 dark:bg-gray-700"
        },
        {
            icon: "help",
            label: t.profile.help_center,
            path: "/profile/help",
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/20"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            <header className="bg-white dark:bg-[#1a2632] p-6 pt-12 pb-8 rounded-b-[40px] shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-[32px] bg-primary/10 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-5xl text-primary font-bold">person</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-black text-charcoal dark:text-white leading-tight">
                            {user?.name || "Pengguna SuaraShop"}
                        </h1>
                        <p className="text-lg font-bold text-primary mt-1 opacity-80 uppercase tracking-wider">
                            {user?.email || "user@example.com"}
                        </p>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 space-y-4 pb-24">
                <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => router.push(item.path)}
                            className={`w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-b border-gray-50 dark:border-gray-700 last:border-0 group`}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`h-12 w-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined text-3xl font-bold">{item.icon}</span>
                                </div>
                                <span className="text-xl font-bold text-charcoal dark:text-white">{item.label}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-4 flex items-center justify-center gap-3 p-6 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-[28px] font-black text-xl hover:bg-red-100 transition-all border-2 border-transparent hover:border-red-200"
                >
                    <span className="material-symbols-outlined font-black">logout</span>
                    {t.profile.logout}
                </button>
            </main>

            <BottomNav />
        </div>
    );
}
