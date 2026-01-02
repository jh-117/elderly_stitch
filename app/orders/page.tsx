"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";
import { formatCurrency } from "@/lib/utils";

export default function OrdersPage() {
    const router = useRouter();
    const { t, language } = useTranslation();

    const mockOrders = [
        {
            id: "ORD-2024-001",
            date: language === 'malay' ? "12 Okt 2024" : "12 Oct 2024",
            status: "Delivered",
            statusText: t.tracking.delivered,
            total: 113.90,
            items: 3,
            icon: "check_circle"
        },
        {
            id: "ORD-2024-002",
            date: language === 'malay' ? "8 Okt 2024" : "8 Oct 2024",
            status: "Processing",
            statusText: t.tracking.processing,
            total: 67.50,
            items: 2,
            icon: "package"
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-800";
            case "Processing":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800";
            case "Shipped":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400 border-gray-200 dark:border-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center p-4 justify-between h-20">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white border border-gray-100 dark:border-gray-700 transition-all active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-2xl font-black leading-tight tracking-tight flex-1 text-center">
                        {t.orders.title}
                    </h1>
                    <div className="w-14"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="space-y-6">
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            onClick={() => router.push(`/orders/track/${order.id}`)}
                            className="bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none p-6 transition-all hover:translate-y-[-8px] cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary font-black">receipt_long</span>
                                        </div>
                                        <h3 className="font-black text-2xl tracking-tighter text-charcoal dark:text-white">{order.id}</h3>
                                    </div>
                                    <p className="text-lg text-gray-400 font-bold uppercase tracking-widest pl-1">
                                        {order.date}
                                    </p>
                                </div>
                                <div
                                    className={`px-6 py-3 rounded-[20px] text-lg font-black border-2 flex items-center gap-2 ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    <span className="material-symbols-outlined text-2xl font-black">{order.icon}</span>
                                    {order.statusText}
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-6 border-t-4 border-gray-50 dark:border-gray-700/50">
                                <div>
                                    <p className="text-xl font-black text-charcoal dark:text-white">
                                        <span className="text-primary">{order.items}</span> {t.orders.items_count}
                                    </p>
                                    <p className="text-3xl font-black text-primary mt-1">
                                        {formatCurrency(order.total)}
                                    </p>
                                </div>
                                <button
                                    className="h-14 px-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl flex items-center gap-3 text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all shadow-inner"
                                >
                                    {t.orders.view_details.toUpperCase()}
                                    <span className="material-symbols-outlined font-black">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {mockOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center pt-32 px-10 text-center">
                        <div className="h-48 w-48 rounded-[64px] bg-white dark:bg-gray-800 flex items-center justify-center mb-10 shadow-2xl relative">
                            <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping"></div>
                            <span className="material-symbols-outlined text-[100px] text-primary/20 font-black relative z-10">
                                receipt_long
                            </span>
                        </div>
                        <h2 className="text-4xl font-black mb-4 text-charcoal dark:text-white tracking-tighter">{t.orders.empty}</h2>
                        <p className="text-2xl text-gray-400 font-bold leading-relaxed">
                            {t.orders.empty_desc}
                        </p>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
