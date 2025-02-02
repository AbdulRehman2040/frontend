"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const { token } = useParams(); // Correct way to get dynamic route parameters
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }
  
    try {
      console.log("Sending request to:", `https://requsest-response.vercel.app/api/reset-password/${token}`);
      console.log("Request body:", { password });
  
      const response = await fetch(`https://requsest-response.vercel.app/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
  
      const data = await response.json();
      console.log("Response received:", data);
  
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          router.push("/Admin1213");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4 text-center">{message}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
