"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock product data - in a real app, fetch from API
    const product = {
        id: params.productId,
        name: "Minyak Masak Saji (Cooking Oil)",
        brand: "Saji",
        price: 24.90,
        originalPrice: 29.90,
        rating: 4.8,
        reviews: 324,
        description:
            "Minyak masak berkualiti tinggi yang sesuai untuk menggoreng dan memasak. Diperbuat daripada bahan pilihan untuk kesihatan keluarga anda.",
        descriptionEn: "High quality cooking oil suitable for frying and cooking. Made from selected ingredients for your family's health.",
        stock: 48,
        category: "groceries",
        images: ["/products/oil.png", "/products/oil.png", "/products/oil.png"],
        specifications: [
            { label: "Berat (Weight)", value: "1kg" },
            { label: "Jenama (Brand)", value: "Saji" },
            { label: "Jenis (Type)", value: "Minyak Sawit (Palm Oil)" },
            { label: "Keluaran (Made in)", value: "Malaysia" },
        ],
        features: [
            "Kualiti premium untuk keluarga",
            "Sesuai untuk menggoreng dan memasak",
            "Dipercayai lebih 30 tahun",
            "Halal dan selamat",
        ],
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            useCartStore.getState().addItem(product as any);
        }
        alert(`${quantity} item(s) ditambah ke troli!`);
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
                    <h1 className="text-charcoal dark:text-white text-lg font-bold flex-1 text-center line-clamp-1">
                        Butiran Produk
                    </h1>
                    <button
                        aria-label="Share"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span className="material-symbols-outlined text-charcoal dark:text-white">
                            share
                        </span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32">
                {/* Product Images */}
                <div className="bg-white dark:bg-gray-800 p-4">
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
                        <div
                            className="absolute inset-0 bg-center bg-contain bg-no-repeat m-8"
                            style={{ backgroundImage: `url("${product.images[selectedImage]}")` }}
                        ></div>
                        <button className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-black/40 rounded-full backdrop-blur-sm shadow-lg">
                            <span className="material-symbols-outlined text-red-500 text-2xl">
                                favorite_border
                            </span>
                        </button>
                        {product.originalPrice && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                                JIMAT{" "}
                                {Math.round(
                                    ((product.originalPrice - product.price) /
                                        product.originalPrice) *
                                    100
                                )}
                                %
                            </div>
                        )}
                    </div>
                    {/* Image Thumbnails */}
                    <div className="flex gap-2 mt-3 justify-center">
                        {product.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-16 h-16 rounded-lg border-2 ${selectedImage === idx
                                        ? "border-primary"
                                        : "border-gray-200 dark:border-gray-600"
                                    } overflow-hidden bg-gray-100 dark:bg-gray-700`}
                            >
                                <div className="w-full h-full bg-white dark:bg-gray-800"></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="bg-white dark:bg-gray-800 p-5 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                            {product.brand}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-yellow-500 text-lg fill-current">
                                star
                            </span>
                            <span className="font-semibold text-sm">
                                {product.rating} <span className="text-gray-400">({product.reviews})</span>
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-2 text-charcoal dark:text-white">
                        {product.name}
                    </h1>

                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-primary">
                            RM {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                                RM {product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span
                            className={`flex items-center gap-1 ${product.stock > 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {product.stock > 0 ? "check_circle" : "cancel"}
                            </span>
                            {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 p-5 mt-2">
                    <h2 className="text-lg font-bold mb-3">Keterangan (Description)</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">{product.descriptionEn}</p>
                </div>

                {/* Features */}
                <div className="bg-white dark:bg-gray-800 p-5 mt-2">
                    <h2 className="text-lg font-bold mb-3">Ciri-ciri (Features)</h2>
                    <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                                    check_circle
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-white dark:bg-gray-800 p-5 mt-2">
                    <h2 className="text-lg font-bold mb-3">Spesifikasi (Specifications)</h2>
                    <div className="space-y-3">
                        {product.specifications.map((spec, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                            >
                                <span className="text-gray-600 dark:text-gray-400">{spec.label}</span>
                                <span className="font-semibold">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-10">
                <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-700 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-700 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 h-14 rounded-xl bg-primary text-white font-bold text-lg hover:bg-purple-800 transition-colors active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-2xl">add_shopping_cart</span>
                        Tambah ke Troli
                    </button>
                </div>
            </div>

            <BottomNav />
        </>
    );
}
