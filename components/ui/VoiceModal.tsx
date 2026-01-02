"use client";

import { useEffect, useState } from "react";

interface VoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VoiceModal({ isOpen, onClose }: VoiceModalProps) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        if (isOpen) {
            setIsListening(true);
            setTranscript("Sedang mendengar... (Listening...)");

            // Simulate voice recognition
            const timers = [
                setTimeout(() => setTranscript("Cari..."), 1000),
                setTimeout(() => setTranscript('Cari "susu Omega"'), 2000),
                setTimeout(() => {
                    setIsListening(false);
                    setTranscript('Mencari "susu Omega"...');
                    setTimeout(onClose, 1000);
                }, 3500)
            ];

            return () => timers.forEach(clearTimeout);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
                className="w-full max-w-md bg-white dark:bg-[#1a2632] rounded-t-[40px] p-8 pb-12 shadow-2xl animate-[slide-up_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center">
                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-8"></div>

                    <div className="relative mb-10">
                        {isListening && (
                            <>
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150"></div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping scale-125 delay-700"></div>
                            </>
                        )}
                        <div className="relative h-32 w-32 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-800">
                            <span className="material-symbols-outlined text-6xl font-black">
                                {isListening ? "mic" : "search"}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-charcoal dark:text-white mb-2 text-center">
                        {isListening ? "Suara Sedia Membantu" : "Berjaya Dikesan"}
                    </h2>
                    <p className="text-xl font-bold text-primary mb-8 text-center italic">
                        "{transcript}"
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full h-16 bg-gray-100 dark:bg-slate-800 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all"
                    >
                        BATAL (CANCEL)
                    </button>
                </div>
            </div>
        </div>
    );
}
