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
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-xl max-w-sm mx-auto">
                    <span className="material-symbols-outlined text-6xl text-red-500 mb-4 font-bold">error</span>
                    <h1 className="text-2xl font-black text-charcoal dark:text-white mb-2">
                        {language === 'malay' ? "Kategori Tidak Ditemui" : "Category Not Found"}
                    </h1>
                    <button onClick={() => router.back()} className="mt-4 px-8 py-3 bg-primary text-white rounded-2xl font-black">
                        {t.common.back}
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
                <div className="flex items-center p-4 justify-between h-16">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>
                    <h1 className="text-charcoal dark:text-white text-2xl font-black leading-tight tracking-tight flex-1 text-center px-4">
                        {categoryName}
                    </h1>
                    <button
                        onClick={() => router.push("/cart")}
                        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white relative shadow-lg shadow-primary/20 active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-3xl font-bold">shopping_cart</span>
                        {totalItemsInCart > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white shadow-lg border-2 border-white dark:border-gray-800 animate-bounce">
                                {totalItemsInCart}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 pb-24">
                <div className="flex items-center justify-between mb-6 px-2">
                    <p className="text-gray-400 text-lg font-bold tracking-wide uppercase">
                        {products.length} {language === 'malay' ? "Produk" : "Products"}
                    </p>
                    <div className="flex gap-2">
                        <button className="h-12 w-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm active:scale-90 transition-all">
                            <span className="material-symbols-outlined font-black">sort</span>
                        </button>
                        <button className="h-12 w-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm active:scale-90 transition-all">
                            <span className="material-symbols-outlined font-black">filter_list</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} variant="horizontal" />
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
