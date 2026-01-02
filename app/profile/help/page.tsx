"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function HelpPage() {
    const router = useRouter();
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            question: "Bagaimana cara membuat pesanan?",
            questionEn: "How to place an order?",
            answer: "Pilih produk yang anda inginkan, tambah ke troli, dan ikuti proses pembayaran. Anda boleh menggunakan pembantu suara AI untuk bantuan.",
        },
        {
            id: 2,
            question: "Cara pembayaran yang diterima?",
            questionEn: "Accepted payment methods?",
            answer: "Kami menerima pembayaran melalui kad kredit/debit, FPX Online Banking, e-wallet (Touch 'n Go, GrabPay, Boost), dan tunai semasa penghantaran (COD).",
        },
        {
            id: 3,
            question: "Berapa lama masa penghantaran?",
            questionEn: "How long is delivery?",
            answer: "Penghantaran standard mengambil masa 3-5 hari bekerja. Penghantaran ekspres tersedia untuk kawasan tertentu (1-2 hari bekerja).",
        },
        {
            id: 4,
            question: "Bolehkah saya batalkan pesanan?",
            questionEn: "Can I cancel my order?",
            answer: "Pesanan boleh dibatalkan dalam masa 1 jam selepas dibuat. Selepas itu, sila hubungi perkhidmatan pelanggan kami.",
        },
        {
            id: 5,
            question: "Bagaimana cara menggunakan pembantu suara AI?",
            questionEn: "How to use AI voice assistant?",
            answer: "Tekan butang mikrofon di mana-mana bahagian aplikasi dan berikan arahan menggunakan suara anda. AI akan membantu anda mencari produk dan melengkapkan pesanan.",
        },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label="Go back"
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
                        Bantuan (Help Center)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Quick Actions */}
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Hubungi Kami (Contact Us)
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center p-4 bg-primary text-white rounded-2xl shadow-lg hover:bg-purple-800 transition-colors">
                            <span className="material-symbols-outlined text-4xl mb-2">
                                phone
                            </span>
                            <span className="font-semibold">Telefon</span>
                            <span className="text-xs opacity-90">Call</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 transition-colors">
                            <span className="material-symbols-outlined text-4xl mb-2">
                                chat
                            </span>
                            <span className="font-semibold">WhatsApp</span>
                            <span className="text-xs opacity-90">Chat</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
                            <span className="material-symbols-outlined text-4xl mb-2">
                                mail
                            </span>
                            <span className="font-semibold">E-mel</span>
                            <span className="text-xs opacity-90">Email</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 transition-colors">
                            <span className="material-symbols-outlined text-4xl mb-2">
                                support_agent
                            </span>
                            <span className="font-semibold">Live Chat</span>
                            <span className="text-xs opacity-90">Online</span>
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="px-4 pt-6">
                    <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Soalan Lazim (FAQ)
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                            >
                                <button
                                    onClick={() =>
                                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                                    }
                                    className="w-full p-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                    <div className="flex-1 pr-4">
                                        <p className="font-semibold text-charcoal dark:text-white mb-1">
                                            {faq.question}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {faq.questionEn}
                                        </p>
                                    </div>
                                    <span
                                        className={`material-symbols-outlined text-gray-400 transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""
                                            }`}
                                    >
                                        expand_more
                                    </span>
                                </button>
                                {expandedFaq === faq.id && (
                                    <div className="px-4 pb-4 pt-0 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
                                        <p className="pt-3">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Help Resources */}
                <div className="p-4 mt-6">
                    <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Sumber Lain (Other Resources)
                    </h2>
                    <div className="space-y-2">
                        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-primary">
                                    play_circle
                                </span>
                                <span className="font-semibold">Tutorial Video</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">
                                chevron_right
                            </span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-primary">
                                    menu_book
                                </span>
                                <span className="font-semibold">Panduan Pengguna (User Guide)</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">
                                chevron_right
                            </span>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-primary">
                                    feedback
                                </span>
                                <span className="font-semibold">Hantar Maklum Balas (Feedback)</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </>
    );
}
