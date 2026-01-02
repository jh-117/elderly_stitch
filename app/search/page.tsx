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
        { name: t.search.groceries, icon: "shopping_basket", slug: "groceries" },
        { name: t.search.health, icon: "medication", slug: "health" },
        { name: t.search.home, icon: "home", slug: "home" },
        { name: t.search.medicine, icon: "pill", slug: "medicine" },
    ];

    const clearRecentSearches = () => setRecentSearches([]);

    const searchResults = searchQuery.length > 0 ? getRecommendedProducts().slice(0, 5) : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#101922] flex flex-col">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a2632]/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center p-4 gap-4 h-20">
                    <button
                        onClick={() => router.back()}
                        aria-label={t.common.back}
                        className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white border border-gray-100 dark:border-gray-700 active:scale-90 transition-all font-black"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">arrow_back</span>
                    </button>

                    <div className="flex-1">
                        <div
                            className={`flex w-full h-14 items-center rounded-2xl border-4 transition-all duration-300 pr-2 ${searchFocused ? "border-primary bg-white shadow-xl shadow-primary/10 scale-[1.02]" : "border-transparent bg-gray-50 dark:bg-gray-800"
                                }`}
                        >
                            <div className="text-gray-400 flex items-center justify-center pl-4 pr-2">
                                <span className={`material-symbols-outlined text-3xl font-black ${searchFocused ? "text-primary" : ""}`}>search</span>
                            </div>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="flex-1 bg-transparent text-charcoal dark:text-white focus:outline-none h-full placeholder:text-gray-400 text-xl font-black tracking-tight"
                                placeholder={t.home.search_placeholder}
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl transition-all active:scale-90"
                                >
                                    <span className="material-symbols-outlined text-2xl text-charcoal dark:text-white font-black">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-charcoal dark:text-white px-2 tracking-tighter">
                            {t.search.results}
                        </h2>
                        <div className="space-y-5">
                            {searchResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {searchQuery && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-[48px] shadow-2xl shadow-gray-200/50 dark:shadow-none border-4 border-gray-50 dark:border-gray-700 mt-4">
                        <div className="h-48 w-48 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-8 shadow-inner relative">
                            <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping"></div>
                            <span className="material-symbols-outlined text-9xl text-primary/20 font-black relative z-10">search_off</span>
                        </div>
                        <h2 className="text-4xl font-black mb-4 text-charcoal dark:text-white tracking-tighter">
                            {t.search.no_results}
                        </h2>
                        <p className="text-2xl text-gray-400 dark:text-gray-500 text-center font-bold px-12 leading-relaxed">
                            {t.search.no_results_desc}
                        </p>
                    </div>
                )}

                {/* Recent Searches */}
                {!searchQuery && recentSearches.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h2 className="text-3xl font-black text-charcoal dark:text-white tracking-tighter">
                                {t.search.recent}
                            </h2>
                            <button
                                onClick={clearRecentSearches}
                                className="text-lg text-primary font-black hover:underline uppercase tracking-[0.2em] px-3 py-1 bg-primary/5 rounded-lg transition-all active:scale-95"
                            >
                                {t.search.clear}
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentSearches.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(search)}
                                    className="w-full flex items-center gap-5 p-6 bg-white dark:bg-gray-800 rounded-[32px] border-4 border-white dark:border-gray-800 hover:border-primary/20 transition-all shadow-sm group active:scale-98"
                                >
                                    <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                        <span className="material-symbols-outlined font-black text-2xl">history</span>
                                    </div>
                                    <span className="flex-1 text-2xl font-black text-charcoal dark:text-white text-left tracking-tight">{search}</span>
                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform font-black">north_west</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular Searches */}
                {!searchQuery && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-charcoal dark:text-white px-2 mb-6 tracking-tighter">
                            {t.search.popular}
                        </h2>
                        <div className="flex flex-wrap gap-4 px-2">
                            {popularSearches.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(search)}
                                    className="px-8 py-5 bg-white dark:bg-gray-800 text-primary rounded-[30px] text-2xl font-black border-4 border-gray-50 dark:border-gray-700 shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-95"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Quick Access */}
                {!searchQuery && (
                    <div className="pb-8">
                        <h2 className="text-3xl font-black text-charcoal dark:text-white px-2 mb-8 tracking-tighter">
                            {t.home.categories}
                        </h2>
                        <div className="grid grid-cols-2 gap-5">
                            {categories.map((category, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => router.push(`/products/${category.slug}`)}
                                    className="flex flex-col items-center gap-6 p-8 bg-white dark:bg-gray-800 rounded-[40px] border-4 border-white dark:border-gray-800 hover:border-primary/20 transition-all shadow-sm group text-center"
                                >
                                    <div className="h-24 w-24 rounded-[32px] bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 shadow-inner">
                                        <span className="material-symbols-outlined text-6xl font-black">{category.icon}</span>
                                    </div>
                                    <span className="text-2xl font-black text-charcoal dark:text-white leading-tight tracking-tighter">
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
