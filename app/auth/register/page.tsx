"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function RegisterPage() {
    const router = useRouter();
    const { t, language } = useTranslation();
    const register = useAuthStore((state) => state.register);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError(language === 'malay' ? "Kata laluan tidak sama." : "Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const success = await register(formData.name, formData.email, formData.password, formData.phone);
            if (success) {
                router.push("/home");
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
                    <span className="material-symbols-outlined text-3xl font-bold">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 px-8 pb-12 overflow-y-auto">
                <div className="mb-10">
                    <h1 className="text-5xl font-black text-charcoal dark:text-white mb-4 tracking-tighter">
                        {t.auth.register_title}
                    </h1>
                    <p className="text-2xl text-gray-400 font-bold leading-relaxed max-w-xs">
                        {t.auth.register_subtitle}
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-[32px] border-2 border-red-100 dark:border-red-900/20 font-black text-lg flex items-center gap-4 animate-shake">
                        <span className="material-symbols-outlined text-3xl font-bold">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.name}
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-18 px-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-xl font-black transition-all outline-none shadow-inner"
                            placeholder="Contoh: Ah Hock"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.email}
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-18 px-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-xl font-black transition-all outline-none shadow-inner"
                            placeholder="nama@email.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.phone}
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-18 px-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-xl font-black transition-all outline-none shadow-inner"
                            placeholder="+6012-3456789"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.password}
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full h-18 px-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-xl font-black transition-all outline-none shadow-inner"
                            placeholder="Min 6 karakter"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-[0.2em] pl-4">
                            {t.auth.confirm_password}
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full h-18 px-6 bg-gray-50 dark:bg-slate-800 border-4 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 rounded-[32px] text-xl font-black transition-all outline-none shadow-inner"
                            placeholder="Ulang semula"
                            required
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-24 bg-primary text-white text-3xl font-black rounded-[40px] shadow-2xl shadow-primary/40 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-6 border-b-[12px] border-purple-900 disabled:opacity-50"
                        >
                            {isLoading ? t.auth.wait : t.auth.register_now.toUpperCase()}
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center space-y-4">
                    <p className="text-gray-400 text-xl font-bold">{t.auth.have_account}</p>
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="text-primary text-2xl font-black hover:underline decoration-4 underline-offset-8 uppercase tracking-tight"
                    >
                        {t.auth.login_now}
                    </button>
                </div>
            </main>
        </div>
    );
}
