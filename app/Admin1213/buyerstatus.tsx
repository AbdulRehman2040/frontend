import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  propertyStatus: string;
}

const NonActiveBuyers = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
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

  const handleEdit = (buyer: Buyer) => {
    setEditingBuyer(buyer);
    setUpdatedStatus(buyer.propertyStatus);
  };

  const handleUpdate = async () => {
    if (!editingBuyer) return;

    try {
      await axios.put(
        `https://requsest-response.vercel.app/api/buyers/${editingBuyer._id}`,
        {
          propertyStatus: updatedStatus,
        }
      );

      setBuyers((prevBuyers) =>
        prevBuyers.map((buyer) =>
          buyer._id === editingBuyer._id
            ? { ...buyer, propertyStatus: updatedStatus }
            : buyer
        )
      );

      toast.success("Status updated successfully!");
      setEditingBuyer(null);
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Non-Active Landlords</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading buyers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Phone</th>
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3">Status</th>
                <th className="border border-gray-300 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer._id} className="hover:bg-gray-50 transition-all">
                  <td className="border border-gray-300 p-3">{buyer.name}</td>
                  <td className="border border-gray-300 p-3">{buyer.phoneNumber}</td>
                  <td className="border border-gray-300 p-3">{buyer.emailAddress}</td>
                  <td className="border border-gray-300 p-3">{buyer.propertyStatus}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    <button
                      onClick={() => handleEdit(buyer)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
                    >
                      Edit Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Updating Status */}
      {editingBuyer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Status</h3>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="non-active">Non-Active</option>
              <option value="active">Active</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingBuyer(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md transition hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-md transition hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default NonActiveBuyers;
