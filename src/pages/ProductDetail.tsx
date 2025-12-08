import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Product } from "../utils/Products";
import { fetchProduct } from "../utils/Products";
import { useAuth } from "../utils/AuthContext";
import { addToCart } from "../utils/Cart";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetchProduct(Number(id))
      .then(setProduct)
      .catch((err) => {
        console.log(err);
        setError("Failed to load product.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!product) return;
    setAdding(true);
    addToCart(token, product.id)
      .then(() => navigate("/cart"))
      .catch((e) => {
        console.log(e);
        setError("Failed to add to cart");
      })
      .finally(() => setAdding(false));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error || !product)
    return (
      <p className="text-center text-danger mt-5">{error ?? "Not found"}</p>
    );

  return (
    <main className="container my-4">
      <Link to="/" className="btn btn-link mb-3">
        &larr; Back to products
      </Link>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="fs-4 fw-bold text-success">${product.price}</p>
          <p>{product.description}</p>

          <button
            className="btn btn-primary mt-3"
            onClick={handleAddToCart}
            disabled={adding}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </main>
  );
}
