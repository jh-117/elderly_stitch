"use client";

import { useRouter } from "next/navigation";

export default function StartPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col items-center justify-between p-8 bg-white dark:bg-[#101922]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 mb-12 relative">
                    <div className="absolute inset-0 bg-green-500/10 rounded-full scale-125"></div>
                    <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center border-4 border-green-500/20">
                        <span className="material-symbols-outlined text-8xl text-green-500">
                            check_circle
                        </span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
                    Semua Sedia!
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xs mb-8">
                    Anda sudah sedia untuk membeli-belah dengan lebih mudah.
                </p>
                <p className="text-sm text-gray-500">
                    (You're all set for easier shopping.)
                </p>
            </div>

            <div className="w-full flex flex-col gap-4 pb-8">
                <button
                    onClick={() => router.push("/auth/login")}
                    className="w-full h-20 bg-primary text-white text-2xl font-black rounded-3xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900"
                >
                    MASUK (LOGIN)
                    <span className="material-symbols-outlined text-3xl">login</span>
                </button>

                <div className="flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-gray-200"></div>
                    <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Atau (Or)</span>
                    <div className="h-px flex-1 bg-gray-200"></div>
                </div>

                <button
                    onClick={() => router.push("/auth/register")}
                    className="w-full h-16 bg-white dark:bg-slate-800 text-primary border-4 border-primary text-xl font-bold rounded-2xl hover:bg-primary/5 active:scale-95 transition-all"
                >
                    DAFTAR (REGISTER)
                </button>
            </div>
        </div>
    );
}
