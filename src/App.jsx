// 4. Route protection using React Router DOM
// /client/src/App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/common/Layout";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const Order = lazy(() => import("./pages/Order"));
const Inventory = lazy(() => import("./pages/Inventory"));
const GoogleCallback = lazy(() => import("./components/oauth/GoogleCallback"));
const AuthRedirect = lazy(() => import("./components/oauth/AuthRedirect"));

export default function App() {
  const Fallback = (
    <span className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      loading ui...
    </span>
  );
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense key="login" fallback={Fallback}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense key="signup" fallback={Fallback}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/auth/google/callback"
              element={
                <Suspense key="google-callback" fallback={Fallback}>
                  <GoogleCallback />
                </Suspense>
              }
            />
            <Route
              path="/auth/redirect"
              element={
                <Suspense key="auth-redirect" fallback={Fallback}>
                  <AuthRedirect />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Suspense key="home" fallback={Fallback}>
                    <Home />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Suspense key="orders" fallback={Fallback}>
                    <Order />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <PrivateRoute>
                  <Suspense key="inventory" fallback={Fallback}>
                    <Inventory />
                  </Suspense>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
