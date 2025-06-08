// src/pages/AuthRedirect.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

export default function AuthRedirect() {
  const [searchParams] = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        // You might want to verify the token with your backend here
        const userData = parseJwt(token); // Implement this helper function

        setUser(userData);
        setToken(token);
        console.log("token", token);
        localStorage.setItem("token", token);

        // Redirect to original path or home
        toast.success("Login successful!");
        navigate("/");
      } catch (err) {
        toast.error("Invalid login token");
        navigate("/login");
      }
    } else {
      toast.error("Login failed - no token received");
      navigate("/login");
    }
  }, [searchParams, setUser, setToken, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing Login...</h1>
        <p>Please wait while we authenticate your account.</p>
      </div>
    </div>
  );
}

// Helper function to parse JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}
