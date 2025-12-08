
export type CartItem = {
    product_id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchCart(token: string) : Promise<CartItem[]> {
    const res = await fetch(`${API_BASE}/api/cart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if(!res.ok) {
        throw new Error(`Failed to load cart (${res.status})`);
    }

    return res.json();
}

export async function addToCart(token: string, product_id: number) : Promise<void> {
    const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( {product_id} )
    });
    if (!res.ok) {
        throw new Error(`Failed to add to cart (${res.status})`);
    }
}

export async function removeFromCart(token: string, product_id: number) : Promise<void> {
    const res = await fetch(`${API_BASE}/api/cart/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({product_id})
    })
    if (!res.ok) {
        throw new Error(`Failed to remove item (${res.status})`);
    }
}