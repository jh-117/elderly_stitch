"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    return (
        <>
            <header className="bg-primary text-white p-6 pb-8">
                <h1 className="text-2xl font-bold">Profil Saya (My Profile)</h1>
            </header>

            <main className="flex-1 -mt-4 pb-24">
                {/* Profile Card */}
                <div className="mx-4 mb-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-primary">
                                person
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{user?.name || "Guest User"}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                {user?.phone}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="px-4 space-y-2">
                    <button
                        onClick={() => router.push("/profile/edit")}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">edit</span>
                            <span className="font-medium">Edit Profil (Edit Profile)</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                            chevron_right
                        </span>
                    </button>

                    <button
                        onClick={() => router.push("/orders")}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">
                                receipt_long
                            </span>
                            <span className="font-medium">Pesanan Saya (My Orders)</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                            chevron_right
                        </span>
                    </button>

                    <button
                        onClick={() => router.push("/profile/addresses")}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">
                                location_on
                            </span>
                            <span className="font-medium">Alamat (Addresses)</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                            chevron_right
                        </span>
                    </button>

                    <button
                        onClick={() => router.push("/profile/settings")}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">settings</span>
                            <span className="font-medium">Tetapan (Settings)</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                            chevron_right
                        </span>
                    </button>

                    <button
                        onClick={() => router.push("/profile/help")}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">help</span>
                            <span className="font-medium">Bantuan (Help)</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                            chevron_right
                        </span>
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            router.push("/");
                        }}
                        className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl text-red-500">
                                logout
                            </span>
                            <span className="font-medium text-red-500">
                                Log Keluar (Logout)
                            </span>
                        </div>
                    </button>
                </div>
            </main>

            <BottomNav />
        </>
    );
}
