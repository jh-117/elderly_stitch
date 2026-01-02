"use client";

import { useState } from "react";

interface FloatingAIButtonProps {
    onTriggerVoice?: () => void;
}

export default function FloatingAIButton({ onTriggerVoice }: FloatingAIButtonProps) {
    const [showChatbot, setShowChatbot] = useState(false);

    const handleVoiceClick = () => {
        if (onTriggerVoice) {
            onTriggerVoice();
        } else {
            setShowChatbot(true);
        }
    };

    return (
        <>
            <button
                onClick={handleVoiceClick}
                aria-label="AI Voice Assistant"
                className="fixed bottom-24 right-5 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-purple-500/40 hover:bg-purple-800 active:scale-90 transition-all border-2 border-white dark:border-gray-800"
            >
                <span className="material-symbols-outlined text-[32px]">mic</span>
            </button>

            {showChatbot && (
                <div className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md h-[500px] flex flex-col shadow-2xl">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-2xl">
                                        smart_toy
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">AI Pembantu</h3>
                                    <p className="text-xs text-gray-500">SuaraShop Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChatbot(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-3">
                                <p className="text-sm">
                                    Selamat datang! Saya adalah pembantu AI anda. Bagaimana saya boleh
                                    membantu anda hari ini?
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Welcome! I am your AI assistant. How can I help you today?
                                </p>
                            </div>

                            <div className="space-y-2">
                                <button className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <p className="text-sm font-medium">🔍 Cari produk</p>
                                    <p className="text-xs text-gray-500">Search for products</p>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <p className="text-sm font-medium">📦 Semak pesanan saya</p>
                                    <p className="text-xs text-gray-500">Check my orders</p>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <p className="text-sm font-medium">❓ Bantuan checkout</p>
                                    <p className="text-xs text-gray-500">Help with checkout</p>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Taip mesej anda..."
                                    className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-purple-800 transition-colors">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
