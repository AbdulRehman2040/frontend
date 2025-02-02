"use client";
import { useState } from "react";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from local storage
            if (!token) {
                setError("User not authenticated");
                return;
            }

            const response = await fetch("https://requsest-response.vercel.app/api/change-password", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Pass token in Authorization header
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Server error. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
            />
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
                Change Password
            </button>
        </div>
    );
};

export default ChangePassword;
