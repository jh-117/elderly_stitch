"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-[#101922]">
            <header className="p-6">
                <button
                    onClick={() => router.back()}
                    className="h-12 w-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 px-8 pb-12">
                {!isSubmitted ? (
                    <>
                        <div className="mb-10">
                            <h1 className="text-4xl font-black text-charcoal dark:text-white mb-2">
                                Lupa Kata Laluan?
                            </h1>
                            <p className="text-lg text-gray-500 font-medium">
                                Jangan risau, kami akan hantar bantuan ke e-mel anda.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-widest pl-1">
                                    Masukkan E-mel Anda
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                                        mail
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-18 pl-12 pr-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-xl font-bold transition-all outline-none"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-20 bg-primary text-white text-2xl font-black rounded-3xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900"
                            >
                                HANTAR BANTUAN
                                <span className="material-symbols-outlined text-3xl">send</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-40 h-40 bg-green-500/10 rounded-full flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-7xl text-green-500">
                                draft
                            </span>
                        </div>
                        <h2 className="text-3xl font-black mb-4">E-mel Dihantar!</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xs mx-auto">
                            Sila semak e-mel <span className="font-bold text-charcoal dark:text-white">{email}</span> untuk tetapan semula kata laluan.
                        </p>
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="w-full h-18 bg-white dark:bg-slate-800 text-primary border-4 border-primary text-xl font-bold rounded-2xl hover:bg-primary/5 active:scale-95 transition-all"
                        >
                            KEMBALI KE LOG MASUK
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
