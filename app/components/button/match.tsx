import React, { useState } from 'react'
import MatchButton from './matchbutton'
import SendSMSButton from './SMSbutton';



 const [emailsSent, setEmailsSent] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);


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

const Match = () => {
  return (
    <div>
       <MatchButton handleSendEmails={handleSendEmails} />
       
    </div>
  )
}

export default Match