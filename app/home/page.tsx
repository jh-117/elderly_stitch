"use client";

import { formatDateMalay } from "@/lib/utils";
import { categories } from "@/data/categories";
import { getRecommendedProducts } from "@/data/products";
import CategoryCard from "@/components/products/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import BottomNav from "@/components/layout/BottomNav";
import FloatingAIButton from "@/components/ui/FloatingAIButton";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
    const user = useAuthStore((state) => state.user);
    const userName = user?.name || "Pengguna";
    const today = formatDateMalay(new Date());
    const recommendedProducts = getRecommendedProducts();

    return (
        <>
            {/* Header */}
            <header className="flex items-center p-5 pb-2 justify-between bg-background-light dark:bg-[#101922] sticky top-0 z-10">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {today}
                    </span>
                    <h2 className="text-charcoal dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                        Selamat Pagi,
                        <br />
                        {userName}
                    </h2>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <button
                        aria-label="Increase text size"
                        className="flex items-center justify-center rounded-full h-12 w-12 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-3xl">
                            text_increase
                        </span>
                    </button>
                    <button
                        aria-label="Notifications"
                        className="flex items-center justify-center rounded-full h-12 w-12 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-charcoal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-3xl">
                            notifications
                        </span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-24">
                {/* Search Bar */}
                <div className="px-5 py-4">
                    <label className="flex flex-col h-14 w-full cursor-text">
                        <div className="flex w-full flex-1 items-center rounded-xl h-full border border-gray-200 dark:border-gray-700 focus-within:border-primary bg-white dark:bg-gray-800 transition-colors pr-2 shadow-sm">
                            <div className="text-[#617589] dark:text-gray-400 flex items-center justify-center pl-4 pr-2">
                                <span className="material-symbols-outlined text-3xl">search</span>
                            </div>
                            <input
                                className="flex w-full flex-1 resize-none bg-transparent text-charcoal dark:text-white focus:outline-none h-full placeholder:text-[#617589] dark:placeholder:text-gray-500 px-2 text-lg font-normal"
                                placeholder="Cari barang (Search)..."
                            />
                            <button
                                aria-label="AI Voice Navigation"
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-purple-800 transition-colors active:scale-95"
                                title="Navigasi Suara (Voice Navigation)"
                            >
                                <span className="material-symbols-outlined text-2xl font-bold">
                                    mic
                                </span>
                            </button>
                        </div>
                    </label>
                </div>

                {/* Categories Section */}
                <section>
                    <div className="flex justify-between items-center px-5 pt-2 pb-4">
                        <h2 className="text-charcoal dark:text-white text-[22px] font-bold leading-tight">
                            Kategori (Categories)
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 px-5">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>

                {/* Recommended Products Section */}
                <section className="mt-6">
                    <div className="flex justify-between items-center px-5 py-4">
                        <h2 className="text-charcoal dark:text-white text-[22px] font-bold leading-tight">
                            Disyorkan (Recommended)
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4 px-5 pb-5">
                        {recommendedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>

            {/* Floating AI Button */}
            <FloatingAIButton />

            {/* Bottom Navigation */}
            <BottomNav />
        </>
    );
}
