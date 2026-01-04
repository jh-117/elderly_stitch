"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter, usePathname } from "next/navigation";
import { useSettingsStore } from "@/store/settingsStore";
import { products } from "@/data/products";

interface FloatingAIButtonProps {
    onTriggerVoice?: () => void;
}

export default function FloatingAIButton({ onTriggerVoice }: FloatingAIButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { t, language } = useTranslation();
    const { isAiNavigating, setIsAiNavigating, setLastAiSearchQuery } = useSettingsStore();

    const [showChatbot, setShowChatbot] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<{ text: string, isBot: boolean }[]>([
        { text: t.ai.welcome, isBot: true }
    ]);
    const [inputValue, setInputValue] = useState("");

    // Web Speech API references
    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    // Initial setup for Speech Recognition and Synthesis
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = language === 'malay' ? 'ms-MY' : 'en-US';

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    handleVoiceResult(transcript);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    setIsListening(false);
                };
            }
            synthRef.current = window.speechSynthesis;
        }
    }, [language]);

    // Guided prompt effect when arriving at product page via AI navigation
    useEffect(() => {
        if (isAiNavigating && pathname.includes("/products/detail/")) {
            // Trigger speech and show in chat
            const timer = setTimeout(() => {
                speak(t.ai.guided_prompt);
                setMessages(prev => [...prev, { text: t.ai.guided_prompt, isBot: true }]);
                setShowChatbot(true); // Open chatbot to show the message
                setIsAiNavigating(false); // Reset to avoid re-triggering
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [pathname, isAiNavigating, t.ai.guided_prompt, setIsAiNavigating]);

    const speak = (text: string) => {
        if (synthRef.current) {
            // Cancel any current speech
            synthRef.current.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'malay' ? 'ms-MY' : 'en-US';
            utterance.rate = 0.95; // Slightly slower for clarity
            synthRef.current.speak(utterance);
        }
    };

    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                speak(t.ai.listening);
            } catch (e) {
                console.error("Recognition already started", e);
            }
        }
    };

    const handleVoiceResult = (transcript: string) => {
        setMessages(prev => [...prev, { text: transcript, isBot: false }]);
        processQuery(transcript);
    };

    const processQuery = (query: string) => {
        const lowerQuery = query.toLowerCase();

        const malayKeywords = ["cari", "nak", "tengok", "beli"];
        const englishKeywords = ["search", "find", "looking for", "want", "buy"];
        const allKeywords = [...malayKeywords, ...englishKeywords];

        const isSearch = allKeywords.some(keyword => lowerQuery.includes(keyword));

        if (isSearch) {
            // Extract potential product name by removing generic keywords
            let searchTerms = lowerQuery;
            allKeywords.forEach(k => {
                const regex = new RegExp(`\\b${k}\\b`, 'gi');
                searchTerms = searchTerms.replace(regex, "");
            });
            searchTerms = searchTerms.trim();

            if (searchTerms) {
                findAndNavigate(searchTerms);
            } else {
                speak(t.ai.not_found);
                setMessages(prev => [...prev, { text: t.ai.not_found, isBot: true }]);
            }
        } else {
            // Generic understanding
            speak(t.ai.understanding);
            setMessages(prev => [...prev, { text: t.ai.understanding, isBot: true }]);
        }
    };

    const findAndNavigate = (query: string) => {
        // Find product in mock data
        const product = products.find(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.nameMalay.toLowerCase().includes(query.toLowerCase())
        );

        if (product) {
            speak(t.ai.processing);
            setIsAiNavigating(true);
            setLastAiSearchQuery(query);
            setShowChatbot(false);
            router.push(`/products/detail/${product.id}`);
        } else {
            speak(t.ai.not_found);
            setMessages(prev => [...prev, { text: t.ai.not_found, isBot: true }]);
        }
    };

    const handleVoiceClick = () => {
        if (onTriggerVoice) {
            onTriggerVoice();
        } else {
            setShowChatbot(true);
            // Auto-start listening if modal is opened via mic button
            setTimeout(startListening, 500);
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInputValue("");
        processQuery(userMsg);
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
                className={`absolute bottom-24 right-5 z-30 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl transition-all border-2 border-white dark:border-gray-800 ${isListening ? "bg-red-500 animate-pulse scale-110" : "bg-primary hover:bg-purple-800 active:scale-90"
                    }`}
            >
                <span className="material-symbols-outlined text-[32px]">
                    {isListening ? "settings_voice" : "mic"}
                </span>
            </button>

            {showChatbot && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end justify-center p-4 sm:p-6"
                    onClick={() => {
                        setShowChatbot(false);
                        setIsListening(false);
                        if (recognitionRef.current) recognitionRef.current.stop();
                    }}
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
                                        <span className={`h-2 w-2 rounded-full ${isListening ? "bg-red-500" : "bg-green-500"} animate-pulse`}></span>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {isListening ? t.ai.listening : t.ai.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setShowChatbot(false);
                                    setIsListening(false);
                                    if (recognitionRef.current) recognitionRef.current.stop();
                                }}
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

                            {isListening && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 flex gap-1">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}

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
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <div className="flex gap-3">
                                <button
                                    onClick={startListening}
                                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-primary/10 text-primary hover:bg-primary/20"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-2xl font-bold">
                                        {isListening ? "settings_voice" : "mic"}
                                    </span>
                                </button>
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
