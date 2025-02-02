import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar"; 
import BuyerList from "../Admin1213/buyerlist";
import SellerList from "../Admin1213/sellerlist";
import PropertyStatusManagerseller from "../Admin1213/sellerstatus";
import PropertyStatusManagerBuyer from "../Admin1213/buyerstatus";
import MatchButton from "../components/button/matchbutton";
import Dashboard from "./Dashboard";
import TimerButton from "../components/button/timerbutton";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

  // Fetch Buyers
  useEffect(() => {
    fetch("https://requsest-response.vercel.app/api/buyers")
      .then((res) => res.json())
      .then((data) => setBuyers(data))
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);

  // Fetch Sellers
  useEffect(() => {
    fetch("https://requsest-response.vercel.app/api/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  // Define the handleSendEmails function
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
      console.log("Emails sent:", data.emailsSent);
    } catch (error) {
      console.error("Error sending emails:", error);
      throw error; // Re-throw the error to handle it in the MatchButton component
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

        {/* Main Content */}
        <div className="p-4 bg-gray-100 flex-1 ml-20 overflow-hidden transition-all">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

          <div className="bg-white p-4 rounded shadow">
            {activeTab === "dashboard" && <Dashboard buyers={buyers} sellers={sellers} />}
            {activeTab === "buyers" && <BuyerList />}
            {activeTab === "sellers" && <SellerList />}
            {activeTab === "propertyStatusSeller" && <PropertyStatusManagerseller />}
            {activeTab === "propertyStatusBuyer" && <PropertyStatusManagerBuyer />}
            {activeTab === "matchbutton" && (
              <MatchButton handleSendEmails={handleSendEmails} /> // Pass the function as a prop
            )}
           
            
          </div>
        </div>
      </div>

      {/* One-Line Footer */}
      <footer className="text-center py-3 bg-black text-white text-sm">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;