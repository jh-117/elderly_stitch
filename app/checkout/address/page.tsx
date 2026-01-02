"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutAddressPage() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState("1");

    const addresses = [
        {
            id: "1",
            label: "Rumah (Home)",
            name: "Ah Hock",
            phone: "+60123456789",
            address: "123, Jalan Bahagia, Taman Sejahtera, 50000 Kuala Lumpur",
            isDefault: true,
        },
        {
            id: "2",
            label: "Pejabat (Office)",
            name: "Ah Hock",
            phone: "+60123456789",
            address: "Level 10, Wisma Merchant, Bukit Bintang, 55100 Kuala Lumpur",
            isDefault: false,
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-[#101922]">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        className="flex size-12 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-center">Pilih Alamat (Select Address)</h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 p-4 pb-32">
                <div className="space-y-4">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            onClick={() => setSelectedId(addr.id)}
                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedId === addr.id
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">
                                        {addr.id === "1" ? "home" : "work"}
                                    </span>
                                    <span className="font-black text-lg uppercase tracking-wide">
                                        {addr.label}
                                    </span>
                                </div>
                                {selectedId === addr.id && (
                                    <span className="material-symbols-outlined text-primary font-bold">
                                        check_circle
                                    </span>
                                )}
                            </div>
                            <p className="font-bold text-xl mb-1">{addr.name}</p>
                            <p className="text-gray-500 font-medium mb-2">{addr.phone}</p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
                                {addr.address}
                            </p>
                        </div>
                    ))}

                    <button className="w-full h-16 border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center gap-3 text-gray-400 font-black hover:bg-gray-50 transition-all">
                        <span className="material-symbols-outlined">add_circle</span>
                        TAMBAH ALAMAT BARU
                    </button>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1a2632] border-t border-gray-100 max-w-md mx-auto">
                <button
                    onClick={() => router.back()}
                    className="w-full h-16 bg-primary text-white text-xl font-black rounded-2xl shadow-xl hover:bg-purple-800 active:scale-95 transition-all"
                >
                    PILIH ALAMAT INI
                </button>
            </div>
        </div>
    );
}
