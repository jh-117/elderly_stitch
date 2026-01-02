"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
    const router = useRouter();
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
                setError("E-mel atau kata laluan salah. (Wrong email or password)");
            }
        } catch (err) {
            setError("Ralat sistem. Cuba lagi. (System error. Try again)");
        } finally {
            setIsLoading(false);
        }
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
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-charcoal dark:text-white mb-2">
                        Log Masuk
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Welcome back! Sila masuk ke akaun anda.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 font-bold flex items-center gap-3">
                        <span className="material-symbols-outlined">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest pl-1">
                            E-mel (Email)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                                alternate_email
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-16 pl-12 pr-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-xl font-bold transition-all outline-none"
                                placeholder="nama@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest pl-1">
                            Kata Laluan (Password)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                                lock
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-16 pl-12 pr-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-xl font-bold transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/auth/forgot-password")}
                        className="text-primary font-bold text-lg hover:underline block"
                    >
                        Lupa Kata Laluan? (Forgot Password?)
                    </button>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-18 bg-primary text-white text-2xl font-black rounded-3xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900 disabled:opacity-50"
                        >
                            {isLoading ? "Masuk... (Wait...)" : "MASUK (LOGIN)"}
                            {!isLoading && <span className="material-symbols-outlined text-3xl">login</span>}
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 font-bold mb-4">Belum ada akaun? (No account?)</p>
                    <button
                        onClick={() => router.push("/auth/register")}
                        className="text-primary text-xl font-black hover:underline"
                    >
                        DAFTAR SEKARANG (REGISTER NOW)
                    </button>
                </div>

                {/* Voice Login Hint */}
                <div className="mt-12 bg-primary/5 rounded-3xl p-6 border-2 border-dashed border-primary/20 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined">mic</span>
                    </div>
                    <p className="font-bold text-primary">Atau log masuk dengan suara</p>
                    <p className="text-sm text-gray-500">(Or login with voice)</p>
                </div>
            </main>
        </div>
    );
}
