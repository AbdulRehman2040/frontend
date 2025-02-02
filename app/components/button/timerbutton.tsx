import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchButtontime: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [initialTime, setInitialTime] = useState<number>(0);
   const [emailsSent, setEmailsSent] = useState<number>(0);

    const [error, setError] = useState<string | null>(null);
  // Control whether the timer should auto-restart (loop) after reaching zero
  const [isLoopActive, setIsLoopActive] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    // Only restart the timer if looping is active
    if (timer === 0 && intervalId && isLoopActive) {
      clearInterval(intervalId);
      setIntervalId(null);
      toast.info("Time's up! Restarting timer...");
      setTimer(initialTime);
      startTimer(initialTime);
    }
  }, [timer, intervalId, initialTime, isLoopActive]);

  const handleSendEmails = async () => {
    try {
      const response = await fetch("https://requsest-response.vercel.app/api/match/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEmailsSent((prevCount) => prevCount + data.emailsSent); // Increment emailsSent by the number of emails sent
    } catch (error) {
      console.error("Error sending emails:", error);
      setError("Failed to send emails. Please try again later.");
    }
  };

  const startTimer = (time: number) => {
    if (time <= 0) {
      toast.error("Please enter a valid time greater than 0.");
      return;
    }
    if (intervalId) clearInterval(intervalId);
    setTimer(time);
    // Ensure the loop is active when starting the timer
    setIsLoopActive(true);
    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleStart = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds <= 0) {
      toast.error("Please enter a valid time greater than 0.");
      return;
    }
    setInitialTime(totalSeconds);
    startTimer(totalSeconds);
  };

  const handleStopLoop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsLoopActive(false);
    toast.info("Timer loop has been stopped.");
  };

  const formatTime = (time: number): string => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {["Hour", "Min", "Sec"].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <label className="text-sm font-medium mb-1">{label}</label>
            <input
              type="number"
              value={index === 0 ? hours : index === 1 ? minutes : seconds}
              onChange={(e) => {
                const value = Number(e.target.value);
                index === 0
                  ? setHours(value)
                  : index === 1
                  ? setMinutes(value)
                  : setSeconds(value);
              }}
              placeholder={label.substring(0, 2)}
              className="border p-2 rounded w-20 text-center"
              min="0"
              max={index === 0 ? undefined : 59}
            />
          </div>
        ))}
      </div>

      {/* Flex container to add gap between the buttons */}
      <div className="flex flex-col gap-4">
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 disabled:bg-gray-400"
          disabled={loading || (hours === 0 && minutes === 0 && seconds === 0)}
        >
          Start Timer
        </button>
        <button
          onClick={handleStopLoop}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 disabled:bg-gray-400"
          disabled={!isLoopActive || loading || timer === 0}
        >
          Stop Timer
        </button>
        <button
          onClick={handleSendEmails}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading || timer > 0}
        >
          {loading
            ? "Processing..."
            : timer === 0
            ? "Time's Up!"
            : `Time Left: ${formatTime(timer)}`}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
      />
    </div>
  );
};

export default MatchButtontime;
