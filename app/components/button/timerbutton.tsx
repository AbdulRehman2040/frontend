import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MatchButtonTimeProps {
  handleSendEmails: () => Promise<void>;
}

const TIMER_START_KEY = "match_timer_start";
const TIMER_DURATION_KEY = "match_timer_duration";

const MatchButtonTime: React.FC<MatchButtonTimeProps> = ({ handleSendEmails }) => {
  const [hours, setHours] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Load timer state from localStorage when component mounts
  useEffect(() => {
    const storedStart = localStorage.getItem(TIMER_START_KEY);
    const storedDuration = localStorage.getItem(TIMER_DURATION_KEY);

    if (storedStart && storedDuration) {
      const startTime = parseInt(storedStart, 10);
      const duration = parseInt(storedDuration, 10);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(0, duration - elapsed);

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        setIsRunning(true);
      } else {
        localStorage.removeItem(TIMER_START_KEY);
        localStorage.removeItem(TIMER_DURATION_KEY);
      }
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleMatchClick(); // Trigger function when timer reaches 0
          // Restart the timer after it reaches 0
          if (isRunning) {
            setTimeLeft(hours * 3600 + minutes * 60 + seconds); // Restart with initial time
            localStorage.setItem(TIMER_START_KEY, Date.now().toString());
          }
          return hours * 3600 + minutes * 60 + seconds; // Reset timer to initial value
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Start Timer
  const startTimer = () => {
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      toast.error("Enter a valid time greater than 0.");
      return;
    }
  

    const totalTimeInSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

    const now = Date.now();
    localStorage.setItem(TIMER_START_KEY, now.toString());
    localStorage.setItem(TIMER_DURATION_KEY, totalTimeInSeconds.toString());

    setTimeLeft(totalTimeInSeconds);
    setIsRunning(true);
  };

  // Trigger Email Function When Timer Reaches 0
  const handleMatchClick = async () => {
    try {
      await handleSendEmails();
      toast.success("Emails sent successfully!");
      // After sending the email, restart the timer
      if (isRunning) {
        setTimeLeft(hours * 3600 + minutes * 60 + seconds); // Restart with the same initial time
        localStorage.setItem(TIMER_START_KEY, Date.now().toString());
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send emails.");
    }
  };

  // Stop Timer and Reset
  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.removeItem(TIMER_DURATION_KEY);
    toast.info("Timer stopped.");
  };

  // Format time to HH:mm:ss
  const formatTime = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / 86400);
    const hrs = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(d).padStart(2, "0")}:${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center space-y-6">
  <div className="text-xl font-semibold">Enter Time (DD:HH:mm:ss)</div> {/* Label for HH:mm:ss */}
  
  {/* Time Input Fields */}
  <div className="flex justify-center space-x-2">
  <input
  type="number"
  value={days}
  onChange={(e) => setDays(Math.max(0, Math.min(7, parseInt(e.target.value) || 0)))}
  placeholder="DD"
 className="w-full max-w-[4rem] p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4a483] text-sm md:text-base"
/>

    <input
      type="number"
      value={hours}
      onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
      placeholder="HH"
      className="w-full max-w-[4rem] p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4a483] text-sm md:text-base"
    />
    <input
      type="number"
      value={minutes}
      onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
      placeholder="MM"
      className="w-full max-w-[4rem] p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4a483] text-sm md:text-base"
    />
    <input
      type="number"
      value={seconds}
      onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
      placeholder="SS"
      className="w-full max-w-[4rem] p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4a483] text-sm md:text-base"
    />
  </div>

  {/* Timer Buttons */}
  <div className="space-y-4">
    <button
      onClick={startTimer}
      className="w-full bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700"
      disabled={isRunning}
    >
      Start Timer
    </button>

    <button
      onClick={handleMatchClick}
      className="w-full bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 disabled:bg-gray-400"
      disabled={timeLeft > 0}
    >
      {timeLeft === 0 ? "Send Emails" : `Time Left: ${formatTime(timeLeft)}`}
    </button>

    <button
      onClick={stopTimer}
      className="w-full bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700"
    >
      Stop Timer
    </button>
  </div>

  <ToastContainer />
</div>

  );
};

export default MatchButtonTime;
