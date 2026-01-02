"use client";

import { useSettingsStore } from "@/store/settingsStore";

interface TextSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TextSizeModal({ isOpen, onClose }: TextSizeModalProps) {
    const { textSize, setTextSize } = useSettingsStore();

    if (!isOpen) return null;

    const sizes = [
        { label: "Biasa (Normal)", desc: "Standard text size", value: 0 },
        { label: "Besar (Large)", desc: "Recommended for readability", value: 1 },
        { label: "Sangat Besar (Huge)", desc: "Maximum accessibility", value: 2 },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={onClose}>
            <div
                className="w-full max-w-sm bg-white dark:bg-[#1a2632] rounded-[32px] p-8 shadow-2xl animate-[scale-up_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-primary text-white rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">format_size</span>
                    </div>
                    <h2 className="text-2xl font-black text-charcoal dark:text-white">Saiz Tulisan</h2>
                </div>

                <div className="space-y-4 mb-10">
                    {sizes.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => setTextSize(s.value)}
                            className={`w-full p-5 rounded-2xl border-4 flex flex-col items-start transition-all ${textSize === s.value
                                ? "border-primary bg-primary/5 shadow-md"
                                : "border-gray-100 dark:border-gray-800"
                                }`}
                        >
                            <span className={`font-black mb-1 ${s.value === 0 ? "text-lg" : s.value === 1 ? "text-xl" : "text-2xl"
                                }`}>
                                {s.label}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                                {s.desc}
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full h-18 bg-primary text-white text-xl font-black rounded-2xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all"
                >
                    SIMPAN (SAVE)
                </button>
            </div>
        </div>
    );
}
