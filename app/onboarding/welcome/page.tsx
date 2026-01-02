"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col items-center justify-between p-8 bg-white dark:bg-[#101922]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative w-48 h-48 mb-12">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full rounded-3xl bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-primary/10">
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg_b-R85efu0k57InbpepyrZJHO4aZrq6BqBEGwylGdbSl3nV11MXJv0VvUr7MiuIO2bt0pd_fiLtWFksxZm-EXzQ8ICHgmjdMSn9UqiuAgc9rXPnr7pzActS5Vv1eN8TeuSpXFhi1KV2439T0a5GwEA8YxLg2ra7X8vYT7cEJtaqtgG9P34_E3TU3VEmdGfZeIjzltnLt4PKiXuWr6ZdHaXyHnjtHacXRmGKbPcX3OtFo9tDwQITKpmxhwKp8uz_QhXcr_f4jVA")`,
                            }}
                        />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-charcoal dark:text-white mb-4">
                    Selamat Datang ke <span className="text-primary">SuaraShop</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xs">
                    Pengalaman membeli-belah yang mudah dengan bantuan suara.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    (Easy shopping experience with voice assistance.)
                </p>
            </div>

            <div className="w-full flex flex-col gap-4 pb-8">
                <button
                    onClick={() => router.push("/onboarding/guide")}
                    className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    Mula Sekarang (Start Now)
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
