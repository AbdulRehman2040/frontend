"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MatchButtontime from "./timerbutton";

const MatchButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleMatchClick = async () => {
    try {
      setLoading(true);

      // Call the match API endpoint
      const response = await axios.get("https://requsest-response.vercel.app/api/match/matches");

      // Show success notification if emails are sent successfully
      if (response.data.message) {
        toast.success("Emails sent to matched buyers successfully!");
      } else {
        toast.info("No matches found.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error triggering match API:", error);
      toast.error("Failed to send match emails.");
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
    </div>
    <h1 className="font-bold text-center">Set Timer Email of 24 hours</h1>
    <MatchButtontime />
    </div>
  );
};

export default MatchButton;
