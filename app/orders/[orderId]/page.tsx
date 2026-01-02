"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function OrderDetailsPage() {
    const router = useRouter();

    const orderDetails = {
        id: "ORD-2024-001",
        date: "12 Oktober 2024",
        status: "Delivered",
        statusMalay: "Dihantar",
        deliveryDate: "15 Oktober 2024",
        trackingNumber: "TRK-MY-123456789",
        total: 113.90,
        subtotal: 98.90,
        shipping: 10.00,
        tax: 5.00,
        items: [
            {
                id: 1,
                name: "Minyak Masak (Cooking Oil)",
                brand: "Saji",
                quantity: 2,
                price: 24.90,
                image: "/products/oil.png",
            },
            {
                id: 2,
                name: "Beras (Rice)",
                brand: "Faiza",
                quantity: 1,
                price: 49.00,
                image: "/products/rice.png",
            },
        ],
        shippingAddress: {
            name: "Ahmad bin Abdullah",
            phone: "+60 12-345 6789",
            address: "No. 123, Jalan Merdeka, Taman Bahagia, 50450 Kuala Lumpur, Malaysia",
        },
        paymentMethod: "Touch 'n Go eWallet",
    };

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
                        Butiran Pesanan (Order Details)
                    </h1>
                    <div className="w-12"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Order Status Card */}
                <div className="p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="font-bold text-xl mb-1">{orderDetails.id}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Tarikh: {orderDetails.date}
                                </p>
                            </div>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                    orderDetails.status
                                )}`}
                            >
                                {orderDetails.statusMalay}
                            </span>
                        </div>

                        {orderDetails.status === "Delivered" && (
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span className="font-semibold">
                                        Dihantar pada {orderDetails.deliveryDate}
                                    </span>
                                </div>
                            </div>
                        )}

                        {orderDetails.trackingNumber && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Nombor Penjejakan (Tracking)
                                </p>
                                <p className="font-mono font-semibold">{orderDetails.trackingNumber}</p>
                            </div>
                        )}

                        <button
                            onClick={() => router.push(`/orders/track/${orderDetails.id}`)}
                            className="w-full mt-4 h-12 rounded-xl bg-primary text-white font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">location_on</span>
                            Jejak Pesanan (Track Order)
                        </button>
                    </div>
                </div>

                {/* Order Items */}
                <div className="px-4 pb-4">
                    <h3 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Produk ({orderDetails.items.length} item)
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {orderDetails.items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`p-4 flex gap-4 ${index !== orderDetails.items.length - 1
                                    ? "border-b border-gray-100 dark:border-gray-700"
                                    : ""
                                    }`}
                            >
                                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-gray-400">
                                        shopping_bag
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-1">{item.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        {item.brand}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Kuantiti: {item.quantity}
                                        </p>
                                        <p className="font-bold text-primary">RM {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="px-4 pb-4">
                    <h3 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Alamat Penghantaran (Shipping Address)
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined text-primary text-2xl">
                                location_on
                            </span>
                            <div>
                                <p className="font-semibold mb-1">
                                    {orderDetails.shippingAddress.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    {orderDetails.shippingAddress.phone}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {orderDetails.shippingAddress.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="px-4 pb-4">
                    <h3 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Kaedah Pembayaran (Payment Method)
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-2xl">
                                account_balance_wallet
                            </span>
                            <span className="font-semibold">{orderDetails.paymentMethod}</span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="px-4 pb-4">
                    <h3 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                        Ringkasan (Summary)
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                                Subjumlah (Subtotal)
                            </span>
                            <span className="font-semibold">RM {orderDetails.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                                Penghantaran (Shipping)
                            </span>
                            <span className="font-semibold">RM {orderDetails.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Cukai (Tax)</span>
                            <span className="font-semibold">RM {orderDetails.tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="flex justify-between">
                                <span className="font-bold text-lg">Jumlah (Total)</span>
                                <span className="font-bold text-lg text-primary">
                                    RM {orderDetails.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-4 space-y-3">
                    <button className="w-full h-12 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors">
                        Beli Lagi (Reorder)
                    </button>
                    <button className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 text-charcoal dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Muat Turun Invois (Download Invoice)
                    </button>
                    <button className="w-full h-12 rounded-xl border border-red-200 dark:border-red-800 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Hubungi Sokongan (Contact Support)
                    </button>
                </div>
            </main>

            <BottomNav />
        </>
    );
}
