import { Product } from "@/types";

export const products: Product[] = [
    // Groceries
    {
        id: "rice-10kg",
        name: "Fragrant Rice 10kg",
        nameMalay: "Beras Wangi 10kg",
        description: "Premium quality fragrant rice",
        descriptionMalay: "Beras wangi berkualiti tinggi",
        price: 38.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACweRPWRMrvqmY4mzG9BeriF0FEyNTT6o_LOccgc9FOVl6nxEQ4Rz98gaRjeNRn58QQteAUOTwgTA1oEROsnio11VtPLOO9Wsl8pvDlcuxO3B4gac4TBWhCMqX6dzhW3D-tWkHAtXob9kdRYO0a8cd-snXfA2ExdP0RufZ0P0_0MuDhFnG6w_wfhLbpJoiQlQayxvOJz24JCCFhAzU_fWkLvb2hIBV6pJ5gMm_8LeLkuxYgh0HDav0KPPWgMUa8maKEoabTM5qWw",
        category: "groceries",
        brand: "Cap Rambutan",
        rating: 4.7,
        reviews: 245,
        inStock: true
    },
    {
        id: "cooking-oil-5kg",
        name: "Saji Cooking Oil 5kg",
        nameMalay: "Minyak Masak Saji",
        description: "Pure cooking oil for healthy meals",
        descriptionMalay: "Minyak masak tulen untuk masakan sihat",
        price: 29.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoKNTJpMmGUaesQBX-fKlpnXwlifJ0KJxlrWZYoDL7Mp5RTZnFLaeC2UqS5DSo6FQFmRvKbqaax9MkIE5Z_4v523Wqyf3lyTpmFo1r5FA6aJg0ZY67M_wtYZlk3ZK8WnNe-jXQ6QywN4_tHTZeHHXcwIQqZ2J95Mz8ybTlqI6MU5XhL58-8h6ekJC9Qysx1OJXOzEq6FFvZRih0MonNdMbVBjo0tsD4nvJumvoCdqlUyHDbjUD4ZJNRo8qQAqMOluWCGnXl3uDkA",
        category: "groceries",
        brand: "Saji",
        rating: 4.5,
        reviews: 180,
        inStock: true
    },
    // Health & Medicine
    {
        id: "vitamin-c-1000",
        name: "Vitamin C 1000mg",
        nameMalay: "Vitamin C 1000mg",
        description: "Blackmores - 60 tablets for immunity",
        descriptionMalay: "Blackmores - 60 Biji untuk imuniti",
        price: 45.90,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlpeZHJ3e_S18EaF5JzVSHEcMf97tUG3g2lMd3ic77pLTWxV5h6ov4lOmTeBOLwkAAe0EqTSHU9X4t8tGKeX0QPnVb74dAx1i9_Z05SrLw4kXf4-jdUSYIkWi-nbGBMqYml4g38wZwNqaWlk1yUd0g-8V1kpeMHn9oLp_q6_6qmiM52mXcrWt8vUdu-AjFX54wEqyIZaaLQVF6hlmyGckeMHxLYkmFrHhVQ2h7kMi4amfAPnsUYjsvQ7-ckIHfrLhS8ezJ3lRhAw",
        category: "health",
        brand: "Blackmores",
        rating: 4.8,
        reviews: 320,
        inStock: true
    },
    {
        id: "omega-3-fish-oil",
        name: "Omega-3 Fish Oil",
        nameMalay: "Minyak Ikan Omega-3",
        description: "Supports heart health and brain function. Easy to swallow softgels.",
        descriptionMalay: "Menyokong kesihatan jantung dan fungsi otak. Kapsul lembut mudah ditelan.",
        price: 45.00,
        originalPrice: 60.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdiAIx1odU5pN-599_bnVi2RN-cLgo4e23YF-ska8Q3D_hwhXo6yk_uWsadonQJXVHYS1AdriJwGEJ6Uiw1bAyPg5Sn3yGWQDe-iA_y9wnx7MKwE5nD2G_EQS34Ib4o7_NJUsk_WeV_yyb5El3MA0E33-tN3QoH-oAMEAiOaZCTsJCXOB3R7vOA-0rL6COmPk1DB2x7rwHNWgYVeFb2N6d3tWa6I4DniLnII72774hQQT71Mj1afKdBuNilm6ndqOnlZBEOaegnA",
        category: "medicine",
        brand: "Nature's Plus",
        rating: 4.8,
        reviews: 120,
        inStock: true
    },
    {
        id: "calcium-tablets",
        name: "Calcium Tablets",
        nameMalay: "Tablet Kalsium",
        description: "Strong bones and teeth. With Vitamin D3 for absorption.",
        descriptionMalay: "Tulang dan gigi kuat. Dengan Vitamin D3 untuk penyerapan.",
        price: 32.50,
        originalPrice: 38.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhsjq4-qchyzvuEaE7_WhxOPuhc7BjsM_fmTTDoBHPf5A0T1A1T1haedl4xRjWlfF3l6-fg0j3yyWeiR4OcCL3gCy9_0S-UmaKX3g3oOhsWd6oNvdk2FyusPficXKxHM3xMDQ-JzbNWH22wf8Zy9k6eoZDS37ebZeO0vTz0_CnHz0ar9ZTRSDzkLeMH24uONhh4H_mXI8_-JzZ1yri3eYnvX91Qbxbtot5DpJNBiarwqm6-MZGtk2FoF-8liACKeCVWyw9Tv0gWw",
        category: "medicine",
        brand: "Caltrate",
        rating: 4.5,
        reviews: 85,
        inStock: true
    },
    {
        id: "multivitamin-daily",
        name: "Daily Multivitamin",
        nameMalay: "Multivitamin Harian",
        description: "Complete daily nutrition for seniors 50+. Includes Zinc and Iron.",
        descriptionMalay: "Pemakanan harian lengkap untuk warga emas 50+. Termasuk Zink dan Besi.",
        price: 48.00,
        originalPrice: 55.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsCf3h2P9xW6nIyl1Cov8j8FgBYaOx9suB4zKxZyqMNcAXWP1FWtMzaqTnNVNuTKh1wW10XsdqWDuqIj7xojp4UvkVtVkmwAyB_0xjHyb_9OmpE93iaRM15RESjT1sUKvw1ZTr5cq_sRPmdflRao2TQ4xO283FpAJTIhF0OGx_Ck2QIucZZ59CMTY81MI2iOU623mua7PL_6PeGEYJgHXt_SoG3iXIWmzpS5lj_SI_OzRmXXd3ODg1-P8BU-ElkQ2Yc8w0KDca9g",
        category: "medicine",
        brand: "Centrum",
        rating: 4.9,
        reviews: 230,
        inStock: true
    },
    // More products can be added here
];

export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category);
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getRecommendedProducts(): Product[] {
    return products.slice(0, 3);
}
