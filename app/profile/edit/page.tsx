"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useAuthStore } from "@/store/authStore";

export default function EditProfilePage() {
    const router = useRouter();
    const { user } = useAuthStore();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement profile update
        alert("Profil dikemaskini! (Profile updated!)");
        router.back();
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label="Go back"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span
                            className="material-symbols-outlined text-charcoal dark:text-white"
                            style={{ fontSize: "28px" }}
                        >
                            arrow_back
                        </span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                        Edit Profil (Edit Profile)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-5 pb-24">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative">
                        <span className="material-symbols-outlined text-6xl text-primary">
                            person
                        </span>
                        <button
                            className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-purple-800 transition-colors"
                            aria-label="Change photo"
                        >
                            <span className="material-symbols-outlined text-xl">
                                photo_camera
                            </span>
                        </button>
                    </div>
                    <button className="text-primary font-semibold hover:underline">
                        Tukar Gambar (Change Photo)
                    </button>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-charcoal dark:text-white">
                            Nama (Name)
                        </label>
                        <div className="flex items-center rounded-xl h-14 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
                            <span className="material-symbols-outlined text-gray-400 mr-3">
                                person
                            </span>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="flex-1 bg-transparent text-charcoal dark:text-white focus:outline-none text-base"
                                placeholder="Masukkan nama..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-charcoal dark:text-white">
                            E-mel (Email)
                        </label>
                        <div className="flex items-center rounded-xl h-14 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
                            <span className="material-symbols-outlined text-gray-400 mr-3">
                                mail
                            </span>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="flex-1 bg-transparent text-charcoal dark:text-white focus:outline-none text-base"
                                placeholder="Masukkan e-mel..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-charcoal dark:text-white">
                            Telefon (Phone)
                        </label>
                        <div className="flex items-center rounded-xl h-14 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4">
                            <span className="material-symbols-outlined text-gray-400 mr-3">
                                phone
                            </span>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="flex-1 bg-transparent text-charcoal dark:text-white focus:outline-none text-base"
                                placeholder="Masukkan nombor telefon..."
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg hover:bg-purple-800 transition-colors active:scale-[0.98] shadow-lg"
                        >
                            Simpan (Save)
                        </button>
                    </div>

                    {/* Change Password Button */}
                    <button
                        type="button"
                        onClick={() => alert("Tukar kata laluan (Change password)")}
                        className="w-full h-14 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-charcoal dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Tukar Kata Laluan (Change Password)
                    </button>
                </form>
            </main>

            <BottomNav />
        </>
    );
}
