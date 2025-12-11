import { useEffect, useState } from "react";
import type { Product } from "../apis/Products";
import { fetchProducts } from "../apis/Products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => {
        console.log(e);
        setError("No products available");
      })
      .finally();
  }, []);

  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <main className="container my-4">
      <h1 className="mb-4 text-center"> Products </h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {products.map((p) => (
          <ProductCard product={p}></ProductCard>
        ))}
      </div>
    </main>
  );
}
