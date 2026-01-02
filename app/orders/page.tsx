"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function OrdersPage() {
    const router = useRouter();

    const mockOrders = [
        {
            id: "ORD-2024-001",
            date: "12 Okt 2024",
            status: "Delivered",
            statusMalay: "Dihantar",
            total: 113.90,
            items: 3,
        },
        {
            id: "ORD-2024-002",
            date: "8 Okt 2024",
            status: "Processing",
            statusMalay: "Diproses",
            total: 67.50,
            items: 2,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
            case "Processing":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
            case "Shipped":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
        }
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
                        Pesanan Saya (My Orders)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24">
                <div className="space-y-4">
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-lg">{order.id}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {order.date}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.statusMalay}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {order.items} items • RM {order.total.toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => router.push(`/orders/${order.id}`)}
                                    className="text-primary font-semibold text-sm hover:underline"
                                >
                                    Lihat Detail (View Details)
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {mockOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-gray-400">
                                receipt_long
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Tiada Pesanan</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            You haven't placed any orders yet.
                        </p>
                    </div>
                )}
            </main>

            <BottomNav />
        </>
    );
}
