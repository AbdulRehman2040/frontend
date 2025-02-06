import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SMS_TIMER_START_KEY = "sms_timer_start";
const SMS_TIMER_DURATION_KEY = "sms_timer_duration";

const MatchButtonSMS: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Load timer state from localStorage
  useEffect(() => {
    const storedStart = localStorage.getItem(SMS_TIMER_START_KEY);
    const storedDuration = localStorage.getItem(SMS_TIMER_DURATION_KEY);

    if (storedStart && storedDuration) {
      const startTime = parseInt(storedStart, 10);
      const duration = parseInt(storedDuration, 10);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(0, duration - elapsed);

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        setIsRunning(true);
      } else {
        localStorage.removeItem(SMS_TIMER_START_KEY);
        localStorage.removeItem(SMS_TIMER_DURATION_KEY);
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
          handleSendSMS();
          if (isRunning) {
            setTimeLeft(days * 86400 + hours * 3600 + minutes * 60 + seconds);
            localStorage.setItem(SMS_TIMER_START_KEY, Date.now().toString());
          }
          return days * 86400 + hours * 3600 + minutes * 60 + seconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      toast.error("Enter a valid time greater than 0.");
      return;
    }

    const totalTimeInSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    const now = Date.now();
    
    localStorage.setItem(SMS_TIMER_START_KEY, now.toString());
    localStorage.setItem(SMS_TIMER_DURATION_KEY, totalTimeInSeconds.toString());

    setTimeLeft(totalTimeInSeconds);
    setIsRunning(true);
  };

  const handleSendSMS = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://requsest-response.vercel.app/api/match/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: "+923001234567" }),
      });

      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send SMS.");
    } finally {
      setLoading(false);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    localStorage.removeItem(SMS_TIMER_START_KEY);
    localStorage.removeItem(SMS_TIMER_DURATION_KEY);
    toast.info("SMS Timer stopped.");
  };

  const formatTime = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / 86400);
    const hrs = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(d).padStart(2, "0")}:${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center space-y-6">
      <div className="text-xl font-semibold">Enter SMS Time (DD:HH:mm:ss)</div>
      
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

      <div className="space-y-4">
        <button
          onClick={startTimer}
 className="w-full bg-[#c77536] text-white px-6 py-3 rounded shadow hover:bg-[#d3bba8]"
          disabled={isRunning}
        >
          Start SMS Timer
        </button>

        <button
          onClick={handleSendSMS}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed "
          disabled={timeLeft > 0 || loading}
        >
          {loading ? "Sending SMS..." : (timeLeft === 0 ? "Send SMS " : `Next SMS: ${formatTime(timeLeft)}`)}
        </button>

        <button
          onClick={stopTimer}
          className="w-full hover:bg-[#b4a483] text-white px-6 py-3 rounded shadow bg-[#9e7930]"
        >
          Stop SMS Timer
        </button>
      </div>

      <ToastContainer />
      <div className="border-b border-gray-400 mt-10"></div>
    </div>
  );
};

export default MatchButtonSMS;











