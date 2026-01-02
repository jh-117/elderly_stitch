export interface Product {
    id: string;
    name: string;
    nameMalay: string;
    description: string;
    descriptionMalay: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    inStock: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
}

export interface Address {
    id: string;
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postcode: string;
    isDefault: boolean;
}

export interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: CartItem[];
    total: number;
    shippingAddress: Address;
    paymentMethod: string;
    trackingNumber?: string;
}

export type Category = {
    id: string;
    name: string;
    nameMalay: string;
    image: string;
    slug: string;
};
