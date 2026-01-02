"use client";

import { useSettingsStore } from "@/store/settingsStore";

interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
    const { language, setLanguage } = useSettingsStore();

    if (!isOpen) return null;

    const languages = [
        { label: "Bahasa Melayu", sub: "Malay", value: "malay" },
        { label: "English", sub: "English", value: "english" },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={onClose}>
            <div
                className="w-full max-w-sm bg-white dark:bg-[#1a2632] rounded-[32px] p-8 shadow-2xl animate-[scale-up_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-primary text-white rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">language</span>
                    </div>
                    <h2 className="text-2xl font-black text-charcoal dark:text-white">
                        {language === 'malay' ? 'Pilih Bahasa' : 'Select Language'}
                    </h2>
                </div>

                <div className="space-y-4 mb-10">
                    {languages.map((l) => (
                        <button
                            key={l.value}
                            onClick={() => setLanguage(l.value as any)}
                            className={`w-full p-5 rounded-2xl border-4 flex flex-col items-start transition-all ${language === l.value
                                ? "border-primary bg-primary/5 shadow-md"
                                : "border-gray-100 dark:border-gray-800"
                                }`}
                        >
                            <span className="font-black text-xl mb-1">
                                {l.label}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                                {l.sub}
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full h-18 bg-primary text-white text-xl font-black rounded-2xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all text-center flex items-center justify-center"
                >
                    {language === 'malay' ? 'SIMPAN (SAVE)' : 'SAVE (SIMPAN)'}
                </button>
            </div>
        </div>
    );
}
