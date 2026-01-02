"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function CheckoutPaymentPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedMethod, setSelectedMethod] = useState("cod");

    const methods = [
        {
            id: "cod",
            name: t.checkout.cod_full,
            description: t.checkout.cod_subtitle,
            icon: "payments",
            color: "bg-green-500",
        },
        {
            id: "fpx",
            name: t.checkout.fpx,
            description: t.checkout.fpx_subtitle,
            icon: "account_balance",
            color: "bg-blue-500",
        },
        {
            id: "ewallet",
            name: t.checkout.ewallet,
            description: t.checkout.ewallet_subtitle,
            icon: "account_balance_wallet",
            color: "bg-orange-500",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-[#101922]">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>
                    <h1 className="text-2xl font-black flex-1 text-center tracking-tight">{t.checkout.select_payment}</h1>
                    <div className="w-14"></div>
                </div>
            </header>

            <main className="flex-1 p-6 pb-40">
                <div className="space-y-6">
                    {methods.map((method) => (
                        <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-6 rounded-[32px] border-4 transition-all cursor-pointer flex items-center gap-6 relative overflow-hidden ${selectedMethod === method.id
                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                : "border-white dark:border-gray-800 bg-white dark:bg-gray-800"
                                }`}
                        >
                            <div className={`${method.color} h-18 w-18 shrink-0 rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10`}>
                                <span className="material-symbols-outlined text-4xl font-black">
                                    {method.icon}
                                </span>
                            </div>
                            <div className="flex-1 relative z-10">
                                <p className={`font-black text-2xl leading-tight mb-1 ${selectedMethod === method.id ? "text-primary" : "text-charcoal dark:text-white"}`}>{method.name}</p>
                                <p className="text-gray-400 dark:text-gray-500 font-black text-sm uppercase tracking-[0.15em] mb-2">{method.id.toUpperCase()}</p>
                                <p className="text-gray-500 dark:text-gray-400 font-bold text-lg leading-tight">{method.description}</p>
                            </div>
                            {selectedMethod === method.id && (
                                <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce shrink-0 relative z-10">
                                    <span className="material-symbols-outlined text-3xl font-black">
                                        check
                                    </span>
                                </div>
                            )}

                            {selectedMethod === method.id && (
                                <div className="absolute right-0 top-0 opacity-5 translate-x-1/4 -translate-y-1/4">
                                    <span className="material-symbols-outlined text-[180px] font-black">{method.icon}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-xl border-t-2 border-gray-100 dark:border-gray-800 z-50">
                <button
                    onClick={() => router.back()}
                    className="w-full h-20 bg-primary text-white text-2xl font-black rounded-[32px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900"
                >
                    {t.checkout.select_this_method.toUpperCase()}
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </button>
            </div>
        </div>
    );
}
