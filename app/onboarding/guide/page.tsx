"use client";

import { useRouter } from "next/navigation";

export default function GuidePage() {
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col items-center justify-between p-8 bg-white dark:bg-[#101922]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center mb-10 relative">
                    <span className="material-symbols-outlined text-8xl text-primary animate-bounce">
                        mic
                    </span>
                    <div className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                </div>

                <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-6">
                    Kenali <span className="text-primary">Suara</span>
                </h2>

                <div className="space-y-6 text-left w-full max-w-xs">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 shrink-0 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                            <p className="font-bold text-lg">Tekan Butang Mikrofon</p>
                            <p className="text-gray-500 dark:text-gray-400">Press the mic button</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 shrink-0 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                            <p className="font-bold text-lg">Sebut Apa Anda Mahu</p>
                            <p className="text-gray-500 dark:text-gray-400">Speak what you want</p>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 italic text-center">
                        "Sari, cari susu Omega"
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 pb-8">
                <button
                    onClick={() => router.push("/onboarding/start")}
                    className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg hover:bg-purple-800 active:scale-95 transition-all"
                >
                    Teruskan (Next)
                </button>
                <button
                    onClick={() => router.back()}
                    className="w-full h-12 text-gray-500 font-semibold"
                >
                    Kembali (Back)
                </button>
            </div>
        </div>
    );
}
