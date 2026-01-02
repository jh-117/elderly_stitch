"use client";

import { useRouter } from "next/navigation";
import { getProductsByCategory } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/products/ProductCard";
import BottomNav from "@/components/layout/BottomNav";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProductListingPage({
    params,
}: {
    params: { category: string };
}) {
    const router = useRouter();
    const { t, language } = useTranslation();
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());

    const category = categories.find((c) => c.slug === params.category);
    const products = getProductsByCategory(params.category);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-[48px] shadow-2xl max-w-sm mx-auto border-4 border-gray-50 dark:border-gray-700">
                    <div className="h-24 w-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-6xl text-red-500 font-black">error</span>
                    </div>
                    <h1 className="text-3xl font-black text-charcoal dark:text-white mb-6">
                        {language === 'malay' ? "Kategori Tidak Ditemui" : "Category Not Found"}
                    </h1>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xl shadow-xl shadow-primary/30 active:scale-95 transition-all"
                    >
                        {t.common.back.toUpperCase()}
                    </button>
                </div>
            </div>
        );
    }

    const categoryName = language === 'malay' ? category.nameMalay : category.name;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center p-4 justify-between h-20">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white border border-gray-100 dark:border-gray-700 transition-all active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-3xl font-black leading-tight tracking-tight flex-1 text-center px-4 line-clamp-1">
                        {categoryName}
                    </h1>
                    <button
                        onClick={() => router.push("/cart")}
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white relative shadow-xl shadow-primary/30 active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-3xl font-bold">shopping_cart</span>
                        {totalItemsInCart > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-lg border-4 border-white dark:border-gray-800 animate-bounce">
                                {totalItemsInCart}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-primary">{products.length}</span>
                        <span className="text-xl font-bold text-gray-400 uppercase tracking-widest">
                            {t.common.products}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button className="h-14 w-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-sm active:scale-90 transition-all hover:border-primary/20">
                            <span className="material-symbols-outlined font-black text-2xl">sort</span>
                        </button>
                        <button className="h-14 w-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-sm active:scale-90 transition-all hover:border-primary/20">
                            <span className="material-symbols-outlined font-black text-2xl">filter_list</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} variant="horizontal" />
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
