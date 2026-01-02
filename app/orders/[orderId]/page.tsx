"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useTranslation } from "@/hooks/useTranslation";
import { formatCurrency } from "@/lib/utils";

export default function OrderDetailsPage() {
    const router = useRouter();
    const { t, language } = useTranslation();

    const orderDetails = {
        id: "ORD-2024-001",
        date: language === 'malay' ? "12 Oktober 2024" : "12 October 2024",
        status: "Delivered",
        statusText: t.tracking.delivered,
        deliveryDate: language === 'malay' ? "15 Oktober 2024" : "15 October 2024",
        trackingNumber: "TRK-MY-123456789",
        total: 113.90,
        subtotal: 98.90,
        shipping: 10.00,
        tax: 5.00,
        items: [
            {
                id: 1,
                name: "Minyak Masak",
                nameEn: "Cooking Oil",
                brand: "Saji",
                quantity: 2,
                price: 24.90,
                image: "/products/oil.png",
            },
            {
                id: 2,
                name: "Beras",
                nameEn: "Rice",
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
                        {t.orders.details_title}
                    </h1>
                    <div className="w-14"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24 px-6 space-y-6 pt-6">
                {/* Order Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 shadow-xl p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h2 className="font-black text-3xl tracking-tighter text-charcoal dark:text-white uppercase">{orderDetails.id}</h2>
                            <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.2em]">
                                {t.orders.date}: {orderDetails.date}
                            </p>
                        </div>
                        <div
                            className={`px-6 py-3 rounded-[24px] text-lg font-black border-2 flex items-center gap-2 ${getStatusColor(
                                orderDetails.status
                            )}`}
                        >
                            <span className="material-symbols-outlined text-2xl font-black">check_circle</span>
                            {orderDetails.statusText}
                        </div>
                    </div>

                    {orderDetails.status === "Delivered" && (
                        <div className="bg-green-50 dark:bg-green-900/10 border-4 border-green-100 dark:border-green-900/20 rounded-[30px] p-6 shadow-lg shadow-green-500/5">
                            <div className="flex items-center gap-4 text-green-700 dark:text-green-400">
                                <span className="material-symbols-outlined text-4xl font-black">verified</span>
                                <span className="font-black text-xl">
                                    {t.tracking.delivered_on} {orderDetails.deliveryDate}
                                </span>
                            </div>
                        </div>
                    )}

                    {orderDetails.trackingNumber && (
                        <div className="pt-6 border-t-4 border-gray-50 dark:border-gray-700/50">
                            <p className="text-sm text-gray-400 font-black uppercase tracking-[0.2em] mb-2">
                                {t.tracking.tracking_number}
                            </p>
                            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                                <p className="font-mono text-2xl font-black text-charcoal dark:text-white">{orderDetails.trackingNumber}</p>
                                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">content_copy</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => router.push(`/orders/track/${orderDetails.id}`)}
                        className="w-full h-20 rounded-[32px] bg-primary text-white text-2xl font-black shadow-2xl shadow-primary/30 hover:bg-purple-800 active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-purple-900"
                    >
                        <span className="material-symbols-outlined text-3xl font-black">location_on</span>
                        {t.tracking.title.toUpperCase()}
                    </button>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-charcoal dark:text-white tracking-tight pl-2">
                        {t.orders.products} ({orderDetails.items.length} {orderDetails.items.length > 1 ? t.orders.item_plural : t.orders.item_singular})
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden divide-y-4 divide-gray-50 dark:divide-gray-700/50">
                        {orderDetails.items.map((item) => (
                            <div
                                key={item.id}
                                className="p-6 flex gap-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                            >
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-[28px] flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 shadow-inner group">
                                    <span className="material-symbols-outlined text-5xl text-gray-300 group-hover:scale-110 transition-transform">
                                        shopping_bag
                                    </span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-black text-2xl text-charcoal dark:text-white tracking-tight">{language === 'malay' ? item.name : item.nameEn}</h4>
                                    <p className="text-lg text-gray-400 font-bold uppercase tracking-widest">
                                        {item.brand}
                                    </p>
                                    <div className="flex justify-between items-end pt-2">
                                        <p className="text-lg text-gray-500 dark:text-gray-400 font-bold">
                                            {language === 'malay' ? 'Kuantiti' : 'Qty'}: <span className="text-charcoal dark:text-white font-black">{item.quantity}</span>
                                        </p>
                                        <p className="text-2xl font-black text-primary">{formatCurrency(item.price)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-charcoal dark:text-white tracking-tight pl-2">
                        {t.orders.shipping_address}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 shadow-xl p-8 relative overflow-hidden group">
                        <div className="flex gap-6 relative z-10">
                            <div className="h-16 w-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                <span className="material-symbols-outlined text-4xl font-black">
                                    location_on
                                </span>
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="font-black text-2xl text-charcoal dark:text-white tracking-tight">
                                    {orderDetails.shippingAddress.name}
                                </p>
                                <p className="text-xl text-primary font-black tracking-widest">
                                    {orderDetails.shippingAddress.phone}
                                </p>
                                <p className="text-lg text-gray-500 dark:text-gray-400 font-bold leading-relaxed pt-2 border-t-2 border-gray-50 dark:border-gray-700/50 mt-4">
                                    {orderDetails.shippingAddress.address}
                                </p>
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                            <span className="material-symbols-outlined text-[160px] font-black">home</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-charcoal dark:text-white tracking-tight pl-2">
                        {t.orders.payment_method}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 shadow-xl p-8 flex items-center gap-6 group">
                        <div className="h-16 w-16 rounded-[24px] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                            <span className="material-symbols-outlined text-4xl font-black">
                                account_balance_wallet
                            </span>
                        </div>
                        <span className="text-2xl font-black text-charcoal dark:text-white tracking-tight">{orderDetails.paymentMethod}</span>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-charcoal dark:text-white tracking-tight pl-2">
                        {t.orders.summary}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 shadow-xl p-8 space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-black text-gray-400 uppercase tracking-widest">{t.cart.subtotal}</span>
                            <span className="text-2xl font-black text-charcoal dark:text-white">{formatCurrency(orderDetails.subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-lg font-black text-gray-400 uppercase tracking-widest">{t.cart.delivery}</span>
                            <span className="text-2xl font-black text-green-600">{formatCurrency(orderDetails.shipping)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-lg font-black text-gray-400 uppercase tracking-widest">{language === 'malay' ? 'Cukai' : 'Tax'}</span>
                            <span className="text-2xl font-black text-charcoal dark:text-white">{formatCurrency(orderDetails.tax)}</span>
                        </div>
                        <div className="border-t-4 border-gray-50 dark:border-gray-700/50 pt-5 mt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-black text-charcoal dark:text-white uppercase tracking-tighter">{t.cart.total}</span>
                                <span className="text-4xl font-black text-primary">
                                    {formatCurrency(orderDetails.total)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 space-y-4">
                    <button className="w-full h-20 rounded-[32px] border-4 border-primary text-primary text-2xl font-black hover:bg-primary/5 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-4">
                        <span className="material-symbols-outlined text-3xl font-black">reorder</span>
                        {t.orders.reorder.toUpperCase()}
                    </button>
                    <button className="w-full h-18 rounded-[32px] border-4 border-gray-200 dark:border-gray-700 text-charcoal dark:text-white text-xl font-black hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-4">
                        <span className="material-symbols-outlined text-3xl font-black">download</span>
                        {t.orders.download_invoice.toUpperCase()}
                    </button>
                    <button className="w-full h-18 rounded-[32px] border-4 border-red-200 dark:border-red-900/30 text-red-500 text-xl font-black hover:bg-red-50 dark:hover:bg-red-900/10 active:scale-95 transition-all flex items-center justify-center gap-4">
                        <span className="material-symbols-outlined text-3xl font-black">support_agent</span>
                        {t.orders.contact_support.toUpperCase()}
                    </button>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
