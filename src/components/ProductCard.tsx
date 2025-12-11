import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteProduct, type Product } from "../apis/Products";

type Props = {
  product: Product;
  enableEdit?: boolean;
  onRemoved?: () => void;
  enableClick?: boolean;
};

export default function ProductCard({
  product,
  enableEdit = false,
  onRemoved = () => {},
  enableClick = true,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleRemove = async () => {
    const ok = window.confirm("Remove this product?");
    if (!ok) return;

    try {
      await deleteProduct(product.id);
    } catch (e) {
      console.error(e);
      setError("Failed to remove product.");
    } finally {
      onRemoved();
    }
  };
  if (error) {
    return <p>{error}</p>;
  }
  /*
  const handleEdit = () => {
    navigate(`/product/${product.id}/edit`);
  };
  */
  return (
    <div className="card h-100">
      {enableClick ? (
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{ height: 200, objectFit: "cover" }}
          />
        </Link>
      ) : (
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: 200, objectFit: "cover" }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="fw-bold mb-2">${product.price}</p>
        <p className="card-text small flex-grow-1">{product.description}</p>

        {/* Action buttons for admin mode */}
        {enableEdit ? (
          <div className="d-flex gap-2 mt-3">
            {/*
            <button
              className="btn btn-sm btn-outline-primary flex-fill"
              onClick={handleEdit}
            >
              Edit
            </button>
            */}
            <button
              className="btn btn-sm btn-outline-danger flex-fill"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
