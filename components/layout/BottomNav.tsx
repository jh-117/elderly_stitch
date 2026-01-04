"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const totalItems = useCartStore((state) => state.getTotalItems());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky bottom-0 z-20 w-full bg-white dark:bg-[#101922] border-t border-gray-100 dark:border-gray-800 px-2 py-2 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center">
                <Link
                    href="/home"
                    className={`flex flex-col items-center justify-center w-20 py-2 gap-1.5 transition-all ${isActive("/home")
                        ? "text-primary scale-110"
                        : "text-gray-400 dark:text-gray-600 hover:text-primary"
                        }`}
                >
                    <span
                        className={`material-symbols-outlined text-[32px] ${isActive("/home") ? "font-black fill-1" : "font-light"
                            }`}
                    >
                        home
                    </span>
                    <span className={`text-[11px] uppercase tracking-widest ${isActive("/home") ? "font-black" : "font-bold"}`}>
                        {t.common.home}
                    </span>
                </Link>

                <Link
                    href="/cart"
                    className={`flex flex-col items-center justify-center w-20 py-2 gap-1.5 relative transition-all ${isActive("/cart")
                        ? "text-primary scale-110"
                        : "text-gray-400 dark:text-gray-600 hover:text-primary"
                        }`}
                >
                    <span className={`material-symbols-outlined text-[32px] ${isActive("/cart") ? "font-black fill-1" : "font-light"}`}>
                        shopping_cart
                    </span>
                    {isMounted && totalItems > 0 && (
                        <span className="absolute top-1 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white shadow-lg shadow-red-500/40 animate-bounce">
                            {totalItems}
                        </span>
                    )}
                    <span className={`text-[11px] uppercase tracking-widest ${isActive("/cart") ? "font-black" : "font-bold"}`}>
                        {t.common.cart}
                    </span>
                </Link>

                <Link
                    href="/orders"
                    className={`flex flex-col items-center justify-center w-20 py-2 gap-1.5 transition-all ${isActive("/orders")
                        ? "text-primary scale-110"
                        : "text-gray-400 dark:text-gray-600 hover:text-primary"
                        }`}
                >
                    <span className={`material-symbols-outlined text-[32px] ${isActive("/orders") ? "font-black fill-1" : "font-light"}`}>
                        receipt_long
                    </span>
                    <span className={`text-[11px] uppercase tracking-widest ${isActive("/orders") ? "font-black" : "font-bold"}`}>
                        {t.common.orders}
                    </span>
                </Link>

                <Link
                    href="/profile"
                    className={`flex flex-col items-center justify-center w-20 py-2 gap-1.5 transition-all ${isActive("/profile")
                        ? "text-primary scale-110"
                        : "text-gray-400 dark:text-gray-600 hover:text-primary"
                        }`}
                >
                    <span className={`material-symbols-outlined text-[32px] ${isActive("/profile") ? "font-black fill-1" : "font-light"}`}>
                        person
                    </span>
                    <span className={`text-[11px] uppercase tracking-widest ${isActive("/profile") ? "font-black" : "font-bold"}`}>
                        {t.common.profile}
                    </span>
                </Link>
            </div>
        </nav>
    );
}
