import http from './http'

export type CartItem = {
    product_id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

export async function fetchCart() : Promise<CartItem[]> {
    const res = await http.get('/api/cart');
    return res.data;
}

export async function addToCart(product_id: number) : Promise<void> {
    await http.post('/api/cart/add', { product_id });
}

export async function removeFromCart(product_id: number) : Promise<void> {
    await http.post('/api/cart/remove', {product_id});
}