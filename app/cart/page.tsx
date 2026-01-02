"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function CartPage() {
    const router = useRouter();
    const { t, language } = useTranslation();
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
                <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                    <div className="flex items-center p-4 justify-between h-16">
                        <button
                            onClick={() => router.back()}
                            aria-label={t.common.back}
                            className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                        >
                            <span
                                className="material-symbols-outlined text-charcoal dark:text-white font-bold"
                                style={{ fontSize: "28px" }}
                            >
                                arrow_back
                            </span>
                        </button>
                        <h1 className="text-charcoal dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                            {t.cart.title}
                        </h1>
                        <div className="w-12"></div>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center p-8 pb-24">
                    <div className="flex flex-col items-center gap-6 max-w-sm text-center">
                        <div className="h-40 w-40 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl shadow-primary/5">
                            <span className="material-symbols-outlined text-7xl text-primary/30">
                                shopping_cart
                            </span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-charcoal dark:text-white mb-2">
                                {t.cart.empty}
                            </h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                {t.cart.empty_desc}
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/home")}
                            className="mt-4 w-full py-5 bg-primary text-white rounded-[24px] font-black text-xl shadow-xl shadow-primary/30 hover:bg-purple-800 active:scale-95 transition-all"
                        >
                            {t.cart.start_shopping}
                        </button>
                    </div>
                </main>

                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span
                            className="material-symbols-outlined text-charcoal dark:text-white font-bold"
                            style={{ fontSize: "28px" }}
                        >
                            arrow_back
                        </span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                        {t.cart.title} ({items.length})
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-64 px-4 pt-4">
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 shadow-sm"
                        >
                            <div className="w-28 h-28 shrink-0 rounded-[24px] overflow-hidden bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                                <div
                                    className="w-full h-full bg-center bg-cover"
                                    style={{ backgroundImage: `url("${item.product.image}")` }}
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <h3 className="text-charcoal dark:text-white text-lg font-black leading-tight line-clamp-2">
                                            {language === 'malay' ? item.product.nameMalay : item.product.name}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mt-1">
                                            {item.product.brand}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.product.id)}
                                        className="p-2 bg-red-50 dark:bg-red-900/10 rounded-xl transition-colors group"
                                        aria-label="Remove item"
                                    >
                                        <span className="material-symbols-outlined text-red-500 font-bold group-hover:scale-110 transition-transform">
                                            delete
                                        </span>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-primary dark:text-white text-xl font-black">
                                        {formatCurrency(item.product.price)}
                                    </span>

                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-600">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity - 1)
                                            }
                                            className="h-10 w-10 rounded-xl bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm active:scale-95 transition-all text-primary"
                                        >
                                            <span className="material-symbols-outlined text-2xl font-black">
                                                remove
                                            </span>
                                        </button>

                                        <span className="text-xl font-black w-8 text-center text-charcoal dark:text-white">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity + 1)
                                            }
                                            className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-2xl font-black">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom Summary & Checkout */}
            <div className="fixed bottom-20 left-4 right-4 bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur-lg rounded-[32px] border border-white dark:border-gray-800 p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] max-w-lg mx-auto z-10 transition-all">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">{t.cart.subtotal}</span>
                            <span className="font-black text-charcoal dark:text-white">{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">{t.cart.delivery}</span>
                            <span className="font-black text-green-600">RM 5.00</span>
                        </div>
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-xl font-black text-charcoal dark:text-white uppercase tracking-tighter">{t.cart.total}</span>
                            <span className="text-3xl font-black text-primary">
                                {formatCurrency(totalPrice + 5)}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/checkout")}
                        className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xl hover:bg-purple-800 active:scale-95 transition-all shadow-xl shadow-primary/30"
                    >
                        {t.cart.checkout}
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
