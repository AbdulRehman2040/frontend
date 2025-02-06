import { useState } from "react";
import MatchButtonSMS from "./timerSMS";

const SendSMSButton = () => {
  const [loading, setLoading] = useState(false);

  const sendSMS = async () => {
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
      alert(data.message);
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send SMS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <h1 className="font-bold text-center -mt-3">Send Instant SMS</h1>
    <button
      onClick={sendSMS}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
    >
      {loading ? "Sending..." : "Send Match SMS"}
    </button>
    <MatchButtonSMS/>
    </div>
  );
};

export default SendSMSButton;
