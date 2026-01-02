"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function BottomNav() {
    const pathname = usePathname();
    const totalItems = useCartStore((state) => state.getTotalItems());

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky bottom-0 z-20 w-full bg-white dark:bg-[#101922] border-t border-gray-200 dark:border-gray-800 px-2 py-2 pb-6 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-around items-center">
                <Link
                    href="/home"
                    className={`flex flex-col items-center justify-center w-20 py-1 gap-1 ${isActive("/home")
                            ? "text-primary"
                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                >
                    <span
                        className={`material-symbols-outlined text-3xl ${isActive("/home") ? "font-bold" : ""
                            }`}
                    >
                        home
                    </span>
                    <span className={`text-xs ${isActive("/home") ? "font-bold" : "font-medium"}`}>
                        Utama
                    </span>
                </Link>

                <Link
                    href="/cart"
                    className={`flex flex-col items-center justify-center w-20 py-1 gap-1 relative ${isActive("/cart")
                            ? "text-primary"
                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                >
                    <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {totalItems}
                        </span>
                    )}
                    <span className="text-xs font-medium">Troli</span>
                </Link>

                <Link
                    href="/orders"
                    className={`flex flex-col items-center justify-center w-20 py-1 gap-1 ${isActive("/orders")
                            ? "text-primary"
                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                >
                    <span className="material-symbols-outlined text-3xl">receipt_long</span>
                    <span className="text-xs font-medium">Pesanan</span>
                </Link>

                <Link
                    href="/profile"
                    className={`flex flex-col items-center justify-center w-20 py-1 gap-1 ${isActive("/profile")
                            ? "text-primary"
                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                >
                    <span className="material-symbols-outlined text-3xl">person</span>
                    <span className="text-xs font-medium">Saya</span>
                </Link>
            </div>
        </nav>
    );
}
