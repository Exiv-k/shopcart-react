import { Link } from "react-router-dom";

export default function CheckoutCancel() {
  return (
    <main className="container my-5" style={{ maxWidth: 640 }}>
      <div className="card p-4 shadow-sm text-center">
        <h1 className="mb-3">❌ Payment cancelled</h1>

        <p className="text-muted mb-4">
          Your payment was cancelled. No charges were made.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Link to="/cart" className="btn btn-primary">
            Return to cart
          </Link>

          <Link to="/" className="btn btn-outline-secondary">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
