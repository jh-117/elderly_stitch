import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatCurrency(amount: number): string {
    return `RM ${amount.toFixed(2)}`;
}

export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ms-MY', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

export function formatDateMalay(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];

    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}
