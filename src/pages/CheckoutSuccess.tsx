import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <main className="container my-5" style={{ maxWidth: 640 }}>
      <div className="card p-4 shadow-sm text-center">
        <h1 className="mb-3">✅ Payment successful</h1>
        <p className="text-muted mb-4">
          Thank you for your purchase. Your payment has been processed.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-primary">
            Continue shopping
          </Link>
          <Link to="/profile" className="btn btn-outline-secondary">
            View profile
          </Link>
        </div>
      </div>
    </main>
  );
}
