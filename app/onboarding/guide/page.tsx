"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function GuidePage() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="flex h-screen flex-col items-center justify-between p-8 bg-white dark:bg-[#101922]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 bg-primary/10 rounded-[60px] flex items-center justify-center mb-12 relative shadow-inner">
                    <span className="material-symbols-outlined text-9xl text-primary animate-bounce font-black">
                        mic
                    </span>
                    <div className="absolute -inset-6 border-4 border-dashed border-primary/20 rounded-[70px] animate-[spin_15s_linear_infinite]"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-[55px] animate-pulse"></div>
                </div>

                <h2 className="text-4xl font-black text-charcoal dark:text-white mb-8 tracking-tighter">
                    {t.onboarding.guide_title}
                </h2>

                <div className="space-y-8 text-left w-full max-w-sm">
                    <div className="flex items-start gap-5 p-4 rounded-[32px] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
                        <div className="h-12 w-12 shrink-0 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/30">1</div>
                        <div>
                            <p className="font-black text-xl text-charcoal dark:text-white leading-tight">{t.onboarding.guide_step1}</p>
                            <p className="text-gray-500 dark:text-gray-400 font-bold mt-1">{t.onboarding.guide_step1_desc}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5 p-4 rounded-[32px] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
                        <div className="h-12 w-12 shrink-0 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/30">2</div>
                        <div>
                            <p className="font-black text-xl text-charcoal dark:text-white leading-tight">{t.onboarding.guide_step2}</p>
                            <p className="text-gray-500 dark:text-gray-400 font-bold mt-1">{t.onboarding.guide_step2_desc}</p>
                        </div>
                    </div>

                    <div className="bg-primary/10 p-6 rounded-[32px] border-2 border-primary/20 italic text-center shadow-xl shadow-primary/5">
                        <p className="text-2xl font-black text-primary leading-relaxed">
                            "{t.onboarding.guide_example}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 pb-12">
                <button
                    onClick={() => router.push("/onboarding/start")}
                    className="w-full h-20 bg-primary text-white text-2xl font-black rounded-[32px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center group"
                >
                    {t.onboarding.next}
                    <span className="material-symbols-outlined text-3xl ml-3 group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
                <button
                    onClick={() => router.back()}
                    className="w-full h-14 text-gray-400 font-black text-xl uppercase tracking-widest active:bg-gray-50 dark:active:bg-gray-800 rounded-2xl transition-all"
                >
                    {t.common.back}
                </button>
            </div>
        </div>
    );
}
