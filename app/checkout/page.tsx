"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function CheckoutPage() {
    const router = useRouter();
    const { t, language } = useTranslation();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = getTotalPrice();
    const deliveryFee = 5.0;
    const finalTotal = totalPrice + deliveryFee;

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Simulate order processing
        setTimeout(() => {
            clearCart();
            router.push("/checkout/success");
        }, 2000);
    };

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
                    <h1 className="text-charcoal dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center">
                        {t.checkout.title}
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-48 space-y-4">
                {/* Delivery Address Section */}
                <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-black text-xl text-charcoal dark:text-white tracking-tight">
                            {t.checkout.delivery_address}
                        </h2>
                        <button
                            onClick={() => router.push("/checkout/address")}
                            className="text-primary text-sm font-black uppercase tracking-widest hover:underline"
                        >
                            {t.checkout.change}
                        </button>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-3xl text-primary font-bold">
                                location_on
                            </span>
                        </div>
                        <div>
                            <p className="font-black text-lg text-charcoal dark:text-white">Ah Hock</p>
                            <p className="text-sm font-bold text-gray-400 mt-0.5 tracking-wide">
                                +60123456789
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 font-medium leading-relaxed">
                                123, Jalan Bahagia, Taman Sejahtera, 50000 Kuala Lumpur
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Method Section */}
                <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-black text-xl text-charcoal dark:text-white tracking-tight">
                            {t.checkout.payment_method}
                        </h2>
                        <button
                            onClick={() => router.push("/checkout/payment")}
                            className="text-primary text-sm font-black uppercase tracking-widest hover:underline"
                        >
                            {t.checkout.change}
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-green-50 dark:bg-green-900/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-3xl text-green-600 font-bold">
                                payments
                            </span>
                        </div>
                        <div>
                            <p className="font-black text-lg text-charcoal dark:text-white">{t.checkout.cod}</p>
                            <p className="text-sm font-bold text-gray-400 mt-0.5 tracking-wide">
                                {t.checkout.cod_desc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                    <h2 className="font-black text-xl text-charcoal dark:text-white tracking-tight mb-4">
                        {t.checkout.order_items} ({items.length})
                    </h2>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex gap-4 items-center">
                                <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700">
                                    <div
                                        className="w-full h-full bg-center bg-cover"
                                        style={{ backgroundImage: `url("${item.product.image}")` }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base text-charcoal dark:text-white line-clamp-1">
                                        {language === 'malay' ? item.product.nameMalay : item.product.name}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-400 mt-1">
                                        {formatCurrency(item.product.price)} × {item.quantity}
                                    </p>
                                </div>
                                <span className="font-black text-lg text-charcoal dark:text-white">
                                    {formatCurrency(item.product.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-8">
                    <h2 className="font-black text-xl text-charcoal dark:text-white tracking-tight mb-4">
                        {t.checkout.summary}
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">{t.cart.subtotal}</span>
                            <span className="font-black text-charcoal dark:text-white">{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">{t.cart.delivery}</span>
                            <span className="font-black text-green-600">RM 5.00</span>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center">
                            <span className="text-xl font-black text-charcoal dark:text-white uppercase tracking-tighter">{t.cart.total}</span>
                            <span className="text-2xl font-black text-primary">{formatCurrency(finalTotal)}</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Place Order Button */}
            <div className="fixed bottom-16 left-4 right-4 bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur-md border border-white dark:border-gray-800 p-6 shadow-[0_-15px_30px_rgba(0,0,0,0.1)] rounded-[32px] max-w-md mx-auto z-10 transition-all">
                <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xl hover:bg-purple-800 active:scale-95 transition-all shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing
                        ? t.checkout.processing
                        : `${t.checkout.place_order} • ${formatCurrency(finalTotal)}`}
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
