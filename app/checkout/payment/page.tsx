"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPaymentPage() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState("cod");

    const methods = [
        {
            id: "cod",
            name: "Cash on Delivery",
            nameMalay: "Bayar Semasa Terima (COD)",
            description: "Bayar tunai kepada kurier",
            icon: "payments",
            color: "bg-green-500",
        },
        {
            id: "fpx",
            name: "Online Banking",
            nameMalay: "Perbankan Dalam Talian (FPX)",
            description: "Maybank2u, CIMB Clicks, etc.",
            icon: "account_balance",
            color: "bg-blue-500",
        },
        {
            id: "ewallet",
            name: "E-Wallet",
            nameMalay: "Dompet Digital",
            description: "Touch 'n Go, GrabPay, Boost",
            icon: "account_balance_wallet",
            color: "bg-orange-500",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-[#101922]">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        className="flex size-12 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-center">Kaedah Bayaran</h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 p-4 pb-32">
                <div className="space-y-4">
                    {methods.map((method) => (
                        <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-5 ${selectedMethod === method.id
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800"
                                }`}
                        >
                            <div className={`${method.color} h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                <span className="material-symbols-outlined text-3xl font-bold">
                                    {method.icon}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="font-black text-xl leading-tight mb-1">{method.nameMalay}</p>
                                <p className="text-gray-500 font-bold text-sm tracking-wide">{method.name}</p>
                                <p className="text-gray-400 text-xs mt-1">{method.description}</p>
                            </div>
                            {selectedMethod === method.id && (
                                <span className="material-symbols-outlined text-primary font-black text-3xl">
                                    check_circle
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1a2632] border-t border-gray-100 max-w-md mx-auto">
                <button
                    onClick={() => router.back()}
                    className="w-full h-16 bg-primary text-white text-xl font-black rounded-2xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all"
                >
                    PILIH KAEDAH INI
                </button>
            </div>
        </div>
    );
}
