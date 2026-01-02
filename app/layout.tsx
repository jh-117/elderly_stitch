import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-lexend",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

export const metadata: Metadata = {
    title: "SuaraShop - Mudah & Mesra",
    description: "Your friendly Malaysian shopping assistant for elderly",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
};

import ThemeProvider from "@/components/providers/ThemeProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body
                className={`${lexend.variable} ${manrope.variable} font-display bg-background-light dark:bg-background-dark text-charcoal dark:text-white antialiased`}
            >
                <ThemeProvider>
                    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
