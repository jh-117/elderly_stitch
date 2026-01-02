"use client";

import { useRouter } from "next/navigation";
import { getProductsByCategory } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/products/ProductCard";
import BottomNav from "@/components/layout/BottomNav";
import { useCartStore } from "@/store/cartStore";

export default function ProductListingPage({
    params,
}: {
    params: { category: string };
}) {
    const router = useRouter();
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());

    const category = categories.find((c) => c.slug === params.category);
    const products = getProductsByCategory(params.category);

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <>
            {/* Header */}
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
                        {category.nameMalay}
                    </h1>
                    <button
                        onClick={() => router.push("/cart")}
                        aria-label="Cart"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full relative active:bg-gray-100 dark:active:bg-gray-700"
                    >
                        <span
                            className="material-symbols-outlined text-charcoal dark:text-white"
                            style={{ fontSize: "28px" }}
                        >
                            shopping_cart
                        </span>
                        {totalItemsInCart > 0 && (
                            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {totalItemsInCart}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Search Bar */}
            <div className="px-4 py-3 bg-white dark:bg-[#1a2632]">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-[#f0f2f4] dark:bg-[#2a3844] overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="grid place-items-center h-full w-12 text-gray-500">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-base text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-500 font-display"
                        placeholder="Search products..."
                        type="text"
                    />
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar bg-white dark:bg-[#1a2632] border-b border-gray-100 dark:border-gray-800">
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white pl-3 pr-4 active:scale-95 transition-transform shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        sort
                    </span>
                    <span className="text-base font-medium leading-normal">Sort</span>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary-light dark:bg-primary/20 pl-3 pr-4 active:scale-95 transition-transform">
                    <span
                        className="material-symbols-outlined text-charcoal dark:text-gray-200"
                        style={{ fontSize: "20px" }}
                    >
                        filter_list
                    </span>
                    <span className="text-charcoal dark:text-gray-200 text-base font-medium leading-normal">
                        Filter
                    </span>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary-light dark:bg-primary/20 pl-3 pr-4 active:scale-95 transition-transform">
                    <span
                        className="material-symbols-outlined text-charcoal dark:text-gray-200"
                        style={{ fontSize: "20px" }}
                    >
                        thumb_up
                    </span>
                    <span className="text-charcoal dark:text-gray-200 text-base font-medium leading-normal">
                        Top Rated
                    </span>
                </button>
            </div>

            {/* Main Content */}
            <main className="flex flex-col gap-4 p-4 pb-24">
                <p className="text-[#617589] dark:text-gray-400 text-lg font-medium leading-normal px-1">
                    Showing {products.length} items for you
                </p>

                <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            onClick={() => router.push(`/products/detail/${product.id}`)}
                            className="flex flex-col rounded-xl shadow-sm bg-white dark:bg-[#1a2632] overflow-hidden border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col sm:flex-row h-full">
                                <div className="relative w-full sm:w-48 aspect-[4/3] sm:aspect-square bg-gray-100 dark:bg-gray-800 shrink-0">
                                    <div
                                        className="absolute inset-0 bg-center bg-contain bg-no-repeat m-4"
                                        style={{ backgroundImage: `url("${product.image}")` }}
                                    ></div>
                                    <button className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/40 rounded-full backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-300">
                                            favorite
                                        </span>
                                    </button>
                                </div>
                                <div className="flex flex-col flex-1 p-4 justify-between gap-3">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                            <span className="material-symbols-outlined text-xl fill-current">
                                                star
                                            </span>
                                            <span className="text-sm font-semibold text-[#617589] dark:text-gray-400">
                                                {product.rating} ({product.reviews} reviews)
                                            </span>
                                        </div>
                                        <h2 className="text-charcoal dark:text-white text-xl font-bold leading-tight">
                                            {product.name}
                                        </h2>
                                        <p className="text-[#617589] dark:text-gray-400 text-sm line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex flex-col">
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                                    RM {product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <span className="text-charcoal dark:text-white text-2xl font-bold">
                                                RM {product.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                useCartStore.getState().addItem(product);
                                            }}
                                            className="flex items-center justify-center h-12 px-6 bg-white dark:bg-[#2a3844] border-2 border-primary text-primary hover:bg-primary-light dark:hover:bg-gray-700 text-base font-bold rounded-lg shadow-sm active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined mr-2">
                                                add_shopping_cart
                                            </span>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <BottomNav />
        </>
    );
}
