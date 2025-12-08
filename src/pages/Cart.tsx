import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { fetchCart, type CartItem, removeFromCart } from "../utils/Cart";

export default function Cart() {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(0);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!token) return;
    fetchCart(token)
      .then(setItems)
      .catch((e) => {
        console.log(e);
        setError("Failed to load cart");
      })
      .finally(() => setLoading(false));
  }, [token, refresh]);

  if (loading) return <p className="text-center mt-5">Loading cart...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  console.log(items);
  if (items.length === 0) {
    return (
      <main className="container my-4">
        <h1 className="mb-4">Your Cart</h1>
        <p>No items in your cart.</p>
      </main>
    );
  }

  const handleRemoval = (pid: number) => {
    if (!token) return;
    setRemoving(pid);
    removeFromCart(token, pid)
      .then()
      .catch((e) => {
        console.log(e);
        setError("Failed to remove");
      })
      .finally(() => {
        setRemoving(0);
        setRefresh(1);
      });
  };

  return (
    <main className="container-xl my-4">
      <h1 className="mb-4">Your Cart</h1>
      {items.map((item) => {
        const total = item.price * item.quantity;
        const isRemoving = removing === item.product_id;

        return (
          <div
            key={item.product_id}
            className="card mb-3 p-3 position-relative"
          >
            {/* Title */}
            <h5 className="fw-bold mb-3">{item.name}</h5>

            {/* Image center */}
            <div className="d-flex justify-content-center mb-3">
              <img
                src={item.image} // MUST be returned from backend
                alt={item.name}
                className="rounded"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "1px solid #eee",
                }}
              />
            </div>

            {/* Bottom row: qty × price */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                {item.quantity} × ${item.price}
              </div>

              {/* Right side: total + remove */}
              <div className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5 text-success">${total}</span>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemoval(item.product_id)}
                  disabled={isRemoving}
                >
                  {isRemoving ? "..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
