"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
    const router = useRouter();
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
            setError("Kata laluan tidak sama. (Passwords do not match)");
            return;
        }

        setIsLoading(true);
        try {
            const success = await register(formData.name, formData.email, formData.password, formData.phone);
            if (success) {
                router.push("/home");
            }
        } catch (err) {
            setError("Pendaftaran gagal. (Registration failed)");
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

            <main className="flex-1 px-8 pb-12 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-charcoal dark:text-white mb-2">
                        Daftar Baru
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Sertai komuniti SuaraShop hari ini.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-widest pl-1">
                            Nama Penuh (Full Name)
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-lg font-bold transition-all outline-none"
                            placeholder="Contoh: Ah Hock"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-widest pl-1">
                            E-mel (Email)
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-lg font-bold transition-all outline-none"
                            placeholder="nama@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-widest pl-1">
                            No. Telefon (Phone)
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-lg font-bold transition-all outline-none"
                            placeholder="+6012-3456789"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-widest pl-1">
                            Kata Laluan (Password)
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-lg font-bold transition-all outline-none"
                            placeholder="Min 6 karakter"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-widest pl-1">
                            Sahkan Kata Laluan (Verify)
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full h-14 px-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-2xl text-lg font-bold transition-all outline-none"
                            placeholder="Ulang semula"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-18 bg-primary text-white text-2xl font-black rounded-3xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900 disabled:opacity-50"
                        >
                            {isLoading ? "Daftar... (Wait...)" : "DAFTAR SEKARANG"}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 font-bold mb-2">Sudah ada akaun?</p>
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="text-primary text-xl font-black hover:underline"
                    >
                        LOG MASUK (LOGIN)
                    </button>
                </div>
            </main>
        </div>
    );
}
