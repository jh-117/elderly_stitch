"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function LoginPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const success = await login(email, password);
            if (success) {
                router.push("/home");
            } else {
                setError(t.auth.error_credentials);
            }
        } catch (err) {
            setError(t.auth.error_system);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-[#101922]">
            <header className="p-6">
                <button
                    onClick={() => router.back()}
                    className="h-14 w-14 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-slate-800 text-charcoal dark:text-white shadow-sm border border-gray-100 dark:border-gray-700 active:scale-90 transition-all font-black"
                >
                    <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 px-8 pb-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-black text-charcoal dark:text-white mb-4 tracking-tighter">
                        {t.auth.login_title}
                    </h1>
                    <p className="text-2xl text-gray-400 font-bold leading-relaxed max-w-xs">
                        {t.auth.login_subtitle}
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-[32px] border-2 border-red-100 dark:border-red-900/20 font-black text-lg flex items-center gap-4 animate-shake">
                        <span className="material-symbols-outlined text-3xl">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-3">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.email}
                        </label>
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300 group-focus-within:text-primary transition-colors text-3xl font-bold">
                                alternate_email
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

                    <div className="space-y-3">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.password}
                        </label>
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300 group-focus-within:text-primary transition-colors text-3xl font-bold">
                                lock
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-20 pl-16 pr-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-2xl font-black transition-all outline-none shadow-inner"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/auth/forgot-password")}
                        className="text-primary font-black text-xl hover:underline block pl-4"
                    >
                        {t.auth.forgot_password}
                    </button>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-24 bg-primary text-white text-3xl font-black rounded-[40px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-6 border-b-[12px] border-purple-900 disabled:opacity-50"
                        >
                            {isLoading ? t.auth.wait : t.common.login.toUpperCase()}
                            {!isLoading && <span className="material-symbols-outlined text-4xl font-black">login</span>}
                        </button>
                    </div>
                </form>

                <div className="mt-16 text-center space-y-6">
                    <p className="text-gray-400 text-xl font-bold">{t.auth.no_account}</p>
                    <button
                        onClick={() => router.push("/auth/register")}
                        className="text-primary text-2xl font-black hover:underline decoration-4 underline-offset-8"
                    >
                        {t.auth.register_now.toUpperCase()}
                    </button>
                </div>

                {/* Voice Login Hint */}
                <div className="mt-16 bg-primary/5 dark:bg-primary/10 rounded-[40px] p-8 border-4 border-dashed border-primary/20 flex flex-col items-center text-center group active:scale-95 transition-all cursor-pointer">
                    <div className="h-20 w-20 bg-primary text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20 animate-pulse">
                        <span className="material-symbols-outlined text-5xl font-black">mic</span>
                    </div>
                    <p className="text-2xl font-black text-primary uppercase tracking-tight">{t.auth.voice_login}</p>
                </div>
            </main>
        </div>
    );
}
