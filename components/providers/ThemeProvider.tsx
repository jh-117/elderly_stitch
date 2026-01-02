"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { darkMode, textSize } = useSettingsStore();

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Apply text size classes to body
        const body = window.document.body;
        body.classList.remove("text-size-normal", "text-size-large", "text-size-huge");
        if (textSize === 0) body.classList.add("text-size-normal");
        else if (textSize === 1) body.classList.add("text-size-large");
        else if (textSize === 2) body.classList.add("text-size-huge");
    }, [darkMode, textSize]);

    return <>{children}</>;
}
