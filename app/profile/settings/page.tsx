import { useSettingsStore } from "@/store/settingsStore";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function SettingsPage() {
    const router = useRouter();
    const {
        darkMode, setDarkMode,
        textSize, setTextSize,
        notifications, setNotifications,
        voiceGuide, setVoiceGuide,
        language, setLanguage
    } = useSettingsStore();

    const toggleSetting = (key: string) => {
        if (key === "darkMode") setDarkMode(!darkMode);
        if (key === "notifications") setNotifications(!notifications);
        if (key === "voiceGuide") setVoiceGuide(!voiceGuide);
        if (key === "largeText") setTextSize(textSize === 1 ? 0 : 1);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label="Go back"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span
                            className="material-symbols-outlined text-charcoal dark:text-white"
                            style={{ fontSize: "28px" }}
                        >
                            arrow_back
                        </span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                        Tetapan (Settings)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24">
                {/* Appearance Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 px-2 text-charcoal dark:text-white">
                        Penampilan (Appearance)
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">dark_mode</span>
                                <div>
                                    <p className="font-semibold">Mod Gelap (Dark Mode)</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Kurangkan kecerahan skrin
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("darkMode")}
                                className={`relative w-14 h-8 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : ""
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">
                                    text_increase
                                </span>
                                <div>
                                    <p className="font-semibold">Teks Besar (Large Text)</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Besarkan saiz fon
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("largeText")}
                                className={`relative w-14 h-8 rounded-full transition-colors ${textSize >= 1 ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${textSize >= 1 ? "translate-x-6" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accessibility Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 px-2 text-charcoal dark:text-white">
                        Kebolehcapaian (Accessibility)
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-primary">
                                    record_voice_over
                                </span>
                                <div>
                                    <p className="font-semibold">Panduan Suara (Voice Guide)</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Pembantu suara AI
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("voiceGuide")}
                                className={`relative w-14 h-8 rounded-full transition-colors ${voiceGuide ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${voiceGuide ? "translate-x-6" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 px-2 text-charcoal dark:text-white">
                        Pemberitahuan (Notifications)
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">
                                    notifications
                                </span>
                                <div>
                                    <p className="font-semibold">Notifikasi Push</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Terima kemas kini pesanan
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("notifications")}
                                className={`relative w-14 h-8 rounded-full transition-colors ${notifications
                                    ? "bg-primary"
                                    : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${notifications ? "translate-x-6" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Language Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 px-2 text-charcoal dark:text-white">
                        Bahasa (Language)
                    </h2>
                    <button className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl">language</span>
                            <div className="text-left">
                                <p className="font-semibold">Bahasa Melayu</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Malay / English
                                </p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                            chevron_right
                        </span>
                    </button>
                </div>

                {/* About Section */}
                <div>
                    <h2 className="text-lg font-bold mb-3 px-2 text-charcoal dark:text-white">
                        Tentang (About)
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">info</span>
                                <span className="font-semibold">Versi Aplikasi</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">1.0.0</span>
                        </button>
                        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">
                                    description
                                </span>
                                <span className="font-semibold">Terma & Syarat</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">
                                chevron_right
                            </span>
                        </button>
                        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl">
                                    privacy_tip
                                </span>
                                <span className="font-semibold">Dasar Privasi</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </>
    );
}
