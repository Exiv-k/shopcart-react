import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  if (token) {
    navigate("/profile", { replace: true });
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        login(data.token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert("Login failure");
    }
  };

  return (
    <div>
      <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4"> Login </h3>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account?</span>{" "}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
