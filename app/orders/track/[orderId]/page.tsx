"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function TrackOrderPage() {
    const router = useRouter();

    const trackingInfo = {
        orderId: "ORD-2024-001",
        trackingNumber: "TRK-MY-123456789",
        status: "Delivered",
        currentLocation: "Kuala Lumpur Hub",
        estimatedDelivery: "15 Oktober 2024",
        timeline: [
            {
                id: 1,
                status: "Order Placed",
                statusMalay: "Pesanan Dibuat",
                location: "Online",
                date: "12 Okt 2024, 10:30 AM",
                completed: true,
                icon: "shopping_cart",
            },
            {
                id: 2,
                status: "Processing",
                statusMalay: "Diproses",
                location: "Warehouse - Shah Alam",
                date: "12 Okt 2024, 2:15 PM",
                completed: true,
                icon: "package",
            },
            {
                id: 3,
                status: "Shipped",
                statusMalay: "Dalam Perjalanan",
                location: "En route to KL Hub",
                date: "13 Okt 2024, 8:00 AM",
                completed: true,
                icon: "local_shipping",
            },
            {
                id: 4,
                status: "Out for Delivery",
                statusMalay: "Dalam Penghantaran",
                location: "Kuala Lumpur Hub",
                date: "15 Okt 2024, 7:30 AM",
                completed: true,
                icon: "delivery_dining",
            },
            {
                id: 5,
                status: "Delivered",
                statusMalay: "Dihantar",
                location: "Your Address",
                date: "15 Okt 2024, 11:45 AM",
                completed: true,
                icon: "check_circle",
            },
        ],
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
                        Jejak Pesanan (Track Order)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Order Info Card */}
                <div className="p-4">
                    <div className="bg-primary text-white rounded-2xl p-5 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-sm opacity-90">Order ID</p>
                                <h2 className="text-xl font-bold">{trackingInfo.orderId}</h2>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">
                                    local_shipping
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                            <span className="material-symbols-outlined text-lg">location_on</span>
                            <span>{trackingInfo.currentLocation}</span>
                        </div>
                    </div>
                </div>

                {/* Tracking Number */}
                <div className="px-4 pb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Tracking Number
                                </p>
                                <p className="font-mono font-bold">{trackingInfo.trackingNumber}</p>
                            </div>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-primary">
                                    content_copy
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Estimated Delivery */}
                <div className="px-4 pb-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                                check_circle
                            </span>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Delivered on
                                </p>
                                <p className="font-bold text-green-700 dark:text-green-400">
                                    {trackingInfo.estimatedDelivery}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="px-4">
                    <h2 className="text-lg font-bold mb-4 text-charcoal dark:text-white">
                        Status Penghantaran (Delivery Status)
                    </h2>
                    <div className="relative">
                        {trackingInfo.timeline.map((item, index) => (
                            <div key={item.id} className="flex gap-4 pb-8 last:pb-0 relative">
                                {/* Timeline Line */}
                                {index !== trackingInfo.timeline.length - 1 && (
                                    <div className="absolute left-6 top-14 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                                )}

                                {/* Icon */}
                                <div
                                    className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 z-10 ${item.completed
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-2xl">
                                        {item.icon}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
                                    <h3
                                        className={`font-bold mb-1 ${item.completed
                                                ? "text-primary"
                                                : "text-gray-400 dark:text-gray-500"
                                            }`}
                                    >
                                        {item.statusMalay}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        {item.status}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        <span className="material-symbols-outlined text-sm">
                                            location_on
                                        </span>
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span className="material-symbols-outlined text-sm">
                                            schedule
                                        </span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pt-6 space-y-3">
                    <button className="w-full h-12 rounded-xl bg-primary text-white font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">phone</span>
                        Hubungi Kurier (Contact Courier)
                    </button>
                    <button className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 text-charcoal dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">help</span>
                        Bantuan (Help)
                    </button>
                </div>
            </main>

            <BottomNav />
        </>
    );
}
