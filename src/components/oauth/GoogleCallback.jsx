// src/pages/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        toast.success("Google login successful!");
        navigate("/");
      } catch (err) {
        toast.error("Failed to process Google login");
        navigate("/login");
      }
    } else {
      toast.error("Google login failed");
      navigate("/login");
    }
  }, [searchParams, setUser, setToken, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing Google Login...</h1>
        <p>Please wait while we authenticate your account.</p>
      </div>
    </div>
  );
}
