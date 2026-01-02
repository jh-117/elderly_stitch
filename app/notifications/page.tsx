"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function NotificationsPage() {
    const router = useRouter();

    const notifications = [
        {
            id: 1,
            type: "order",
            title: "Pesanan Dihantar",
            titleEn: "Order Delivered",
            message: "Pesanan anda #ORD-2024-001 telah dihantar dengan jayanya!",
            time: "2 jam lalu",
            read: false,
            icon: "check_circle",
            iconColor: "text-green-500",
        },
        {
            id: 2,
            type: "order",
            title: "Pesanan Sedang Diproses",
            titleEn: "Order Processing",
            message: "Pesanan #ORD-2024-002 sedang disediakan untuk penghantaran.",
            time: "5 jam lalu",
            read: false,
            icon: "package",
            iconColor: "text-blue-500",
        },
        {
            id: 3,
            type: "promo",
            title: "Promosi Istimewa!",
            titleEn: "Special Promotion",
            message: "Dapatkan diskaun 20% untuk semua produk susu hari ini sahaja!",
            time: "1 hari lalu",
            read: true,
            icon: "local_offer",
            iconColor: "text-purple-500",
        },
        {
            id: 4,
            type: "reminder",
            title: "Peringatan Stok",
            titleEn: "Stock Reminder",
            message: "Produk kegemaran anda 'Beras Faiza' kini kembali dalam stok!",
            time: "2 hari lalu",
            read: true,
            icon: "notifications_active",
            iconColor: "text-amber-500",
        },
        {
            id: 5,
            type: "system",
            title: "Kemas Kini Aplikasi",
            titleEn: "App Update",
            message: "Versi baru aplikasi tersedia dengan peningkatan prestasi!",
            time: "3 hari lalu",
            read: true,
            icon: "system_update",
            iconColor: "text-gray-500",
        },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;

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
                        Pemberitahuan (Notifications)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Header Actions */}
                {unreadCount > 0 && (
                    <div className="p-4 flex items-center justify-between bg-primary/5 dark:bg-primary/10">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-primary rounded-full"></span>
                            <span className="text-sm font-semibold text-primary">
                                {unreadCount} notifikasi baharu (new notifications)
                            </span>
                        </div>
                        <button className="text-sm font-semibold text-primary hover:underline">
                            Tandakan semua dibaca
                        </button>
                    </div>
                )}

                {/* Notifications List */}
                <div className="p-4 space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white dark:bg-gray-800 rounded-2xl border ${notification.read
                                    ? "border-gray-100 dark:border-gray-700"
                                    : "border-primary/30 dark:border-primary/50 bg-primary/5 dark:bg-primary/5"
                                } p-4 transition-all hover:shadow-md cursor-pointer`}
                        >
                            <div className="flex gap-4">
                                <div
                                    className={`h-12 w-12 rounded-full ${notification.read
                                            ? "bg-gray-100 dark:bg-gray-700"
                                            : "bg-primary/10 dark:bg-primary/20"
                                        } flex items-center justify-center shrink-0`}
                                >
                                    <span
                                        className={`material-symbols-outlined ${notification.iconColor} text-2xl`}
                                    >
                                        {notification.icon}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div>
                                            <h3
                                                className={`font-bold ${notification.read
                                                        ? "text-charcoal dark:text-white"
                                                        : "text-primary"
                                                    }`}
                                            >
                                                {notification.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {notification.titleEn}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1"></div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="material-symbols-outlined text-base">
                                            schedule
                                        </span>
                                        <span>{notification.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {notifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-6xl text-gray-400">
                                notifications_none
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-charcoal dark:text-white">
                            Tiada Pemberitahuan
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            No notifications yet. We'll notify you when something arrives!
                        </p>
                    </div>
                )}
            </main>

            <BottomNav />
        </>
    );
}
