// src/components/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  // Giriş yapılmamışsa login'e gönder
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin sayfası ama kullanıcı admin değilse ana sayfaya gönder
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
