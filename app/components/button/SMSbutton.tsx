import { useState } from "react";

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
    <button
      onClick={sendSMS}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      {loading ? "Sending..." : "Send SMS"}
    </button>
  );
};

export default SendSMSButton;
