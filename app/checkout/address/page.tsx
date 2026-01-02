"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function CheckoutAddressPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [selectedId, setSelectedId] = useState("1");

    const addresses = [
        {
            id: "1",
            label: t.checkout.home_label,
            name: "Ah Hock",
            phone: "+60123456789",
            address: "123, Jalan Bahagia, Taman Sejahtera, 50000 Kuala Lumpur",
            isDefault: true,
            icon: "home"
        },
        {
            id: "2",
            label: t.checkout.office_label,
            name: "Ah Hock",
            phone: "+60123456789",
            address: "Level 10, Wisma Merchant, Bukit Bintang, 55100 Kuala Lumpur",
            isDefault: false,
            icon: "work"
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
                    <h1 className="text-2xl font-black flex-1 text-center tracking-tight">{t.checkout.select_address}</h1>
                    <div className="w-14"></div>
                </div>
            </header>

            <main className="flex-1 p-6 pb-40">
                <div className="space-y-6">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            onClick={() => setSelectedId(addr.id)}
                            className={`p-6 rounded-[32px] border-4 transition-all cursor-pointer relative overflow-hidden group ${selectedId === addr.id
                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                                : "border-white dark:border-gray-800 bg-white dark:bg-gray-800"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${selectedId === addr.id ? "bg-primary text-white" : "bg-gray-50 dark:bg-gray-700 text-gray-400"}`}>
                                        <span className="material-symbols-outlined text-3xl font-bold">
                                            {addr.icon}
                                        </span>
                                    </div>
                                    <span className={`font-black text-xl uppercase tracking-widest ${selectedId === addr.id ? "text-primary" : "text-gray-400"}`}>
                                        {addr.label}
                                    </span>
                                </div>
                                {selectedId === addr.id && (
                                    <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                        <span className="material-symbols-outlined text-2xl font-black">
                                            check
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2 relative z-10">
                                <p className="font-black text-2xl text-charcoal dark:text-white">{addr.name}</p>
                                <p className="text-gray-400 dark:text-gray-500 font-black tracking-wider text-lg">{addr.phone}</p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-bold text-lg pt-2 border-t-2 border-gray-50 dark:border-gray-700 mt-4">
                                    {addr.address}
                                </p>
                            </div>

                            {selectedId === addr.id && (
                                <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                                    <span className="material-symbols-outlined text-[160px] font-black">{addr.icon}</span>
                                </div>
                            )}
                        </div>
                    ))}

                    <button className="w-full h-24 border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-[32px] flex items-center justify-center gap-5 text-gray-400 font-black hover:bg-white transition-all hover:border-primary/30 group active:scale-95">
                        <span className="material-symbols-outlined text-4xl group-hover:scale-125 transition-transform">add_circle</span>
                        <span className="text-xl uppercase tracking-widest leading-none pt-1">{t.checkout.add_new_address}</span>
                    </button>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-xl border-t-2 border-gray-100 dark:border-gray-800 z-50">
                <button
                    onClick={() => router.back()}
                    className="w-full h-20 bg-primary text-white text-2xl font-black rounded-[32px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900"
                >
                    {t.checkout.select_this_address.toUpperCase()}
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </button>
            </div>
        </div>
    );
}
