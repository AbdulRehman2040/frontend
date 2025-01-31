"use client";

import { useState } from "react";
import Image from "next/image";
import AdminDashboard from "./adminpanelwrrpaer";
import logo from "../../public/Logo-PNG.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminPanel = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = () => {
    const adminPassword = "admin123"; // Replace with env variable in production
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!isAuthenticated ? (
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
          {/* Left Side: Welcome Section */}
          <div className="md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome Admin
            </h1>
            <p className="text-lg">Access the panel by entering your credentials.</p>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="flex justify-center mb-6">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Admin Login
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500 text-xl hover:text-gray-700" />
                ) : (
                  <AiOutlineEye className="text-gray-500 text-xl hover:text-gray-700" />
                )}
              </button>
            </div>

            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminPanel;
