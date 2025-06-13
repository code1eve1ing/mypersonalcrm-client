import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import Sidebar from "./Sidebar";

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
        // TODO: user promise.all if more apis to get...
        // const items = await getAllItems();
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
      <span className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        getting details... {/* Replace with your spinner */}
      </span>
    );
  }

  return isAuthenticated ? (
    <>
      <Sidebar />
      <div className="absolute top-1 right-1 left-1 bottom-1 bg-white/80 backdrop-blur-3xl border border-white rounded-sm flex flex-col gap-4 safe-padding">
        {children}
      </div>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
