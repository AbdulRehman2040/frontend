import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  propertyTypeSelect: string;
  propertyCategory: string;
  areaRequired: string;
  budget: number;
  deposit: number;
  notes: string;
  propertyAvailableDate: string;
  FirstLineofAddress: string;
  postcode: string;
  propertyStatus: string;
  formCreatedDate: string;
}

const NonActiveBuyers = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNonActiveBuyers = async () => {
      try {
        const response = await axios.get(
          "https://requsest-response.vercel.app/api/buyers"
        );
        const nonActiveBuyers = response.data.filter(
          (buyer: Buyer) => buyer.propertyStatus === "non-active"
        );
        setBuyers(nonActiveBuyers);
      } catch (error) {
        toast.error("Failed to load buyers.");
      } finally {
        setLoading(false);
      }
    };

    fetchNonActiveBuyers();
  }, []);

  const handleUpdateStatus = async (buyerId: string, newStatus: string) => {
    try {
      await axios.put(
        `https://requsest-response.vercel.app/api/buyers/${buyerId}`,
        {
          propertyStatus: newStatus,
        }
      );

      setBuyers((prevBuyers) =>
        prevBuyers.map((buyer) =>
          buyer._id === buyerId ? { ...buyer, propertyStatus: newStatus } : buyer
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">In-Active Landlord</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading Landlord...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3">S.No</th>
                <th className="border border-gray-300 p-3">Created Date</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Phone</th>
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3">Property Category</th>
                <th className="border border-gray-300 p-3">Property Type</th>
                <th className="border border-gray-300 p-3">Area Required</th>
                <th className="border border-gray-300 p-3">Budget</th>
                <th className="border border-gray-300 p-3">Deposit</th>
                <th className="border border-gray-300 p-3">Notes</th>
                <th className="border border-gray-300 p-3">Available Date</th>
                <th className="border border-gray-300 p-3">Address</th>
                <th className="border border-gray-300 p-3">Postcode</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, index) => (
                <tr key={buyer._id} className="hover:bg-gray-50 transition-all">
                  <td className="border border-gray-300 p-3 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {new Date(buyer.formCreatedDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">{buyer.name}</td>
                  <td className="border border-gray-300 p-3">{buyer.phoneNumber}</td>
                  <td className="border border-gray-300 p-3">{buyer.emailAddress}</td>
                  <td className="border border-gray-300 p-3">{buyer.propertyCategory}</td>
                  <td className="border border-gray-300 p-3">{buyer.propertyTypeSelect}</td>
                  <td className="border border-gray-300 p-3">{buyer.areaRequired}</td>
                  <td className="border border-gray-300 p-3">£{buyer.budget}</td>
                  <td className="border border-gray-300 p-3">£{buyer.deposit}</td>
                  <td className="border border-gray-300 p-3">{buyer.notes}</td>
                  <td className="border border-gray-300 p-3">
                    {new Date(buyer.propertyAvailableDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">{buyer.FirstLineofAddress}</td>
                  <td className="border border-gray-300 p-3">{buyer.postcode}</td>
                  <td className="border border-gray-300 p-3">{buyer.propertyStatus}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    <label className="flex items-center justify-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={buyer.propertyStatus === "active"}
                          onChange={() =>
                            handleUpdateStatus(
                              buyer._id,
                              buyer.propertyStatus === "active" ? "non-active" : "active"
                            )
                          }
                          className="sr-only"
                        />
                        <div
                          className={`block w-14 h-8 rounded-full transition-colors ${
                            buyer.propertyStatus === "active" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                            buyer.propertyStatus === "active" ? "translate-x-6" : ""
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
      )}

      <ToastContainer />
    </div>
  );
};

export default NonActiveBuyers;