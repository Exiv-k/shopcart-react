import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../utils/Products";
import { fetchProducts } from "../utils/Products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => {
        console.log(e);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <main className="container my-4">
      <h1 className="mb-4 text-center"> Products </h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {products.map((p) => (
          <div key={p.id} className="col">
            <div className="card h-100">
              <Link to={`/product/${p.id}`}>
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: 220, objectFit: "cover" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text fw-bold mb-2">${p.price}</p>
                <p className="card-text small flex-grow-1">{p.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
