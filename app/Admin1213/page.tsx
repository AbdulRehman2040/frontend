"use client";

import { useState } from "react";
import Image from "next/image";
import AdminDashboard from "./adminpanelwrrpaer";
import logo from "../../public/Logo-PNG.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const leftSideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const rightSideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-4">
      {!isAuthenticated ? (
        <motion.div
          className="w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden bg-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Side: Welcome Section */}
          <motion.div
            className="md:w-1/2 bg-gradient-to-r from-[#dbbf86] to-[#c7a96a] text-white flex flex-col justify-center items-center p-12 text-center"
            variants={leftSideVariants}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome Admin
            </h1>
            <p className="text-xl text-gray-100">
              Access the panel by entering your credentials.
            </p>
          </motion.div>

          {/* Right Side: Login Form */}
          <motion.div
            className="md:w-1/2 p-12 flex flex-col justify-center"
            variants={rightSideVariants}
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
                variants={errorVariants}
                initial="hidden"
                animate="visible"
              >
                {error}
              </motion.p>
            )}

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
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-600 text-white px-5 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-300 text-lg font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Login
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminPanel;