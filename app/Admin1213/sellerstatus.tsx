import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface Seller {
  _id: string;
  landlordName: string;
  landlordPhoneNumber: string;
  landlordEmailAddress: string;
  propertyCategory: string;
  landlordPropertyType: string;
  landlordPropertyAddress: string;
  Size: string;
  landlordRent: string;
  propertyStatus: string;
  notes: string;
  formCreatedDate: string;
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
        const response = await axios.get("https://requsest-response.vercel.app/api/sellers");
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
        `https://requsest-response.vercel.app/api/sellers/${sellerId}`,
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

  // Filter non-active sellers
  const nonActiveSellers = sellers.filter(seller => seller.propertyStatus === "non-active");

  // Get the current page's sellers
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = nonActiveSellers.slice(indexOfFirstSeller, indexOfLastSeller);

  // Calculate total pages
  const totalPages = Math.ceil(nonActiveSellers.length / sellersPerPage);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <h1 className="text-xl font-bold mb-4">In-Active Tenants</h1>

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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden border-collapse">
          <thead className="bg-gray-200">
            <tr className="border-b">
              <th className="py-2 px-4 text-left border-r">S.No</th>
              <th className="py-2 px-4 text-left border-r">Created Date</th>
              <th className="py-2 px-4 text-left border-r">Name</th>
              <th className="py-2 px-4 text-left border-r">Phone</th>
              <th className="py-2 px-4 text-left border-r">Email</th>
              <th className="py-2 px-4 text-left border-r">Property Category</th>
              <th className="py-2 px-4 text-left border-r">Property Type</th>
              <th className="py-2 px-4 text-left border-r">Property Address</th>
              <th className="py-2 px-4 text-left border-r">Size</th>
              <th className="py-2 px-4 text-left border-r">Rent</th>
              <th className="py-2 px-4 text-left border-r">Notes</th>
              <th className="py-2 px-4 text-left border-r">Status</th>
              <th className="py-2 px-4 text-left">Active/In-Active</th>
            </tr>
          </thead>
          <tbody>
            {currentSellers.map((seller, index) => (
              <tr key={seller._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border-r">{index + 1 + (currentPage - 1) * sellersPerPage}</td>
                <td className="py-2 px-4 border-r">
                  {new Date(seller.formCreatedDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-r">{seller.landlordName}</td>
                <td className="py-2 px-4 border-r">{seller.landlordPhoneNumber}</td>
                <td className="py-2 px-4 border-r">{seller.landlordEmailAddress}</td>
                <td className="py-2 px-4 border-r">{seller.propertyCategory}</td>
                <td className="py-2 px-4 border-r">{seller.landlordPropertyType}</td>
                <td className="py-2 px-4 border-r">{seller.landlordPropertyAddress}</td>
                <td className="py-2 px-4 border-r">{seller.Size}</td>
                <td className="py-2 px-4 border-r">{seller.landlordRent}</td>
                <td className="py-2 px-4 border-r">{seller.notes}</td>
                <td className="py-2 px-4 border-r">{seller.propertyStatus}</td>
                <td className="py-2 px-4">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={seller.propertyStatus === "active"}
                        onChange={() =>
                          updateStatus(
                            seller._id,
                            seller.propertyStatus === "active" ? "non-active" : "active"
                          )
                        }
                        className="sr-only"
                        disabled={isLoading}
                      />
                      <div
                        className={`block w-10 h-6 rounded-full transition-colors ${
                          seller.propertyStatus === "active" ? "bg-blue-500" : "bg-gray-500"
                        }`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          seller.propertyStatus === "active" ? "translate-x-4" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
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