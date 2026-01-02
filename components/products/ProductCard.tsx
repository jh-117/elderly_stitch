"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";

interface ProductCardProps {
    product: Product;
    variant?: "horizontal" | "grid";
}

export default function ProductCard({
    product,
    variant = "horizontal",
}: ProductCardProps) {
    const { language } = useTranslation();
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    const productName = language === 'malay' ? product.nameMalay : product.name;

    if (variant === "grid") {
        return (
            <Link
                href={`/products/detail/${product.id}`}
                className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
                <div className="w-full aspect-square rounded-[20px] overflow-hidden bg-gray-50 dark:bg-gray-700">
                    <div
                        className="w-full h-full bg-center bg-cover group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url("${product.image}")` }}
                    />
                </div>
                <div>
                    <h3 className="text-charcoal dark:text-white text-lg font-black leading-tight line-clamp-2">
                        {productName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold mt-1 uppercase tracking-wider">
                        {product.brand}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-primary dark:text-white text-xl font-black">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-purple-800 text-white rounded-xl h-12 w-12 active:scale-90 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined font-black">add</span>
                    </button>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/products/detail/${product.id}`}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 shadow-sm gap-5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
        >
            <div className="w-28 h-28 shrink-0 rounded-[24px] overflow-hidden bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <div
                    className="w-full h-full bg-center bg-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url("${product.image}")` }}
                />
            </div>
            <div className="flex flex-col flex-1 h-full justify-center gap-2">
                <div>
                    <h3 className="text-charcoal dark:text-white text-xl font-black leading-tight line-clamp-2">
                        {productName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold mt-1 uppercase tracking-wider">
                        {product.brand}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-primary dark:text-white text-2xl font-black">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-purple-800 text-white rounded-[16px] h-12 w-12 active:scale-90 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined font-black text-2xl">add</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}
