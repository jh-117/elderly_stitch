"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/home");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden">
            {/* Decorative Background Elements (Subtle Voice Ripples) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="w-[120vw] h-[120vw] rounded-full border border-primary/5 bg-primary/5 blur-3xl absolute -translate-y-1/4"></div>
                <div className="w-[80vw] h-[80vw] rounded-full border border-primary/10 bg-primary/5 blur-2xl absolute -translate-y-1/4"></div>
            </div>

            {/* Spacer for top alignment */}
            <div className="flex-1"></div>

            {/* Main Content Area: Logo & Title */}
            <div className="flex flex-col items-center z-10 w-full px-6">
                {/* Logo Container with Voice Ripple Effect */}
                <div className="relative mb-8">
                    {/* Outer Ripple Rings */}
                    <div className="absolute inset-0 -m-6 rounded-full border-2 border-primary/10 animate-pulse"></div>
                    <div className="absolute inset-0 -m-3 rounded-full border-2 border-primary/20"></div>

                    {/* Logo Image */}
                    <div className="relative w-32 h-32 rounded-3xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center overflow-hidden ring-4 ring-white dark:ring-slate-700">
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg_b-R85efu0k57InbpepyrZJHO4aZrq6BqBEGwylGdbSl3nV11MXJv0VvUr7MiuIO2bt0pd_fiLtWFksxZm-EXzQ8ICHgmjdMSn9UqiuAgc9rXPnr7pzActS5Vv1eN8TeuSpXFhi1KV2439T0a5GwEA8YxLg2ra7X8vYT7cEJtaqtgG9P34_E3TU3VEmdGfZeIjzltnLt4PKiXuWr6ZdHaXyHnjtHacXRmGKbPcX3OtFo9tDwQITKpmxhwKp8uz_QhXcr_f4jVA")`,
                            }}
                        >
                            {/* Overlay to tint the image to primary brand color if needed */}
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        </div>
                    </div>

                    {/* Floating Icon Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">mic</span>
                    </div>
                </div>

                {/* App Name */}
                <h1 className="text-charcoal dark:text-white tracking-tight text-4xl font-extrabold leading-tight text-center mb-2">
                    SuaraShop
                </h1>

                {/* Tagline */}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-charcoal dark:text-gray-300 text-lg font-medium leading-normal text-center opacity-90">
                        Mudah &amp; Mesra
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal text-center">
                        Your friendly shopping assistant
                    </p>
                </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Bottom Section: Loading & Footer */}
            <div className="flex flex-col w-full px-12 pb-12 items-center gap-6 z-10">
                {/* Loading Indicator */}
                <div className="w-full max-w-[240px] flex flex-col gap-2">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Loading
                        </span>
                        <span className="text-xs text-gray-400">80%</span>
                    </div>
                    <div className="rounded-full bg-[#dbe0e6] dark:bg-slate-700 h-2 w-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-1000 ease-out animate-pulse"
                            style={{ width: "80%" }}
                        ></div>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-gray-400 text-xs font-medium text-center">
                    V 1.0.2 © 2024 SuaraShop
                </p>
            </div>
        </div>
    );
}
