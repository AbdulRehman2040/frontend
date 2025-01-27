"use client";
import React, { useState } from "react";
import axios from "axios";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  // Function to send the OTP
  const handleSendCode = async () => {
    try {
      await axios.post("http://localhost:5000/send-otp", { email });
      setIsCodeSent(true);
      alert("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Function to verify the OTP
  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp: verificationCode,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-col gap-4">
        {/* Work Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            disabled={isCodeSent}
          />
        </div>

        {/* Verification Code Input */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              disabled={!isCodeSent}
            />
          </div>

          {/* Button to Get Code */}
          <button
            onClick={handleSendCode}
            className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
            disabled={!email || isCodeSent}
          >
            {isCodeSent ? "Code Sent" : "Get Code"}
          </button>
        </div>
      </div>

      {/* Verify Code Button */}
      <div className="mt-4">
        <button
          onClick={handleVerifyCode}
          className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          disabled={!isCodeSent || !verificationCode}
        >
          Verify Code
        </button>
      </div>
    </div>
  );
}
