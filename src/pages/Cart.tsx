import { useAuth } from "../utils/AuthContext";
import http from "../utils/http";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCart, type CartItem, removeFromCart } from "../apis/Cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
    fetchCart()
      .then(setItems)
      .catch((e) => {
        console.log(e);
        setError("Failed to load cart");
      })
      .finally(() => setLoading(false));
  }, [token, refresh, navigate]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }, [items]);

  if (loading) return <p className="text-center mt-5">Loading cart...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
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
    removeFromCart(pid)
      .then()
      .catch((e) => {
        console.log(e);
        setError("Failed to remove");
      })
      .finally(() => {
        setRemoving(0);
        setRefresh(!refresh);
      });
  };

  const handleCheckout = async () => {
    try {
      setError(null);
      const res = await http.post("/api/checkout");
      window.location.href = res.data.sessionUrl;
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.error || "Failed to checkout.");
    }
  };

  return (
    <main className="container-xl my-4">
      <Link to="/" className="btn btn-link mb-3">
        ← Back to products
      </Link>
      <h1 className="mb-4">Your Cart</h1>
      {items.map((item) => {
        const total = item.price * item.quantity;
        const isRemoving = removing === item.product_id;
        return (
          <div
            key={item.product_id}
            className="card mb-3 p-3 position-relative"
          >
            <h5 className="fw-bold mb-3">{item.name}</h5>

            <div className="d-flex justify-content-center mb-3">
              <img
                src={item.image}
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

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                {item.quantity} × ${item.price}
              </div>

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

      <div className="card p-3">
        <div className="d-flex justify-content-between">
          <div className="text-muted">Subtotal</div>
          <div className="fw-bold">${subtotal.toFixed(2)}</div>
        </div>

        <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>
          Proceed to checkout
        </button>
      </div>
    </main>
  );
}
