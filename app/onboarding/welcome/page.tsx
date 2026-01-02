"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function WelcomePage() {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="flex h-screen flex-col items-center justify-between p-8 bg-white dark:bg-[#101922]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative w-64 h-64 mb-16">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <div className="absolute -inset-4 bg-primary/5 rounded-full animate-ping delay-700"></div>
                    <div className="relative w-full h-full rounded-[60px] bg-white dark:bg-slate-800 shadow-[0_32px_64px_-16px_rgba(107,33,168,0.2)] flex items-center justify-center overflow-hidden border-8 border-white dark:border-gray-800">
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover scale-110"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg_b-R85efu0k57InbpepyrZJHO4aZrq6BqBEGwylGdbSl3nV11MXJv0VvUr7MiuIO2bt0pd_fiLtWFksxZm-EXzQ8ICHgmjdMSn9UqiuAgc9rXPnr7pzActS5Vv1eN8TeuSpXFhi1KV2439T0a5GwEA8YxLg2ra7X8vYT7cEJtaqtgG9P34_E3TU3VEmdGfZeIjzltnLt4PKiXuWr6ZdHaXyHnjtHacXRmGKbPcX3OtFo9tDwQITKpmxhwKp8uz_QhXcr_f4jVA")`,
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-5xl font-black text-charcoal dark:text-white leading-[1.1] tracking-tighter">
                        {t.onboarding.welcome} <br />
                        <span className="text-primary">SuaraShop</span>
                    </h1>
                    <p className="text-2xl text-gray-500 dark:text-gray-400 font-bold leading-relaxed max-w-sm mx-auto">
                        {t.onboarding.desc}
                    </p>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 pb-12">
                <button
                    onClick={() => router.push("/onboarding/guide")}
                    className="w-full h-20 bg-primary text-white text-2xl font-black rounded-[32px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 group"
                >
                    {t.onboarding.start}
                    <span className="material-symbols-outlined text-3xl font-black group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
