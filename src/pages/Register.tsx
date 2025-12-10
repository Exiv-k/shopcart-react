import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../apis/RegisterApi";

export default function Register() {
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const regex = /^[A-Za-z0-9_]+$/; //number/letter/underscore

  if (isAuthenticated) {
    return <p>You haven't logged out yet!</p>;
  }

  const userValid = regex.test(username);
  const passValid = regex.test(password);
  const passLong = password.length >= 6; // password at least 6 chars

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register(username, password)
      .then(() => {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((e) => {
        setError(e.message);
        console.log(e);
      });
  };

  return success ? (
    <div className="text-center text-success mt-3">
      Registration successful! Taking you to login page in 3 seconds...
    </div>
  ) : (
    <main className="container my-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* username field */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className={`form-control ${!userValid ? "is-invalid" : ""}`}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            required
          />
          {!userValid && (
            <div className="text-danger small mt-1">
              Username must contain only letters, numbers, and underscores.
            </div>
          )}
        </div>

        {/* password field */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${
              !passValid || !passLong ? "is-invalid" : ""
            }`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            required
          />
          {!passValid && (
            <div className="text-danger small mt-1">
              Password must contain only letters, numbers, and underscores.
            </div>
          )}
          {!passLong && (
            <div className="text-danger small mt-1">
              Password has to be at least 6 character long.
            </div>
          )}
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={!userValid || !passValid || !passLong || success}
        >
          Register
        </button>
      </form>
    </main>
  );
}
