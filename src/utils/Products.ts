const API_BASE = import.meta.env.VITE_API_BASE;
export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

export async function fetchProducts() : Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) {
        throw new Error(`Failed to load products (${res.status})`);
    }
    return res.json();
}

export async function fetchProduct(id: number): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/product/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to load product (${res.status})`);
    }
    return res.json();
}