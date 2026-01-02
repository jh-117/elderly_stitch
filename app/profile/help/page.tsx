"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function HelpPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqs = [
        { id: 1, question: t.help.faq_1_q, answer: t.help.faq_1_a },
        { id: 2, question: t.help.faq_2_q, answer: t.help.faq_2_a },
        { id: 3, question: t.help.faq_3_q, answer: t.help.faq_3_a },
        { id: 4, question: t.help.faq_4_q, answer: t.help.faq_4_a },
        { id: 5, question: t.help.faq_5_q, answer: t.help.faq_5_a },
    ];

    const handleCall = () => {
        window.open("tel:+60123456789", "_self");
    };

    const handleWhatsApp = () => {
        window.open("https://wa.me/60123456789", "_blank");
    };

    const handleEmail = () => {
        window.open("mailto:support@suarashop.com", "_self");
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
                        {t.help.title}
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Quick Actions */}
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        {t.help.contact_us}
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleCall}
                            className="flex flex-col items-center justify-center p-6 bg-primary text-white rounded-[24px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-3xl">phone</span>
                            </div>
                            <span className="font-bold text-lg">{t.help.phone}</span>
                        </button>
                        <button
                            onClick={handleWhatsApp}
                            className="flex flex-col items-center justify-center p-6 bg-[#25D366] text-white rounded-[24px] shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-3xl">chat</span>
                            </div>
                            <span className="font-bold text-lg">{t.help.whatsapp}</span>
                        </button>
                        <button
                            onClick={handleEmail}
                            className="flex flex-col items-center justify-center p-6 bg-blue-600 text-white rounded-[24px] shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-3xl">mail</span>
                            </div>
                            <span className="font-bold text-lg">{t.help.email}</span>
                        </button>
                        <button
                            onClick={() => alert("Live Chat feature coming soon!")}
                            className="flex flex-col items-center justify-center p-6 bg-purple-600 text-white rounded-[24px] shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-3xl">support_agent</span>
                            </div>
                            <span className="font-bold text-lg">{t.help.live_chat}</span>
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="px-4 pt-6">
                    <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        {t.help.faq}
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() =>
                                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                                    }
                                    className="w-full p-5 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                    <span className="font-bold text-charcoal dark:text-white pr-4">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`material-symbols-outlined text-primary transition-transform duration-300 ${expandedFaq === faq.id ? "rotate-180" : ""
                                            }`}
                                    >
                                        expand_more
                                    </span>
                                </button>
                                {expandedFaq === faq.id && (
                                    <div className="px-5 pb-5 pt-0 text-gray-600 dark:text-gray-400 animate-slide-down">
                                        <p className="pt-3 border-t border-gray-100 dark:border-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Help Resources */}
                <div className="p-4 mt-6">
                    <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        {t.help.other_resources}
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">play_circle</span>
                                </div>
                                <span className="font-bold">{t.help.tutorial}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">menu_book</span>
                                </div>
                                <span className="font-bold">{t.help.user_guide}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                        <button
                            onClick={() => alert("Redirecting to feedback form...")}
                            className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">feedback</span>
                                </div>
                                <span className="font-bold">{t.help.feedback}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
