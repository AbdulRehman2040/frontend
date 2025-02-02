"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimerButton from "./timerbutton";

interface MatchButtonProps {
  handleSendEmails: () => Promise<void>; // Define the prop type
}


const MatchButton: React.FC<MatchButtonProps> = ({ handleSendEmails }) => {
  const [loading, setLoading] = useState(false);

  const handleMatchClick = async () => {
    try {
      setLoading(true);
      await handleSendEmails(); // Call the passed function
      toast.success("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-6 text-center">
        <h1 className="font-bold text-center">Send Instant Email</h1>
        <button
          onClick={handleMatchClick}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Send Match Emails"}
        </button>
        <ToastContainer />
        <TimerButton handleSendEmails={handleSendEmails} />
      </div>
    </div>
  );
};

export default MatchButton;