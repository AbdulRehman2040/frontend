import React, { useState, useEffect } from "react";
import axios from "axios";

interface Seller {
  _id: string;
  landlordName: string;
  landlordPhoneNumber: string;
  landlordEmailAddress: string;
  landlordPropertyType: string;
  landlordPropertyAddress: string;
  landlordRent: number;
  propertyAvailableDate: string;
  notes: string;
  propertyStatus: string; // Add propertyStatus to seller interface
}

const PropertyStatusManagerseller = () => {
  const [sellers, setSellers] = useState<Seller[]>([]); // List of sellers
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [message, setMessage] = useState<string>("");

  // Fetch sellers list when component mounts
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sellers");
        setSellers(response.data);
      } catch (error) {
        setMessage("Error fetching sellers.");
        console.error("Error fetching sellers:", error);
      }
    };
    fetchSellers();
  }, []);

  // Function to update property status for a specific seller
  const updateStatus = async (sellerId: string, status: string) => {
    setIsLoading(true); // Start loading

    try {
      const payload = { propertyStatus: status }; // Payload with the new status

      const response = await axios.put(
        `http://localhost:5000/api/sellers/${sellerId}`,
        payload
      );

      // Access updatedSeller to show the updated status
      const updatedStatus = response.data.updatedSeller.propertyStatus;
      setMessage(`Status updated successfully: ${updatedStatus}`);

      // Update the local seller list with the new status
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller._id === sellerId ? { ...seller, propertyStatus: updatedStatus } : seller
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
      <h1 className="text-xl font-bold mb-4">Update Seller Property Status</h1>

      {message && (
        <div
          className={`mt-4 p-2 rounded-md ${
            message.includes("successfully") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* List of Sellers */}
      <div className="space-y-4">
        {sellers.map((seller) => (
          <div key={seller._id} className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="font-semibold">{seller.landlordName}</h2>
            <p>Phone: {seller.landlordPhoneNumber}</p>
            <p>Email: {seller.landlordEmailAddress}</p>
            <p>Property Type: {seller.landlordPropertyType}</p>
            <p>Property Address: {seller.landlordPropertyAddress}</p>
            <p>Rent: ${seller.landlordRent}</p>
            <p>Available Date: {new Date(seller.propertyAvailableDate).toLocaleDateString()}</p>
            <p>Notes: {seller.notes}</p>
            <p>Status: {seller.propertyStatus}</p>

            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => updateStatus(seller._id, "active")}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Set Active"}
              </button>

              <button
                onClick={() => updateStatus(seller._id, "non-active")}
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

export default PropertyStatusManagerseller;
