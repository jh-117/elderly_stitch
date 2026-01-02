"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import { getRecommendedProducts } from "@/data/products";
import { useTranslation } from "@/hooks/useTranslation";

export default function SearchPage() {
    const router = useRouter();
    const { t, language } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);

    // Mock search results
    const [recentSearches, setRecentSearches] = useState(
        language === 'malay'
            ? ["Beras", "Minyak Masak", "Susu", "Roti"]
            : ["Rice", "Cooking Oil", "Milk", "Bread"]
    );

    const popularSearches = language === 'malay'
        ? ["Gula", "Garam", "Tepung", "Kopi", "Teh"]
        : ["Sugar", "Salt", "Flour", "Coffee", "Tea"];

    const categories = [
        { name: language === 'malay' ? "Barang Dapur" : "Groceries", icon: "shopping_basket", slug: "groceries" },
        { name: language === 'malay' ? "Kesihatan" : "Health", icon: "medication", slug: "health" },
        { name: language === 'malay' ? "Rumah" : "Home", icon: "home", slug: "home" },
        { name: language === 'malay' ? "Ubat-ubatan" : "Medicine", icon: "pill", slug: "medicine" },
    ];

    const clearRecentSearches = () => setRecentSearches([]);

    const searchResults = searchQuery.length > 0 ? getRecommendedProducts().slice(0, 5) : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 gap-4">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>

                    <div className="flex-1">
                        <div
                            className={`flex w-full h-14 items-center rounded-2xl border-2 ${searchFocused ? "border-primary bg-white shadow-lg shadow-primary/5" : "border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                                } transition-all duration-300 pr-2`}
                        >
                            <div className="text-gray-400 flex items-center justify-center pl-4 pr-2">
                                <span className={`material-symbols-outlined text-3xl font-bold ${searchFocused ? "text-primary" : ""}`}>search</span>
                            </div>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="flex-1 bg-transparent text-charcoal dark:text-white focus:outline-none h-full placeholder:text-gray-400 text-xl font-bold"
                                placeholder={t.home.search_placeholder}
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="h-10 w-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <span className="material-symbols-outlined text-2xl text-gray-400 font-bold">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-charcoal dark:text-white px-2">
                            {language === 'malay' ? "Hasil Carian" : "Search Results"}
                        </h2>
                        <div className="space-y-4">
                            {searchResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {searchQuery && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700 mx-2">
                        <div className="h-40 w-40 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-8xl text-primary/30">search_off</span>
                        </div>
                        <h2 className="text-3xl font-black mb-3 text-charcoal dark:text-white">
                            {language === 'malay' ? "Tiada Keputusan" : "No Results"}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 text-center font-bold px-10">
                            {language === 'malay'
                                ? "Cuba kata kunci lain atau semak ejaan anda"
                                : "Try different keywords or check your spelling"}
                        </p>
                    </div>
                )}

                {/* Recent Searches */}
                {!searchQuery && recentSearches.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-5 px-2">
                            <h2 className="text-2xl font-black text-charcoal dark:text-white">
                                {language === 'malay' ? "Kerap Dicari" : "Recently Searched"}
                            </h2>
                            <button
                                onClick={clearRecentSearches}
                                className="text-lg text-primary font-black hover:underline uppercase tracking-widest text-sm"
                            >
                                {language === 'malay' ? "PADAM" : "CLEAR"}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {recentSearches.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(search)}
                                    className="w-full flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all shadow-sm group"
                                >
                                    <div className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined font-black">history</span>
                                    </div>
                                    <span className="flex-1 text-xl font-bold text-charcoal dark:text-white">{search}</span>
                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">north_west</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular Searches */}
                {!searchQuery && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-charcoal dark:text-white px-2 mb-5">
                            {language === 'malay' ? "Carian Popular" : "Popular Searches"}
                        </h2>
                        <div className="flex flex-wrap gap-3 px-2">
                            {popularSearches.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(search)}
                                    className="px-6 py-4 bg-primary/10 dark:bg-primary/20 text-primary rounded-[20px] text-lg font-black hover:bg-primary/20 transition-all active:scale-95"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Quick Access */}
                {!searchQuery && (
                    <div>
                        <h2 className="text-2xl font-black text-charcoal dark:text-white px-2 mb-5">
                            {t.home.categories}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((category, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => router.push(`/products/${category.slug}`)}
                                    className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 hover:border-primary/40 transition-all shadow-sm group text-center"
                                >
                                    <div className="h-20 w-20 rounded-[24px] bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                                        <span className="material-symbols-outlined text-5xl font-bold">{category.icon}</span>
                                    </div>
                                    <span className="text-xl font-black text-charcoal dark:text-white leading-tight">
                                        {category.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
