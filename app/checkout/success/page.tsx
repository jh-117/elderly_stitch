"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-white dark:bg-[#101922] text-center">
            <div className="w-56 h-56 mb-12 relative">
                <div className="absolute inset-0 bg-green-500/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute -inset-8 bg-green-500/5 rounded-full scale-110 animate-ping delay-700"></div>
                <div className="relative w-full h-full bg-green-500 rounded-[64px] flex items-center justify-center shadow-2xl border-8 border-white dark:border-slate-800">
                    <span className="material-symbols-outlined text-[120px] text-white font-black animate-[scale_0.5s_ease-out]">
                        check
                    </span>
                </div>
            </div>

            <div className="space-y-4 mb-12">
                <h1 className="text-5xl font-black text-charcoal dark:text-white tracking-tighter leading-tight">
                    {t.checkout.order_success_title}
                </h1>
                <p className="text-2xl font-bold text-gray-400 max-w-xs mx-auto leading-relaxed">
                    {t.checkout.order_success_desc}
                </p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-[40px] p-8 mb-16 w-full max-w-sm border-4 border-dashed border-gray-100 dark:border-gray-700 shadow-inner group">
                <p className="text-sm text-gray-400 font-black uppercase tracking-[0.3em] mb-3">{t.checkout.order_code.toUpperCase()}</p>
                <p className="text-4xl font-black text-primary tracking-tight group-hover:scale-110 transition-transform duration-500">#ORD-2024-001</p>
            </div>

            <div className="w-full space-y-5">
                <button
                    onClick={() => router.push("/orders/ORD-2024-001")}
                    className="w-full h-24 bg-primary text-white text-2xl font-black rounded-[32px] shadow-[0_24px_48px_-12px_rgba(107,33,168,0.5)] hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900 group"
                >
                    {t.checkout.view_order.toUpperCase()}
                    <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">receipt_long</span>
                </button>
                <button
                    onClick={() => router.push("/home")}
                    className="w-full h-20 bg-white dark:bg-slate-800 text-primary border-4 border-primary text-xl font-black rounded-[32px] hover:bg-primary/5 active:scale-95 transition-all uppercase tracking-tight"
                >
                    {t.checkout.back_to_home}
                </button>
            </div>
        </div>
    );
}
