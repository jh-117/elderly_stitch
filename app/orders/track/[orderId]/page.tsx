"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function TrackOrderPage() {
    const router = useRouter();
    const { t, language } = useTranslation();

    const trackingInfo = {
        orderId: "ORD-2024-001",
        trackingNumber: "TRK-MY-123456789",
        status: t.tracking.delivered,
        currentLocation: "Kuala Lumpur Hub",
        estimatedDelivery: language === 'malay' ? "15 Oktober 2024" : "15 October 2024",
        timeline: [
            {
                id: 1,
                status: t.tracking.order_placed,
                location: t.tracking.online,
                date: "12 Okt 2024, 10:30 AM",
                completed: true,
                icon: "shopping_cart",
            },
            {
                id: 2,
                status: t.tracking.processing,
                location: `${t.tracking.warehouse} - Shah Alam`,
                date: "12 Okt 2024, 2:15 PM",
                completed: true,
                icon: "package",
            },
            {
                id: 3,
                status: t.tracking.shipped,
                location: `${t.tracking.en_route} KL Hub`,
                date: "13 Okt 2024, 8:00 AM",
                completed: true,
                icon: "local_shipping",
            },
            {
                id: 4,
                status: t.tracking.out_for_delivery,
                location: "Kuala Lumpur Hub",
                date: "15 Okt 2024, 7:30 AM",
                completed: true,
                icon: "delivery_dining",
            },
            {
                id: 5,
                status: t.tracking.delivered,
                location: t.tracking.your_address,
                date: "15 Okt 2024, 11:45 AM",
                completed: true,
                icon: "check_circle",
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-2xl font-black leading-tight tracking-tight flex-1 text-center px-4">
                        {t.tracking.title}
                    </h1>
                    <div className="w-14"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Order Info Card */}
                <div className="p-6">
                    <div className="bg-primary text-white rounded-[40px] p-8 shadow-2xl shadow-primary/30 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="flex items-center justify-between mb-6 relative">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.2em] opacity-70 mb-2">{t.tracking.order_id}</p>
                                <h2 className="text-3xl font-black tracking-tight">{trackingInfo.orderId}</h2>
                            </div>
                            <div className="h-20 w-20 rounded-[30px] bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
                                <span className="material-symbols-outlined text-4xl font-black">
                                    local_shipping
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-xl font-bold bg-black/10 p-4 rounded-2xl backdrop-blur-md">
                            <span className="material-symbols-outlined text-3xl">location_on</span>
                            <span>{trackingInfo.currentLocation}</span>
                        </div>
                    </div>
                </div>

                {/* Tracking Number */}
                <div className="px-6 pb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-[32px] border-2 border-gray-50 dark:border-gray-700 p-6 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                                {t.tracking.tracking_number}
                            </p>
                            <p className="text-2xl font-mono font-black text-charcoal dark:text-white">{trackingInfo.trackingNumber}</p>
                        </div>
                        <button className="h-14 w-14 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center hover:bg-primary/10 transition-all active:scale-90 group">
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-3xl font-bold">
                                content_copy
                            </span>
                        </button>
                    </div>
                </div>

                {/* Estimated Delivery */}
                <div className="px-6 pb-8">
                    <div className="bg-green-50 dark:bg-green-900/10 border-4 border-green-100 dark:border-green-900/20 rounded-[32px] p-6 shadow-lg shadow-green-500/5">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 bg-green-500 text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-green-500/30">
                                <span className="material-symbols-outlined text-4xl font-black">
                                    check_circle
                                </span>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-green-800 dark:text-green-400 leading-tight mb-1">
                                    {t.tracking.delivered_on}
                                </p>
                                <p className="text-2xl font-black text-green-600 dark:text-green-400">
                                    {trackingInfo.estimatedDelivery}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="px-6">
                    <h2 className="text-2xl font-black mb-8 text-charcoal dark:text-white tracking-tight pl-2">
                        {t.tracking.delivery_status}
                    </h2>
                    <div className="relative pl-4">
                        {trackingInfo.timeline.map((item, index) => (
                            <div key={item.id} className="flex gap-8 pb-10 last:pb-0 relative group">
                                {/* Timeline Line */}
                                {index !== trackingInfo.timeline.length - 1 && (
                                    <div className={`absolute left-[38px] top-14 w-1 h-full rounded-full transition-colors duration-500 ${item.completed ? "bg-primary" : "bg-gray-100 dark:bg-gray-700"}`}></div>
                                )}

                                {/* Icon Bubble */}
                                <div
                                    className={`h-[76px] w-[76px] rounded-[28px] flex items-center justify-center shrink-0 z-10 transition-all duration-500 border-8 border-gray-50 dark:border-[#101922] ${item.completed
                                        ? "bg-primary text-white shadow-xl shadow-primary/30 scale-110"
                                        : "bg-white dark:bg-gray-800 text-gray-300 border-gray-100 dark:border-gray-700"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-3xl font-black">
                                        {item.icon}
                                    </span>
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 rounded-[32px] p-6 transition-all duration-500 border-2 ${item.completed
                                    ? "bg-white dark:bg-gray-800 border-primary/10 shadow-xl shadow-primary/5"
                                    : "bg-gray-50/50 dark:bg-gray-800/20 border-transparent opacity-50"
                                    }`}>
                                    <h3
                                        className={`text-xl font-black mb-2 tracking-tight ${item.completed
                                            ? "text-primary"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {item.status}
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-lg font-bold text-gray-600 dark:text-gray-300">
                                            <span className="material-symbols-outlined text-2xl font-black opacity-50 text-primary">
                                                location_on
                                            </span>
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-base font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
                                            <span className="material-symbols-outlined text-xl font-black opacity-30">
                                                schedule
                                            </span>
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-8 space-y-4">
                    <button className="w-full h-20 rounded-[32px] bg-primary text-white text-2xl font-black shadow-2xl shadow-primary/30 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-6 border-b-8 border-purple-900 group">
                        <span className="material-symbols-outlined text-3xl font-black group-hover:rotate-12 transition-transform">phone</span>
                        {t.tracking.contact_courier.toUpperCase()}
                    </button>
                    <button className="w-full h-18 rounded-[32px] border-4 border-gray-200 dark:border-gray-700 text-charcoal dark:text-white text-xl font-black hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-4">
                        <span className="material-symbols-outlined text-3xl font-black">help</span>
                        {t.tracking.help.toUpperCase()}
                    </button>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
