"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
    const router = useRouter();
    const { t, language } = useTranslation();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock product data
    const product = {
        id: params.productId,
        name: language === 'malay' ? "Minyak Masak Saji" : "Saji Cooking Oil",
        brand: "Saji",
        price: 24.90,
        originalPrice: 29.90,
        rating: 4.8,
        reviews: 324,
        description: language === 'malay'
            ? "Minyak masak berkualiti tinggi yang sesuai untuk menggoreng dan memasak. Diperbuat daripada bahan pilihan untuk kesihatan keluarga anda."
            : "High quality cooking oil suitable for frying and cooking. Made from selected ingredients for your family's health.",
        stock: 48,
        category: "groceries",
        images: ["/products/oil.png", "/products/oil.png", "/products/oil.png"],
        specifications: [
            { label: language === 'malay' ? "Berat" : "Weight", value: "1kg" },
            { label: language === 'malay' ? "Jenama" : "Brand", value: "Saji" },
            { label: language === 'malay' ? "Jenis" : "Type", value: language === 'malay' ? "Minyak Sawit" : "Palm Oil" },
            { label: language === 'malay' ? "Keluaran" : "Made in", value: "Malaysia" },
        ],
        features: language === 'malay'
            ? ["Kualiti premium untuk keluarga", "Sesuai untuk menggoreng dan memasak", "Dipercayai lebih 30 tahun", "Halal dan selamat"]
            : ["Premium quality for family", "Suitable for frying and cooking", "Trusted for over 30 years", "Halal and safe"],
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            useCartStore.getState().addItem(product as any);
        }
        alert(`${quantity} ${t.product.added_to_cart}`);
    };

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
                    <h1 className="text-charcoal dark:text-white text-xl font-black flex-1 text-center line-clamp-1 px-4">
                        {t.product.details}
                    </h1>
                    <button
                        aria-label="Share"
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white"
                    >
                        <span className="material-symbols-outlined text-3xl font-bold">share</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-64">
                {/* Product Images */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-b-[48px] shadow-sm">
                    <div className="relative aspect-square bg-gray-50 dark:bg-gray-700/50 rounded-[40px] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-inner">
                        <div
                            className="absolute inset-0 bg-center bg-contain bg-no-repeat m-10 transition-all duration-500"
                            style={{ backgroundImage: `url("${product.images[selectedImage]}")` }}
                        ></div>
                        <button className="absolute top-6 right-6 h-14 w-14 bg-white/90 dark:bg-black/40 rounded-2xl backdrop-blur-md shadow-xl flex items-center justify-center active:scale-90 transition-all">
                            <span className="material-symbols-outlined text-red-500 text-3xl font-bold">
                                favorite_border
                            </span>
                        </button>
                        {product.originalPrice && (
                            <div className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white text-base font-black rounded-2xl shadow-lg shadow-red-500/30">
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </div>
                        )}
                    </div>
                    {/* Image Thumbnails */}
                    <div className="flex gap-4 mt-6 justify-center">
                        {product.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-20 rounded-2xl border-4 transition-all duration-300 ${selectedImage === idx
                                        ? "border-primary scale-110 shadow-lg shadow-primary/20"
                                        : "border-gray-100 dark:border-gray-700 opacity-60 hover:opacity-100"
                                    } overflow-hidden bg-white dark:bg-gray-700`}
                            >
                                <div className="w-full h-full bg-center bg-contain bg-no-repeat m-2" style={{ backgroundImage: `url("${product.images[idx]}")` }}></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="bg-white dark:bg-gray-800 p-8 mt-4 rounded-[40px] shadow-sm mx-4 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-black rounded-xl uppercase tracking-widest">
                                {product.brand}
                            </span>
                            <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/10 px-3 py-2 rounded-xl">
                                <span className="material-symbols-outlined text-yellow-500 text-2xl fill-current font-bold">star</span>
                                <span className="font-black text-lg text-yellow-700 dark:text-yellow-500">
                                    {product.rating} <span className="text-yellow-600/50 dark:text-yellow-600/50 font-bold">({product.reviews})</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-black mb-4 text-charcoal dark:text-white leading-tight tracking-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl font-black text-primary">
                            {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-300 line-through font-bold">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-black ${product.stock > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            }`}>
                            <span className="material-symbols-outlined text-2xl font-bold">
                                {product.stock > 0 ? "check_circle" : "cancel"}
                            </span>
                            {product.stock > 0 ? `${t.product.in_stock} (${product.stock})` : t.product.out_of_stock}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 p-8 mt-4 rounded-[40px] shadow-sm mx-4 border border-gray-50 dark:border-gray-700">
                    <h2 className="text-2xl font-black mb-4 text-charcoal dark:text-white tracking-tight">
                        {t.product.description}
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-bold leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Features */}
                <div className="bg-white dark:bg-gray-800 p-8 mt-4 rounded-[40px] shadow-sm mx-4 border border-gray-50 dark:border-gray-700">
                    <h2 className="text-2xl font-black mb-4 text-charcoal dark:text-white tracking-tight">
                        {t.product.features}
                    </h2>
                    <div className="space-y-4">
                        {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 transition-all">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary text-xl font-black">check</span>
                                </div>
                                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-white dark:bg-gray-800 p-8 mt-4 rounded-[40px] shadow-sm mx-4 border border-gray-50 dark:border-gray-700 mb-8">
                    <h2 className="text-2xl font-black mb-4 text-charcoal dark:text-white tracking-tight">
                        {t.product.specifications}
                    </h2>
                    <div className="space-y-4">
                        {product.specifications.map((spec, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
                            >
                                <span className="text-lg font-black text-gray-400 uppercase tracking-widest text-xs">{spec.label}</span>
                                <span className="text-xl font-bold text-charcoal dark:text-white">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-16 left-4 right-4 bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur-lg border border-white dark:border-gray-800 p-6 shadow-[0_-15px_30px_rgba(0,0,0,0.1)] rounded-[32px] max-w-lg mx-auto z-50 transition-all">
                <div className="flex items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-[24px] p-2 border border-gray-100 dark:border-gray-700">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="flex items-center justify-center w-12 h-12 rounded-[18px] bg-white dark:bg-gray-700 shadow-sm active:scale-90 transition-all text-primary"
                        >
                            <span className="material-symbols-outlined font-black">remove</span>
                        </button>
                        <span className="w-8 text-center font-black text-2xl text-charcoal dark:text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="flex items-center justify-center w-12 h-12 rounded-[18px] bg-primary text-white shadow-lg shadow-primary/20 active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined font-black">add</span>
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 h-16 rounded-[24px] bg-primary text-white font-black text-xl hover:bg-purple-800 transition-all active:scale-[0.95] shadow-xl shadow-primary/30 flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined text-3xl font-black">shopping_cart</span>
                        {t.common.add_to_cart}
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
