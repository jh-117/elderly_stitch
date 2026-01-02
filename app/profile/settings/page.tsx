"use client";

import { useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import TextSizeModal from "@/components/ui/TextSizeModal";
import LanguageModal from "@/components/ui/LanguageModal";
import { useTranslation } from "@/hooks/useTranslation";

export default function SettingsPage() {
    const router = useRouter();
    const { t, language } = useTranslation();
    const [isTextSizeOpen, setIsTextSizeOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const {
        darkMode, setDarkMode,
        textSize,
        notifications, setNotifications,
        voiceGuide, setVoiceGuide
    } = useSettingsStore();

    const toggleSetting = (key: string) => {
        if (key === "darkMode") setDarkMode(!darkMode);
        if (key === "notifications") setNotifications(!notifications);
        if (key === "voiceGuide") setVoiceGuide(!voiceGuide);
    };

    const getTextSizeLabel = () => {
        if (textSize === 0) return t.settings.text_size_normal;
        if (textSize === 1) return t.settings.text_size_large;
        return t.settings.text_size_huge;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
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
                        {t.settings.title}
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
                {/* Appearance Section */}
                <div>
                    <h2 className="text-lg font-black mb-3 px-2 text-charcoal dark:text-white uppercase tracking-wider opacity-60">
                        {t.settings.appearance}
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">dark_mode</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{t.settings.dark_mode}</p>
                                    <p className="text-sm text-gray-500 font-medium tracking-tight">
                                        {t.settings.dark_mode_desc}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("darkMode")}
                                className={`relative w-16 h-9 rounded-full transition-all duration-300 ${darkMode ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 ${darkMode ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>

                        <div
                            className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsTextSizeOpen(true)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">text_increase</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{t.settings.text_size}</p>
                                    <p className="text-sm text-primary font-bold">
                                        {getTextSizeLabel()}
                                    </p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                        </div>
                    </div>
                </div>

                {/* Accessibility Section */}
                <div>
                    <h2 className="text-lg font-black mb-3 px-2 text-charcoal dark:text-white uppercase tracking-wider opacity-60">
                        {t.settings.accessibility}
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl font-bold">record_voice_over</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{t.settings.voice_guide}</p>
                                    <p className="text-sm text-gray-500 font-medium tracking-tight">
                                        {t.settings.voice_guide_desc}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("voiceGuide")}
                                className={`relative w-16 h-9 rounded-full transition-all duration-300 ${voiceGuide ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 ${voiceGuide ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div>
                    <h2 className="text-lg font-black mb-3 px-2 text-charcoal dark:text-white uppercase tracking-wider opacity-60">
                        {t.settings.notifications}
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">notifications</span>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{t.settings.notifications}</p>
                                    <p className="text-sm text-gray-500 font-medium tracking-tight">
                                        {t.settings.notifications_desc}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting("notifications")}
                                className={`relative w-16 h-9 rounded-full transition-all duration-300 ${notifications ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 ${notifications ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Language Section */}
                <div>
                    <h2 className="text-lg font-black mb-3 px-2 text-charcoal dark:text-white uppercase tracking-wider opacity-60">
                        {t.settings.language}
                    </h2>
                    <button
                        onClick={() => setIsLanguageOpen(true)}
                        className="w-full bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl font-bold">language</span>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-lg">{language === 'malay' ? 'Bahasa Melayu' : 'English'}</p>
                                <p className="text-sm text-primary font-bold">
                                    {language === 'malay' ? 'Malay' : 'English'}
                                </p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </button>
                </div>

                {/* About Section */}
                <div className="pb-8">
                    <h2 className="text-lg font-black mb-3 px-2 text-charcoal dark:text-white uppercase tracking-wider opacity-60">
                        {t.settings.about}
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                        <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <span className="material-symbols-outlined text-2xl">info</span>
                                </div>
                                <span className="font-bold">{t.settings.app_version}</span>
                            </div>
                            <span className="text-gray-500 font-bold">1.2.0</span>
                        </button>
                        <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <span className="material-symbols-outlined text-2xl">description</span>
                                </div>
                                <span className="font-bold">Terms & Conditions</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>

            {isTextSizeOpen && (
                <TextSizeModal
                    isOpen={isTextSizeOpen}
                    onClose={() => setIsTextSizeOpen(false)}
                />
            )}

            {isLanguageOpen && (
                <LanguageModal
                    isOpen={isLanguageOpen}
                    onClose={() => setIsLanguageOpen(false)}
                />
            )}

            <BottomNav />
        </div>
    );
}
