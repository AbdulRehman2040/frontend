"use client";

import { useState } from "react";
import Image from "next/image";
import AdminDashboard from "./adminpanelwrrpaer";
import logo from "../../public/Logo-PNG.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state

  const handleLogin = async () => {
    setLoading(true);  // Set loading to true when login starts
    try {
      const response = await fetch("https://requsest-response.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setError("");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);  // Set loading to false once login completes
    }
  };

  const handleForgotPassword = async () => {
    console.log("Forgot password clicked");
    try {
      const response = await fetch("https://requsest-response.vercel.app/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Password reset email sent:", data.message);
        alert(data.message);
      } else {
        console.error("Failed to send reset email:", data.message);
        setError(data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-4">
      {!isAuthenticated ? (
        <motion.div
          className="w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden bg-white"
          initial="hidden"
          animate="visible"
        >
          {/* Left Side: Welcome Section */}
          <motion.div
            className="md:w-1/2 bg-gradient-to-r from-[#dbbf86] to-[#c7a96a] text-white flex flex-col justify-center items-center p-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome Admin</h1>
            <p className="text-xl text-gray-100">
              Access the panel by entering your credentials.
            </p>
          </motion.div>

          {/* Right Side: Login Form */}
          <motion.div
            className="md:w-1/2 p-12 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-8">
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={120}
                className=""
              />
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Admin Login
            </h2>

            {error && (
              <motion.p
                className="text-red-500 text-sm mb-4 text-center"
                initial="hidden"
                animate="visible"
              >
                {error}
              </motion.p>
            )}

            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Admin Email"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 transition-all duration-200"
              />
            </div>

            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 pr-14 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500 text-2xl hover:text-gray-700 transition-all duration-200" />
                ) : (
                  <AiOutlineEye className="text-gray-500 text-2xl hover:text-gray-700 transition-all duration-200" />
                )}
              </button>
            </div>

            <motion.button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white px-5 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-300 text-lg font-semibold mb-4"
              whileHover="hover"
              whileTap="tap"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span>Loading...</span> // Show loading text
              ) : (
                "Login"
              )}
            </motion.button>

            <button
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800 text-sm text-center"
            >
              Forgot Password?
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminPanel;
