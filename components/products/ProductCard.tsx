"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: Product;
    variant?: "horizontal" | "grid";
}

export default function ProductCard({
    product,
    variant = "horizontal",
}: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    if (variant === "grid") {
        return (
            <Link
                href={`/products/detail/${product.id}`}
                className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700">
                    <div
                        className="w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: `url("${product.image}")` }}
                    />
                </div>
                <div>
                    <h3 className="text-charcoal dark:text-white text-base font-bold leading-tight line-clamp-2">
                        {product.nameMalay}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {product.brand}
                    </p>
                </div>
                <div className="flex items-end justify-between">
                    <span className="text-charcoal dark:text-white text-lg font-bold">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                        className="bg-primary hover:bg-purple-800 text-white rounded-lg p-2 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-purple-200 dark:shadow-none"
                    >
                        <span className="material-symbols-outlined font-bold">
                            add_shopping_cart
                        </span>
                    </button>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/products/detail/${product.id}`}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm gap-4 hover:shadow-md transition-shadow"
        >
            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url("${product.image}")` }}
                />
            </div>
            <div className="flex flex-col flex-1 h-full justify-between gap-2">
                <div>
                    <h3 className="text-charcoal dark:text-white text-lg font-bold leading-tight line-clamp-2">
                        {product.nameMalay}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {product.brand}
                    </p>
                </div>
                <div className="flex items-end justify-between mt-1">
                    <span className="text-charcoal dark:text-white text-xl font-bold">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                        className="bg-primary hover:bg-purple-800 text-white rounded-lg p-3 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-purple-200 dark:shadow-none"
                    >
                        <span className="material-symbols-outlined font-bold">
                            add_shopping_cart
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    );
}
