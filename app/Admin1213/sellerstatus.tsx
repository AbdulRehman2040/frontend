import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
  propertyStatus: string;
}

const PropertyStatusManagerseller = () => {
  const [sellers, setSellers] = useState<Seller[]>([]); // List of sellers
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [sellersPerPage] = useState<number>(10); // Set 10 sellers per page

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
      if (response.data.updatedSeller.propertyStatus) {
              toast.success("Status updated successfully: " + response.data.updatedSeller.propertyStatus);
            } else {
              toast.info("error updating status");
            }

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

  // Get the current page's sellers
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);

  // Calculate total pages
  const totalPages = Math.ceil(sellers.length / sellersPerPage);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
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

      {/* Sellers Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden border-collapse ">
          <thead className="bg-gray-200">
            <tr className="border-b">
              <th className="py-2 px-4 text-left border-r">Name</th>
              <th className="py-2 px-4 text-left border-r">Phone</th>
              <th className="py-2 px-4 text-left border-r">Property Address</th>
              <th className="py-2 px-4 text-left border-r">Available Date</th>
              <th className="py-2 px-4 text-left border-r">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSellers.map((seller) => (
              <tr key={seller._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border-r">{seller.landlordName}</td>
                <td className="py-2 px-4 border-r">{seller.landlordPhoneNumber}</td>
                <td className="py-2 px-4 border-r">{seller.landlordPropertyAddress}</td>
                <td className="py-2 px-4 border-r">
                  {new Date(seller.propertyAvailableDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-r">{seller.propertyStatus}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateStatus(seller._id, "active")}
                      className="w-full bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Set Active"}
                    </button>
                    <button
                      onClick={() => updateStatus(seller._id, "non-active")}
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

export default PropertyStatusManagerseller;
