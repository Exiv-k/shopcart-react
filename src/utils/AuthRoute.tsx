import { useUser } from "./useUser";
import { Navigate, useLocation } from "react-router-dom";
import { type JSX } from "react";

export default function AuthRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
