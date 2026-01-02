"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function StartPage() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="flex h-screen flex-col items-center justify-between p-8 bg-white dark:bg-[#101922]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-56 h-56 mb-16 relative">
                    <div className="absolute inset-0 bg-green-500/5 rounded-full scale-150 animate-pulse"></div>
                    <div className="absolute -inset-8 bg-green-500/10 rounded-full scale-110 animate-ping delay-1000"></div>
                    <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-[64px] shadow-2xl flex items-center justify-center border-8 border-green-500/10 scale-110">
                        <span className="material-symbols-outlined text-[120px] text-green-500 font-black">
                            check_circle
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-5xl font-black text-charcoal dark:text-white tracking-tighter leading-tight">
                        {t.onboarding.ready}
                    </h2>
                    <p className="text-2xl text-gray-500 dark:text-gray-400 font-bold max-w-xs mx-auto leading-relaxed">
                        {t.onboarding.ready_desc}
                    </p>
                </div>
            </div>

            <div className="w-full flex flex-col gap-5 pb-10">
                <button
                    onClick={() => router.push("/auth/login")}
                    className="w-full h-24 bg-primary text-white text-3xl font-black rounded-[40px] shadow-[0_24px_48px_-12px_rgba(107,33,168,0.5)] hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-6 border-b-[12px] border-purple-900"
                >
                    {t.common.login.toUpperCase()}
                    <span className="material-symbols-outlined text-4xl font-black">login</span>
                </button>

                <div className="flex items-center gap-6 py-4">
                    <div className="h-0.5 flex-1 bg-gray-100 dark:bg-gray-800"></div>
                    <span className="text-gray-300 dark:text-gray-600 text-sm font-black uppercase tracking-[0.3em]">{t.common.or}</span>
                    <div className="h-0.5 flex-1 bg-gray-100 dark:bg-gray-800"></div>
                </div>

                <button
                    onClick={() => router.push("/auth/register")}
                    className="w-full h-20 bg-white dark:bg-slate-800 text-primary border-[6px] border-primary text-2xl font-black rounded-[40px] shadow-xl hover:bg-primary/5 active:scale-95 transition-all"
                >
                    {t.common.register.toUpperCase()}
                </button>
            </div>
        </div>
    );
}
