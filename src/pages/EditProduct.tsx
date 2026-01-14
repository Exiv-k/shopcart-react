import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProduct, updateProduct, type Product } from "../apis/Products";
import { useUser } from "../utils/useUser";

type FormState = {
  name: string;
  image: string;
  price: string;
  description: string;
};

export default function EditProduct() {
  const { id } = useParams();
  const pid = useMemo(() => Number(id), [id]);
  const navigate = useNavigate();
  const { isAdmin } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate("/profile", { replace: true });
    }
  }, [isAdmin, navigate]);

  // Load product data
  useEffect(() => {
    if (!id || Number.isNaN(pid)) {
      setError("Invalid product ID.");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchProduct(pid)
      .then((p) => {
        setProduct(p);
        setForm({
          name: p.name ?? "",
          image: p.image ?? "",
          price: p.price.toString(),
          description: p.description ?? "",
        });
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load product.");
      })
      .finally(() => setLoading(false));
  }, [id, pid]);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setError(null);
    };

  const validate = () => {
    if (!form.name.trim()) return "Title is required.";
    if (!form.image.trim()) return "Image URL is required.";
    if (!form.description.trim()) return "Description is required.";

    const priceNum = Number(form.price);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      return "Price is invalid.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      setSaving(true);
      await updateProduct(pid, {
        name: form.name,
        image: form.image,
        price: Number(form.price),
        description: form.description,
      });
      navigate("/manage-products", { replace: true });
    } catch (e) {
      console.error(e);
      setError("Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error && !product)
    return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <main className="container my-4" style={{ maxWidth: 800 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/manage-products" className="btn btn-link">
          ← Back to manage products
        </Link>
        {/*product && (
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-secondary btn-sm"
          >
            View product
          </Link>
        )*/}
      </div>

      <h1 className="mb-4">Edit product</h1>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card p-3">
            <div className="text-muted small mb-2">Preview</div>
            <img
              src={form.image || product?.image}
              alt={form.name || product?.name}
              className="img-fluid rounded"
              style={{ height: 260, objectFit: "cover", width: "100%" }}
            />
            <div className="mt-3">
              <div className="fw-bold">{form.name || product?.name}</div>
              <div className="text-success fw-bold">
                ${form.price || product?.price}
              </div>
              <div className="text-muted small mt-2">
                {form.description || product?.description}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                className="form-control"
                value={form.name}
                onChange={onChange("name")}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                value={form.image}
                onChange={onChange("image")}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                className="form-control"
                value={form.price}
                onChange={onChange("price")}
                inputMode="decimal"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={5}
                value={form.description}
                onChange={onChange("description")}
                required
              />
            </div>

            {error && <div className="text-danger mb-3">{error}</div>}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={!product || saving}
                onClick={() => {
                  if (!product) return;
                  setForm({
                    name: product.name ?? "",
                    image: product.image ?? "",
                    price: String(product.price ?? ""),
                    description: product.description ?? "",
                  });
                  setError(null);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
