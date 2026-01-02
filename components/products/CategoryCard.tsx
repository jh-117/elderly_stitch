"use client";

import Link from "next/link";
import { Category } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const { language } = useTranslation();

    return (
        <Link
            href={`/products/${category.slug}`}
            className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-3xl active:scale-95 transition-all border-2 border-transparent hover:border-primary/20 shadow-sm text-left group"
        >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-700 flex items-center justify-center shadow-inner mb-1">
                <div
                    className="w-full h-full bg-center bg-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url("${category.image}")` }}
                />
            </div>
            <div className="px-1">
                <p className="text-charcoal dark:text-white text-xl font-black leading-tight">
                    {language === 'malay' ? category.nameMalay : category.name}
                </p>
                <div className="h-1 w-8 bg-primary/30 rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
        </Link>
    );
}
