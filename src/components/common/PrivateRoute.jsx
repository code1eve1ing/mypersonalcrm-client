import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

function PrivateRoute({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await api.get("/users/me");
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    verifyToken();
  }, [token, setUser]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        loading... {/* Replace with your spinner */}
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
