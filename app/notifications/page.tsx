"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotificationsPage() {
    const router = useRouter();
    const { t } = useTranslation();

    const notifications = [
        {
            id: 1,
            type: "order",
            title: t.notifications.order_delivered,
            message: t.notifications.order_delivered_msg,
            time: `2 ${t.notifications.hours} ${t.notifications.time_ago}`,
            read: false,
            icon: "check_circle",
            iconColor: "text-green-500",
        },
        {
            id: 2,
            type: "order",
            title: t.notifications.order_processing,
            message: t.notifications.order_processing_msg,
            time: `5 ${t.notifications.hours} ${t.notifications.time_ago}`,
            read: false,
            icon: "package",
            iconColor: "text-blue-500",
        },
        {
            id: 3,
            type: "promo",
            title: t.notifications.special_promo,
            message: t.notifications.special_promo_msg,
            time: `1 ${t.notifications.days} ${t.notifications.time_ago}`,
            read: true,
            icon: "local_offer",
            iconColor: "text-purple-500",
        },
        {
            id: 4,
            type: "reminder",
            title: t.notifications.stock_reminder,
            message: t.notifications.stock_reminder_msg,
            time: `2 ${t.notifications.days} ${t.notifications.time_ago}`,
            read: true,
            icon: "notifications_active",
            iconColor: "text-amber-500",
        },
        {
            id: 5,
            type: "system",
            title: t.notifications.app_update,
            message: t.notifications.app_update_msg,
            time: `3 ${t.notifications.days} ${t.notifications.time_ago}`,
            read: true,
            icon: "system_update",
            iconColor: "text-gray-500",
        },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;

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
                        {t.notifications.title}
                    </h1>
                    <div className="w-14"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Header Actions */}
                {unreadCount > 0 && (
                    <div className="p-6 flex items-center justify-between bg-primary/10 dark:bg-primary/20 backdrop-blur-sm sticky top-16 z-10 mx-4 mt-4 rounded-[32px] border border-primary/20">
                        <div className="flex items-center gap-4">
                            <div className="h-4 w-4 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                            <span className="text-lg font-black text-primary">
                                {unreadCount} {t.notifications.new_notifications}
                            </span>
                        </div>
                        <button className="text-base font-black text-primary hover:underline uppercase tracking-tight">
                            {t.notifications.mark_all_read}
                        </button>
                    </div>
                )}

                {/* Notifications List */}
                <div className="p-6 space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white dark:bg-gray-800 rounded-[32px] shadow-sm border ${notification.read
                                ? "border-gray-50 dark:border-gray-700 opacity-70"
                                : "border-primary/20 dark:border-primary/30 ring-4 ring-primary/5"
                                } p-6 transition-all hover:shadow-xl hover:translate-y-[-4px] cursor-pointer`}
                        >
                            <div className="flex gap-6">
                                <div
                                    className={`h-16 w-16 rounded-[24px] ${notification.read
                                        ? "bg-gray-50 dark:bg-gray-700/50"
                                        : "bg-primary/10 dark:bg-primary/20"
                                        } flex items-center justify-center shrink-0 shadow-inner`}
                                >
                                    <span
                                        className={`material-symbols-outlined ${notification.iconColor} text-4xl font-black`}
                                    >
                                        {notification.icon}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3
                                            className={`text-xl font-black leading-tight tracking-tight ${notification.read
                                                ? "text-charcoal dark:text-white"
                                                : "text-primary"
                                                }`}
                                        >
                                            {notification.title}
                                        </h3>
                                        {!notification.read && (
                                            <div className="h-3 w-3 bg-primary rounded-full shrink-0 mt-2 shadow-lg shadow-primary/50"></div>
                                        )}
                                    </div>
                                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 font-bold leading-relaxed line-clamp-3">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-xl font-black opacity-50">
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
                    <div className="flex flex-col items-center justify-center pt-32 px-8 text-center">
                        <div className="relative w-56 h-56 mb-10">
                            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse"></div>
                            <div className="relative h-full w-full rounded-[64px] bg-white dark:bg-gray-800 shadow-xl border-8 border-gray-50 dark:border-gray-700 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[100px] text-gray-300 font-black">
                                    notifications_off
                                </span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black mb-4 text-charcoal dark:text-white tracking-tighter">
                            {t.notifications.empty}
                        </h2>
                        <p className="text-xl text-gray-400 font-bold max-w-xs mx-auto leading-relaxed">
                            {t.notifications.empty_desc}
                        </p>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
