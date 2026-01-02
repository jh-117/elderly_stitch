"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/products/ProductCard";
import { getRecommendedProducts } from "@/data/products";

export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);

    // Mock search results - in a real app, filter based on searchQuery
    const [recentSearches, setRecentSearches] = useState([
        "Beras (Rice)",
        "Minyak Masak (Cooking Oil)",
        "Susu (Milk)",
        "Roti (Bread)",
    ]);

    const popularSearches = [
        "Gula (Sugar)",
        "Garam (Salt)",
        "Tepung (Flour)",
        "Kopi (Coffee)",
        "Teh (Tea)",
    ];

    const clearRecentSearches = () => setRecentSearches([]);

    const searchResults = searchQuery.length > 0 ? getRecommendedProducts().slice(0, 5) : [];

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2632] shadow-sm">
                <div className="flex items-center p-4 gap-3">
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

                    {/* Search Bar */}
                    <div className="flex-1">
                        <label className="flex flex-col h-12 w-full cursor-text">
                            <div
                                className={`flex w-full flex-1 items-center rounded-xl h-full border ${searchFocused
                                    ? "border-primary"
                                    : "border-gray-200 dark:border-gray-700"
                                    } bg-white dark:bg-gray-800 transition-colors pr-2`}
                            >
                                <div className="text-[#617589] dark:text-gray-400 flex items-center justify-center pl-4 pr-2">
                                    <span className="material-symbols-outlined text-2xl">search</span>
                                </div>
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    className="flex w-full flex-1 resize-none bg-transparent text-charcoal dark:text-white focus:outline-none h-full placeholder:text-[#617589] dark:placeholder:text-gray-500 px-2 text-base font-normal"
                                    placeholder="Cari barang (Search)..."
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                    >
                                        <span className="material-symbols-outlined text-xl text-gray-400">
                                            close
                                        </span>
                                    </button>
                                )}
                            </div>
                        </label>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-24">
                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                            Keputusan Carian (Search Results)
                        </h2>
                        <div className="space-y-3">
                            {searchResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {searchQuery && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-6xl text-gray-400">
                                search_off
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-charcoal dark:text-white">
                            Tiada Keputusan (No Results)
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Cuba kata kunci lain atau semak ejaan anda
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-1">
                            Try different keywords or check your spelling
                        </p>
                    </div>
                )}

                {/* Recent Searches */}
                {!searchQuery && (
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold text-charcoal dark:text-white">
                                (Recent)
                            </h2>
                            <button
                                onClick={clearRecentSearches}
                                className="text-sm text-primary font-semibold hover:underline"
                            >
                                Padam Semua (Clear)
                            </button>
                        </div>
                        <div className="space-y-2">
                            {recentSearches.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(search)}
                                    className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                    <span className="material-symbols-outlined text-gray-400">
                                        history
                                    </span>
                                    <span className="flex-1">{search}</span>
                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">
                                        north_west
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular Searches */}
                {!searchQuery && (
                    <div className="p-4 pt-2">
                        <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                            Carian Popular (Popular)
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {popularSearches.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(search)}
                                    className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Regions/Categories Quick Access */}
                {!searchQuery && (
                    <div className="p-4 pt-2">
                        <h2 className="text-lg font-bold mb-3 text-charcoal dark:text-white">
                            Kategori (Categories)
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { name: "Barang Dapur (Groceries)", icon: "shopping_basket", slug: "groceries" },
                                { name: "Kesihatan (Health)", icon: "medication", slug: "health" },
                                { name: "Rumah (Home)", icon: "home", slug: "home" },
                                { name: "Ubat-ubatan (Medicine)", icon: "pill", slug: "medicine" },
                            ].map((category, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => router.push(`/products/${category.slug}`)}
                                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-2xl">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold flex-1 text-left">
                                        {category.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <BottomNav />
        </>
    );
}
