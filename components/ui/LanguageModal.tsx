"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { useTranslation } from "@/hooks/useTranslation";

interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
    const { language, setLanguage } = useSettingsStore();
    const { t } = useTranslation();

    if (!isOpen) return null;

    const languages = [
        { label: "Bahasa Melayu", sub: "Malay", value: "malay" },
        { label: "English", sub: "English", value: "english" },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg p-6" onClick={onClose}>
            <div
                className="w-full max-w-sm bg-white dark:bg-[#1a2632] rounded-[48px] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-[scale-up_0.25s_ease-out] border-4 border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center gap-6 mb-10 text-center">
                    <div className="h-24 w-24 bg-primary/10 text-primary rounded-[32px] flex items-center justify-center shadow-inner relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
                        <span className="material-symbols-outlined text-[56px] font-black relative z-10">language</span>
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-charcoal dark:text-white tracking-tighter mb-2">
                            {t.settings.language_select}
                        </h2>
                        <p className="text-xl text-gray-400 font-bold uppercase tracking-widest pl-1">
                            {language === 'malay' ? 'PILIHAN BAHASA' : 'LANGUAGE SETTINGS'}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    {languages.map((l) => (
                        <button
                            key={l.value}
                            onClick={() => setLanguage(l.value as any)}
                            className={`w-full p-6 rounded-[32px] border-4 flex items-center justify-between transition-all group ${language === l.value
                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]"
                                : "border-gray-50 dark:border-gray-800 hover:border-primary/20"
                                }`}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <span className={`font-black text-2xl tracking-tight ${language === l.value ? "text-primary" : "text-charcoal dark:text-white"}`}>
                                    {l.label}
                                </span>
                                <span className="text-base text-gray-400 font-bold uppercase tracking-widest">
                                    {l.sub}
                                </span>
                            </div>
                            {language === l.value && (
                                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                    <span className="material-symbols-outlined font-black">check</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full h-20 bg-primary text-white text-2xl font-black rounded-[28px] shadow-2xl shadow-primary/30 hover:bg-purple-800 active:scale-95 transition-all text-center flex items-center justify-center border-b-8 border-purple-900"
                >
                    {t.common.save.toUpperCase()}
                </button>
            </div>
        </div>
    );
}
