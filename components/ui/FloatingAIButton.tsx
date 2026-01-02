"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

interface FloatingAIButtonProps {
    onTriggerVoice?: () => void;
}

export default function FloatingAIButton({ onTriggerVoice }: FloatingAIButtonProps) {
    const router = useRouter();
    const { t } = useTranslation();
    const [showChatbot, setShowChatbot] = useState(false);
    const [messages, setMessages] = useState<{ text: string, isBot: boolean }[]>([
        { text: t.ai.welcome, isBot: true }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleVoiceClick = () => {
        if (onTriggerVoice) {
            onTriggerVoice();
        } else {
            setShowChatbot(true);
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInputValue("");

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: t.ai.understanding,
                isBot: true
            }]);
        }, 1000);
    };

    const handleQuickAction = (action: string) => {
        setShowChatbot(false);
        if (action === "search") router.push("/search");
        if (action === "orders") router.push("/orders");
        if (action === "checkout") router.push("/cart");
    };

    return (
        <>
            <button
                onClick={handleVoiceClick}
                aria-label="AI Voice Assistant"
                className="fixed bottom-24 right-5 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-purple-500/40 hover:bg-purple-800 active:scale-90 transition-all border-2 border-white dark:border-gray-800"
            >
                <span className="material-symbols-outlined text-[32px]">mic</span>
            </button>

            {showChatbot && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end justify-center p-4 sm:p-6"
                    onClick={() => setShowChatbot(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 rounded-[32px] w-full max-w-lg h-[600px] flex flex-col shadow-2xl overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-primary/5">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                                    <span className="material-symbols-outlined text-white text-3xl">
                                        smart_toy
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-charcoal dark:text-white">
                                        {t.ai.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {t.ai.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChatbot(false)}
                                className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <span className="material-symbols-outlined text-gray-400">close</span>
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-950/50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl font-medium text-base shadow-sm ${msg.isBot
                                        ? "bg-white dark:bg-gray-800 text-charcoal dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-700"
                                        : "bg-primary text-white rounded-tr-none shadow-primary/20"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Quick Actions */}
                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={() => handleQuickAction("search")}
                                    className="w-full text-left p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all shadow-sm flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-primary">search</span>
                                    <span className="font-bold text-charcoal dark:text-white">{t.ai.search_products}</span>
                                </button>
                                <button
                                    onClick={() => handleQuickAction("orders")}
                                    className="w-full text-left p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all shadow-sm flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                                    <span className="font-bold text-charcoal dark:text-white">{t.ai.check_orders}</span>
                                </button>
                                <button
                                    onClick={() => handleQuickAction("checkout")}
                                    className="w-full text-left p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all shadow-sm flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-primary">shopping_cart_checkout</span>
                                    <span className="font-bold text-charcoal dark:text-white">{t.ai.checkout_help}</span>
                                </button>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={t.ai.type_message}
                                    className="flex-1 px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white focus:outline-none focus:border-primary transition-all font-medium"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-purple-800 shadow-lg shadow-primary/30 transition-all active:scale-90"
                                >
                                    <span className="material-symbols-outlined text-2xl font-bold">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
