import React, { useState, useEffect } from "react";
import axios from "axios";

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  areaRequired: string;
  budget: string;
  notes: string;
  propertyAvailableDate: string;
  propertyStatus: string; // add this field to your buyer interface
}

const PropertyStatus = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]); // List of buyers
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [message, setMessage] = useState<string>("");

  // Fetch buyers list when component mounts
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buyers");
        setBuyers(response.data);
      } catch (error) {
        setMessage("Error fetching buyers.");
        console.error("Error fetching buyers:", error);
      }
    };
    fetchBuyers();
  }, []);

  // Function to update property status for a specific buyer
  const updateStatus = async (buyerId: string, status: string) => {
    setIsLoading(true); // Start loading

    try {
      const payload = { propertyStatus: status }; // Payload with the new status

      const response = await axios.put(
        `http://localhost:5000/api/buyers/${buyerId}`,
        payload
      );

      // Access updatedBuyer to show the updated status
      const updatedStatus = response.data.updatedBuyer.propertyStatus;
      setMessage(`Status updated successfully: ${updatedStatus}`);

      // Update the local buyer list with the new status
      setBuyers((prevBuyers) =>
        prevBuyers.map((buyer) =>
          buyer._id === buyerId ? { ...buyer, propertyStatus: updatedStatus } : buyer
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("An error occurred while updating the status.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Property Status</h1>

      {message && (
        <div
          className={`mt-4 p-2 rounded-md ${
            message.includes("successfully") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* List of Buyers */}
      <div className="space-y-4">
        {buyers.map((buyer) => (
          <div key={buyer._id} className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="font-semibold">{buyer.name}</h2>
            <p>Phone: {buyer.phoneNumber}</p>
            <p>Email: {buyer.emailAddress}</p>
            <p>Area Required: {buyer.areaRequired}</p>
            <p>Budget: {buyer.budget}</p>
            <p>Status: {buyer.propertyStatus}</p>

            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => updateStatus(buyer._id, "active")}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Set Active"}
              </button>

              <button
                onClick={() => updateStatus(buyer._id, "non-active")}
                className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Set Non-Active"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyStatus;
