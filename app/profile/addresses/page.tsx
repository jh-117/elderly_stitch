"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function AddressesPage() {
    const router = useRouter();

    const mockAddresses = [
        {
            id: 1,
            label: "Rumah (Home)",
            name: "Ahmad bin Abdullah",
            phone: "+60 12-345 6789",
            address: "No. 123, Jalan Merdeka, Taman Bahagia, 50450 Kuala Lumpur, Malaysia",
            isDefault: true,
        },
        {
            id: 2,
            label: "Pejabat (Office)",
            name: "Ahmad bin Abdullah",
            phone: "+60 12-345 6789",
            address: "Menara KLCC, Jalan Ampang, 50088 Kuala Lumpur, Malaysia",
            isDefault: false,
        },
    ];

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
                        Alamat (Addresses)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24">
                {/* Add New Address Button */}
                <button className="w-full flex items-center justify-center gap-2 p-4 mb-4 bg-primary text-white rounded-xl font-semibold hover:bg-purple-800 transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-2xl">add</span>
                    Tambah Alamat Baru (Add New Address)
                </button>

                {/* Addresses List */}
                <div className="space-y-4">
                    {mockAddresses.map((address) => (
                        <div
                            key={address.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">
                                        location_on
                                    </span>
                                    <h3 className="font-bold text-lg">{address.label}</h3>
                                </div>
                                {address.isDefault && (
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                        Lalai (Default)
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <p className="font-semibold text-charcoal dark:text-white">
                                    {address.name}
                                </p>
                                <p>{address.phone}</p>
                                <p>{address.address}</p>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                    <span className="font-medium text-sm">Edit</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                    <span className="font-medium text-sm">Padam (Delete)</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {mockAddresses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-gray-400">
                                location_on
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Tiada Alamat (No Addresses)</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Tambah alamat untuk penghantaran lebih pantas
                        </p>
                    </div>
                )}
            </main>

            <BottomNav />
        </>
    );
}
