"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { t } = useTranslation();
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
                    className="h-14 w-14 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-slate-800 text-charcoal dark:text-white shadow-sm border border-gray-100 dark:border-gray-700 active:scale-90 transition-all font-black"
                >
                    <span className="material-symbols-outlined text-3xl font-bold">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 px-8 pb-12">
                {!isSubmitted ? (
                    <>
                        <div className="mb-12">
                            <h1 className="text-5xl font-black text-charcoal dark:text-white mb-4 tracking-tighter">
                                {t.auth.forgot_password_title}
                            </h1>
                            <p className="text-2xl text-gray-400 font-bold leading-relaxed max-w-xs">
                                {t.auth.forgot_password_subtitle}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="space-y-3">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                                    {t.auth.enter_email}
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300 group-focus-within:text-primary transition-colors text-3xl font-bold">
                                        mail
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-20 pl-16 pr-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-2xl font-black transition-all outline-none shadow-inner"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-24 bg-primary text-white text-3xl font-black rounded-[40px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-6 border-b-[12px] border-purple-900"
                            >
                                {t.auth.send_help.toUpperCase()}
                                <span className="material-symbols-outlined text-4xl font-black">send</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-20 text-center">
                        <div className="relative w-48 h-48 mb-12">
                            <div className="absolute inset-0 bg-green-500/10 rounded-full scale-150 animate-pulse"></div>
                            <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-[64px] shadow-2xl flex items-center justify-center border-8 border-green-500/10">
                                <span className="material-symbols-outlined text-[100px] text-green-500 font-black">
                                    mark_email_read
                                </span>
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-charcoal dark:text-white mb-4 tracking-tighter">
                            {t.auth.email_sent_title}
                        </h2>
                        <p className="text-2xl text-gray-400 font-bold mb-12 max-w-sm mx-auto leading-relaxed">
                            {t.auth.email_sent_desc}<br />
                            <span className="text-charcoal dark:text-white font-black underline decoration-primary/30 decoration-4 block mt-4">{email}</span>
                        </p>
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="w-full h-20 bg-white dark:bg-slate-800 text-primary border-[6px] border-primary text-2xl font-black rounded-[40px] shadow-xl hover:bg-primary/5 active:scale-95 transition-all uppercase tracking-tight"
                        >
                            {t.auth.back_to_login}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
