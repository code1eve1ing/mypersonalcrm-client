import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 rounded-xl overflow-hidden">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Log in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  {...register("email")}
                  className={`${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  {...register("password")}
                  className={`${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="h-5 w-5" />
                <span>Sign in with Google</span>
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By logging in, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-gray-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
