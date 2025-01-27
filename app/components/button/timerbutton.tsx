import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchButtontime: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number>(24); // 24 hours in seconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // To store the interval ID

  useEffect(() => {
    // Start the timer when the component mounts
    if (timer === 0 && intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Cleanup interval on component unmount
      }
    };
  }, [timer, intervalId]);

  const handleMatchClick = async () => {
    setLoading(true);

    // Start the countdown timer when the button is clicked
    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000); // Update every second

    setIntervalId(newIntervalId);

    try {
      // Call the match API endpoint
      const response = await axios.get("http://localhost:5000/api/match/matches");

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

  // Function to format the time remaining into HH:MM:SS
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <button
        onClick={handleMatchClick}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : timer === 0 ? "Time's Up!" : `Time Left: ${formatTime(timer)}`}
      </button>
      <ToastContainer />
    </div>
  );
};

export default MatchButtontime;
