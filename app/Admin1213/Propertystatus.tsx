import React, { useState } from "react";
import axios from "axios";

interface Buyer {
  id: string;
  name: string; // Example property, adjust based on your schema
  propertyStatus: string;
}

const PropertyStatus = () => {
  const [buyerId, setBuyerId] = useState<string>("");
  const [propertyStatus, setPropertyStatus] = useState<string>("active");
  const [message, setMessage] = useState<string>("");

  // Function to update property status
  const updateStatus = async () => {
    try {
      if (!buyerId) {
        setMessage("Please enter a valid Buyer ID.");
        return;
      }
  
      const payload = { propertyStatus }; // Payload with the new status
  
      console.log("Sending payload:", payload); // Debugging
  
      const response = await axios.put(
        `https://requsest-response.vercel.app/api/buyers/${buyerId}`,
        payload
      );
  
      console.log("Response data:", response.data); // Debugging
  
      // Access updatedBuyer to show the updated status
      const updatedStatus = response.data.updatedBuyer.propertyStatus;
  
      setMessage(`Status updated successfully: ${updatedStatus}`);
    } catch (error: any) {
      console.error("Error updating status:", error); // Debugging
      setMessage(
        error.response?.data?.message || "An error occurred while updating the status."
      );
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Property Status</h1>

      <div className="mb-4">
        <label htmlFor="buyerId" className="block font-medium">
          Buyer ID:
        </label>
        <input
          type="text"
          id="buyerId"
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter Buyer ID"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="propertyStatus" className="block font-medium">
          Property Status:
        </label>
        <select
          id="propertyStatus"
          value={propertyStatus}
          onChange={(e) => setPropertyStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="active">Active</option>
          <option value="non-active">Non-Active</option>
        </select>
      </div>

      <button
        onClick={updateStatus}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Update Status
      </button>

      {message && (
        <div
          className={`mt-4 p-2 rounded-md ${
            message.includes("successfully") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default PropertyStatus;
