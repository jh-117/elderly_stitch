"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import BottomNav from "@/components/layout/BottomNav";

export default function CartPage() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
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
                            Troli Beli-Belah (Shopping Cart)
                        </h1>
                        <div className="w-12"></div>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center p-8 pb-24">
                    <div className="flex flex-col items-center gap-4 max-w-sm">
                        <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-gray-400">
                                shopping_cart
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-center">
                            Troli Anda Kosong
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Your cart is empty. Start shopping to add items!
                        </p>
                        <button
                            onClick={() => router.push("/home")}
                            className="mt-4 px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-purple-800 active:scale-95 transition-all"
                        >
                            Mula Beli-Belah (Start Shopping)
                        </button>
                    </div>
                </main>

                <BottomNav />
            </>
        );
    }

    return (
        <>
            {/* Header */}
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
                        Troli Beli-Belah ({items.length})
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-48">
                <div className="p-4 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
                        >
                            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700">
                                <div
                                    className="w-full h-full bg-center bg-cover"
                                    style={{ backgroundImage: `url("${item.product.image}")` }}
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-charcoal dark:text-white text-lg font-bold line-clamp-2">
                                        {item.product.nameMalay}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                        {item.product.brand}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-charcoal dark:text-white text-xl font-bold">
                                        {formatCurrency(item.product.price)}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity - 1)
                                            }
                                            className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                remove
                                            </span>
                                        </button>

                                        <span className="text-lg font-bold w-8 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity + 1)
                                            }
                                            className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-xl">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeItem(item.product.id)}
                                className="self-start p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label="Remove item"
                            >
                                <span className="material-symbols-outlined text-red-500">
                                    delete
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom Summary & Checkout */}
            <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] max-w-md mx-auto">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-medium">Subtotal:</span>
                        <span className="font-bold">{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Penghantaran (Delivery):</span>
                        <span>RM 5.00</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between items-center text-xl font-bold">
                        <span>Jumlah (Total):</span>
                        <span className="text-primary">
                            {formatCurrency(totalPrice + 5)}
                        </span>
                    </div>
                    <button
                        onClick={() => router.push("/checkout")}
                        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-purple-800 active:scale-95 transition-all shadow-md"
                    >
                        Teruskan Bayaran (Proceed to Checkout)
                    </button>
                </div>
            </div>

            <BottomNav />
        </>
    );
}
