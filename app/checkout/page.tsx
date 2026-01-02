"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import BottomNav from "@/components/layout/BottomNav";

export default function CheckoutPage() {
    const router = useRouter();
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
                        Checkout
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-48">
                {/* Delivery Address Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-lg">Alamat Penghantaran (Delivery Address)</h2>
                        <button
                            onClick={() => router.push("/checkout/address")}
                            className="text-primary text-sm font-semibold hover:underline"
                        >
                            Ubah (Change)
                        </button>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-2xl text-primary">
                            location_on
                        </span>
                        <div>
                            <p className="font-semibold">Ah Hock</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                +60123456789
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                123, Jalan Bahagia, Taman Sejahtera, 50000 Kuala Lumpur
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Method Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-lg">
                            Kaedah Bayaran (Payment Method)
                        </h2>
                        <button
                            onClick={() => router.push("/checkout/payment")}
                            className="text-primary text-sm font-semibold hover:underline"
                        >
                            Ubah (Change)
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl text-primary">
                                credit_card
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold">Cash on Delivery</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Bayar Semasa Terima (COD)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 mb-4">
                    <h2 className="font-bold text-lg mb-3">
                        Item Pesanan (Order Items) ({items.length})
                    </h2>
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex gap-3 items-center">
                                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                                    <div
                                        className="w-full h-full bg-center bg-cover"
                                        style={{ backgroundImage: `url("${item.product.image}")` }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm line-clamp-1">
                                        {item.product.nameMalay}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatCurrency(item.product.price)} × {item.quantity}
                                    </p>
                                </div>
                                <span className="font-bold">
                                    {formatCurrency(item.product.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4">
                    <h2 className="font-bold text-lg mb-3">Ringkasan (Summary)</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                            <span>Penghantaran (Delivery):</span>
                            <span>{formatCurrency(deliveryFee)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-xl font-bold">
                            <span>Jumlah (Total):</span>
                            <span className="text-primary">{formatCurrency(finalTotal)}</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Place Order Button */}
            <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] max-w-md mx-auto">
                <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-purple-800 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing
                        ? "Memproses... (Processing...)"
                        : `Buat Pesanan (Place Order) • ${formatCurrency(finalTotal)}`}
                </button>
            </div>

            <BottomNav />
        </>
    );
}
