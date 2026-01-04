"use client";

import { categories } from "@/data/categories";
import { getRecommendedProducts } from "@/data/products";
import CategoryCard from "@/components/products/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import BottomNav from "@/components/layout/BottomNav";
import FloatingAIButton from "@/components/ui/FloatingAIButton";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VoiceModal from "@/components/ui/VoiceModal";
import TextSizeModal from "@/components/ui/TextSizeModal";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDateMalay, formatDateEnglish } from "@/lib/utils";

export default function HomePage() {
    const router = useRouter();
    const { t, language } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const userName = user?.name || (language === 'malay' ? "Pengguna" : "User");
    const today = language === 'malay' ? formatDateMalay(new Date()) : formatDateEnglish(new Date());
    const recommendedProducts = getRecommendedProducts();
    const [isVoiceOpen, setIsVoiceOpen] = useState(false);
    const [isTextSizeOpen, setIsTextSizeOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-[#101922] flex flex-col">
            <VoiceModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
            <TextSizeModal isOpen={isTextSizeOpen} onClose={() => setIsTextSizeOpen(false)} />

            {/* Header */}
            <header className="flex items-center p-6 pb-4 justify-between bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest opacity-70">
                        {today}
                    </span>
                    <h2 className="text-charcoal dark:text-white text-3xl font-black leading-tight tracking-tight">
                        {t.home.greeting},
                        <br />
                        <span className="text-primary">{userName}</span>
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsTextSizeOpen(true)}
                        className="flex items-center justify-center rounded-2xl h-14 w-14 bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white hover:bg-primary/10 hover:text-primary transition-all shadow-sm active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">text_increase</span>
                    </button>
                    <button
                        onClick={() => router.push("/notifications")}
                        className="flex items-center justify-center rounded-2xl h-14 w-14 bg-gray-50 dark:bg-gray-800 text-charcoal dark:text-white hover:bg-primary/10 hover:text-primary transition-all shadow-sm active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[32px] font-bold">notifications</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-24">
                {/* Search Bar */}
                <div className="px-6 py-4">
                    <button
                        onClick={() => router.push("/search")}
                        className="flex w-full h-18 items-center rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-primary/30 transition-all pr-3 shadow-inner group"
                    >
                        <div className="text-gray-400 group-hover:text-primary flex items-center justify-center pl-5 pr-3 transition-colors">
                            <span className="material-symbols-outlined text-3xl font-bold">search</span>
                        </div>
                        <span className="flex-1 text-left text-gray-500 dark:text-gray-400 text-xl font-bold">
                            {t.home.search_placeholder}
                        </span>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsVoiceOpen(true);
                            }}
                            className="flex items-center justify-center h-12 w-12 rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 hover:bg-purple-800 transition-all active:scale-90 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-2xl font-black">mic</span>
                        </div>
                    </button>
                </div>

                {/* Categories Section */}
                <section className="pt-4">
                    <div className="flex justify-between items-end px-6 mb-5">
                        <h2 className="text-charcoal dark:text-white text-2xl font-black leading-none">
                            {t.home.categories}
                        </h2>
                        <button
                            onClick={() => router.push("/search")}
                            className="text-primary text-sm font-black uppercase tracking-widest hover:underline px-2 py-1 rounded-lg hover:bg-primary/5 transition-all"
                        >
                            {t.common.view_all}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-5 px-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>

                {/* Recommended Products Section */}
                <section className="mt-10">
                    <div className="flex justify-between items-end px-6 mb-5">
                        <h2 className="text-charcoal dark:text-white text-2xl font-black leading-none">
                            {t.home.recommended}
                        </h2>
                        <button
                            onClick={() => router.push("/products/groceries")}
                            className="text-primary text-sm font-black uppercase tracking-widest hover:underline px-2 py-1 rounded-lg hover:bg-primary/5 transition-all"
                        >
                            {t.common.view_all}
                        </button>
                    </div>
                    <div className="flex flex-col gap-5 px-6 pb-8">
                        {recommendedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>


            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
