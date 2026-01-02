"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-white dark:bg-[#101922] text-center">
            <div className="w-48 h-48 mb-10 relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-2xl border-8 border-white dark:border-slate-800">
                    <span className="material-symbols-outlined text-9xl text-white font-black animate-[scale_0.5s_ease-out]">
                        check
                    </span>
                </div>
            </div>

            <h1 className="text-4xl font-black text-charcoal dark:text-white mb-4">
                Pesanan Berjaya!
            </h1>
            <p className="text-2xl font-bold text-gray-500 mb-8 max-w-xs">
                Terima kasih! Pesanan anda sedang diproses.
            </p>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 mb-12 w-full max-w-xs border-2 border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Kod Pesanan (Order Code)</p>
                <p className="text-3xl font-black text-primary tracking-tighter">#ORD-2024-001</p>
            </div>

            <div className="w-full space-y-4">
                <button
                    onClick={() => router.push("/orders/ORD-2024-001")}
                    className="w-full h-18 bg-primary text-white text-xl font-black rounded-2xl shadow-lg hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    LIHAT PESANAN (VIEW ORDER)
                    <span className="material-symbols-outlined">receipt_long</span>
                </button>
                <button
                    onClick={() => router.push("/home")}
                    className="w-full h-16 bg-white dark:bg-slate-800 text-primary border-4 border-primary text-xl font-bold rounded-2xl hover:bg-primary/5 active:scale-95 transition-all"
                >
                    KEMBALI KE LAMAN UTAMA
                </button>
            </div>
        </div>
    );
}
