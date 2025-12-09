// src/pages/ManageProducts.tsx
import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "../utils/Products";
import { useUser } from "../utils/useUser";
import ProductCard from "../components/ProductCard";

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAdmin } = useUser();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => {
        console.error(e);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <p className="text-center mt-5">Loading…</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  console.log(user);
  return (
    <main className="container my-4">
      <h1 className="mb-4">Manage products</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            enableEdit={isAdmin}
            onRemoved={() => {
              setRefresh(1);
            }}
            enableClick={!isAdmin}
          />
        ))}
      </div>
    </main>
  );
}
