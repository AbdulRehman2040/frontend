import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  areaRequired: string;
  budget: string;
  notes: string;
  propertyAvailableDate: string;
  FirstLineofAddress: string;
  postcode: string;
  propertyStatus: string;
  formCreatedDate: string;
}

const PropertyStatusManagerBuyer = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]); // List of buyers
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [message, setMessage] = useState<string>(""); // Success or error message
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [buyersPerPage] = useState<number>(10); // Set 10 buyers per page

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
 
      // Show success notification if emails are sent successfully
            if (response.data.updatedBuyer.propertyStatus) {
              toast.success("Status updated successfully: " + response.data.updatedBuyer.propertyStatus);
            } else {
              toast.info("error updating status");
            }
 
      // Access updatedBuyer to show the updated status
      const updatedStatus = response.data.updatedBuyer.propertyStatus;
      setMessage(`Status updated successfully: ${updatedStatus}`);

      // Update the local buyers list with the new status
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

  // Get the current page's buyers
  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = buyers.slice(indexOfFirstBuyer, indexOfLastBuyer);

  // Calculate total pages
  const totalPages = Math.ceil(buyers.length / buyersPerPage);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Buyer Property Status</h1>

      {message && (
        <div
          className={`mt-4 p-2 rounded-md ${
            message.includes("successfully") ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Buyers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden border-collapse">
          <thead className="bg-gray-200">
            <tr className="border-b">
              <th className="py-2 px-4 text-left border-r">Name</th>
              <th className="py-2 px-4 text-left border-r">Phone</th>
              <th className="py-2 px-4 text-left border-r">Email</th>
              <th className="py-2 px-4 text-left border-r">Area</th>
              <th className="py-2 px-4 text-left border-r">Budget</th>
              <th className="py-2 px-4 text-left border-r">Available Date</th>
              <th className="py-2 px-4 text-left border-r">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBuyers.map((buyer) => (
              <tr key={buyer._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border-r">{buyer.name}</td>
                <td className="py-2 px-4 border-r">{buyer.phoneNumber}</td>
                <td className="py-2 px-4 border-r">{buyer.emailAddress}</td>
                <td className="py-2 px-4 border-r">{buyer.areaRequired}</td>
                <td className="py-2 px-4 border-r">{buyer.budget}</td>
                <td className="py-2 px-4 border-r">
                  {new Date(buyer.propertyAvailableDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-r">{buyer.propertyStatus}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateStatus(buyer._id, "active")}
                      className="w-full bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Set Active"}
                    </button>
                    <button
                      onClick={() => updateStatus(buyer._id, "non-active")}
                      className="w-full bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Set Non-Active"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`py-1 px-3 rounded-md ${
              currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            } hover:bg-blue-500`}
          >
            {index + 1}
          </button>
        ))}

   <ToastContainer />

        <button
          onClick={() =>
            setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyStatusManagerBuyer;
