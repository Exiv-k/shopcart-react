import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http.ts";
import { type User } from "../utils/useUser.ts";

export default function Profile() {
  const { logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const res = await http.get("/api/profile");
    return res.data;
  };

  useEffect(() => {
    fetchProfile()
      .then(setUser)
      .catch((e) => {
        console.log(e);
        setError("Something went wrong. Check log.");
      })
      .finally();
  }, [logout]);

  const handleManageProducts = () => {
    navigate("/manage-products");
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      {!user ? (
        <div>Redirecting to login</div>
      ) : (
        <main className="container my-4" style={{ maxWidth: "600px" }}>
          <h1 className="mb-4">Profile</h1>

          <div className="card p-4 shadow-sm">
            <div className="mb-3">
              <strong>Username:</strong> {user.username}
            </div>

            <div className="mb-3">
              <strong>Role:</strong> {user.role}
            </div>

            <div className="mb-4">
              <strong>Last login:</strong>{" "}
              {user.last_login
                ? new Date(user.last_login).toLocaleString()
                : "N/A"}
            </div>

            {user.role === "ADMIN" && (
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={handleManageProducts}
              >
                Manage products
              </button>
            )}

            <button className="btn btn-outline-danger w-100" onClick={logout}>
              Log out
            </button>
          </div>
        </main>
      )}
    </>
  );
}
