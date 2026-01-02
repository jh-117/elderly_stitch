"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

interface VoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VoiceModal({ isOpen, onClose }: VoiceModalProps) {
    const { t, language } = useTranslation();
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        if (isOpen) {
            setIsListening(true);
            setTranscript(t.voice.listening);

            const searchVal = language === 'malay' ? "susu Omega" : "Omega milk";

            // Simulate voice recognition
            const timers = [
                setTimeout(() => setTranscript(t.common.search + "..."), 1000),
                setTimeout(() => setTranscript(`${t.common.search} "${searchVal}"`), 2000),
                setTimeout(() => {
                    setIsListening(false);
                    setTranscript(`${t.voice.searching} "${searchVal}"...`);
                    // Functional Navigation: Navigate to search results
                    setTimeout(() => {
                        onClose();
                        router.push(`/search?q=${encodeURIComponent(searchVal)}`);
                    }, 1000);
                }, 3500)
            ];

            return () => timers.forEach(clearTimeout);
        }
    }, [isOpen, onClose, t, language, router]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
                className="w-full max-w-md bg-white dark:bg-[#1a2632] rounded-t-[48px] p-8 pb-12 shadow-2xl animate-[slide-up_0.3s_ease-out] border-t-8 border-primary"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center">
                    <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-10"></div>

                    <div className="relative mb-12">
                        {isListening && (
                            <>
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150"></div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping scale-125 delay-700"></div>
                            </>
                        )}
                        <div className="relative h-36 w-36 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl border-8 border-white dark:border-slate-800">
                            <span className="material-symbols-outlined text-7xl font-black">
                                {isListening ? "mic" : "search"}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-charcoal dark:text-white mb-3 text-center tracking-tight">
                        {isListening ? t.voice.assistant : t.voice.detected}
                    </h2>
                    <p className="text-2xl font-bold text-primary mb-10 text-center italic leading-relaxed">
                        "{transcript}"
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full h-20 bg-gray-50 dark:bg-slate-800 text-gray-400 font-black rounded-3xl hover:bg-gray-100 transition-all text-xl uppercase tracking-widest border-2 border-transparent active:border-gray-200"
                    >
                        {t.voice.cancel}
                    </button>
                </div>
            </div>
        </div>
    );
}
