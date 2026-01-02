"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { translations } from "@/lib/translations";

export const useTranslation = () => {
    const language = useSettingsStore((state) => state.language);

    const t = translations[language];

    return { t, language };
};
