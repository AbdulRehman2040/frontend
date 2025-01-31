import React, { useState } from "react";

interface EmailActionsProps {
  matches: Array<{ seller: { landlordEmailAddress: string }; buyer: any }>;
}

const EmailActions: React.FC<EmailActionsProps> = ({ matches }) => {
  const [timer, setTimer] = useState<number>(0); // Timer in seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to send emails
  const sendEmails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/match/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matches }), // Send matches in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Emails sent successfully:", data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error sending emails:", error);
      setError("Failed to send emails. Please try again later.");
    }
  };

  // Function to handle instant email sending
  const handleInstantEmail = () => {
    sendEmails();
  };

  // Function to handle timer email sending
  const handleTimerEmail = () => {
    if (timer <= 0) {
      setError("Please enter a valid time (greater than 0).");
      return;
    }

    setIsTimerRunning(true);
    setError(null);

    // Start the timer
    setTimeout(() => {
      sendEmails();
      setIsTimerRunning(false);
    }, timer * 1000); // Convert seconds to milliseconds
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Email Actions</h3>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Instant Email Button */}
      <button
        onClick={handleInstantEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all mr-4"
      >
        Send Instant Emails
      </button>

      {/* Timer Email Section */}
      <div className="mt-4">
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          placeholder="Enter time in seconds"
          className="border border-gray-300 p-2 rounded-lg mr-4"
          disabled={isTimerRunning}
        />
        <button
          onClick={handleTimerEmail}
          disabled={isTimerRunning}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
        >
          {isTimerRunning ? `Sending in ${timer} seconds...` : "Schedule Emails"}
        </button>
      </div>
    </div>
  );
};

export default EmailActions;