import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link
            href={`/products/${category.slug}`}
            className="flex flex-col gap-3 p-4 bg-card-lavender dark:bg-gray-800 rounded-2xl active:scale-95 transition-transform border border-purple-100 dark:border-gray-700 shadow-sm text-left"
        >
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center shadow-inner">
                <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url("${category.image}")` }}
                />
            </div>
            <div>
                <p className="text-charcoal dark:text-white text-lg font-bold leading-tight">
                    {category.nameMalay}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{category.name}</p>
            </div>
        </Link>
    );
}
