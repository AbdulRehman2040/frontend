import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchButtontime: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number>(0); // Timer in seconds
  const [hours, setHours] = useState<number>(0); // Hours input
  const [minutes, setMinutes] = useState<number>(0); // Minutes input
  const [seconds, setSeconds] = useState<number>(0); // Seconds input
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // To store the interval ID
  const [initialTime, setInitialTime] = useState<number>(0); // Store the initial time for restarting

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (timer === 0 && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      toast.info("Time's up! Restarting timer...");

      // Restart the timer immediately with the initial time
      setTimer(initialTime);
      startTimer(initialTime);
    }
  }, [timer, intervalId, initialTime]);

  const handleMatchClick = async () => {
    setLoading(true);

    try {
      // Call the match API endpoint
      const response = await axios.get("http://localhost:5000/api/match/matches");

      // Show success notification if emails are sent successfully
      if (response.data.message) {
        toast.success("Emails sent to matched Tenant successfully!");
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

  const startTimer = (time: number) => {
    if (time <= 0) {
      toast.error("Please enter a valid time greater than 0.");
      return;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    setTimer(time);

    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000); // Update every second

    setIntervalId(newIntervalId);
  };

  const handleStart = () => {
    // Convert hours, minutes, and seconds to total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      toast.error("Please enter a valid time greater than 0.");
      return;
    }

    // Set the initial time for restarting
    setInitialTime(totalSeconds);

    // Start the timer
    startTimer(totalSeconds);
  };

  // Format seconds into HH:MM:SS
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <div className="mb-4">
        <div className="flex justify-center space-x-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hour</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              placeholder="HH"
              className="border p-2 rounded w-20"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Min</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              placeholder="MM"
              className="border p-2 rounded w-20"
              min="0"
              max="59"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sec</label>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              placeholder="SS"
              className="border p-2 rounded w-20"
              min="0"
              max="59"
            />
          </div>
        </div>
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 mt-4"
          disabled={loading || (hours === 0 && minutes === 0 && seconds === 0)}
        >
          Start Timer
        </button>
      </div>
      <button
        onClick={handleMatchClick}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        disabled={loading || timer > 0}
      >
        {loading ? "Processing..." : timer === 0 ? "Time's Up!" : `Time Left: ${formatTime(timer)}`}
      </button>
      <ToastContainer />
    </div>
  );
};

export default MatchButtontime;