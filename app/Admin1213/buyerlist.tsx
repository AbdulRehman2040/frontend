import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for Toastify

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

const BuyerList = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [buyersPerPage] = useState<number>(10); // Set 10 buyers per page

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/buyers');
        setBuyers(response.data);
      } catch (error) {
        setError('Failed to load buyers.');
        toast.error('Failed to load buyers.'); // Show toast on error
      }
    };

    fetchBuyers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://requsest-response.vercel.app/api/buyers/${id}`);
      setBuyers(buyers.filter((buyer) => buyer._id !== id));
      toast.success('Buyer deleted successfully!'); // Show success toast
    } catch (error) {
      setError('Failed to delete buyer.');
      toast.error('Failed to delete buyer.'); // Show error toast
    }
  };

  // Get current buyers to display based on the page number
  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = buyers.slice(indexOfFirstBuyer, indexOfLastBuyer);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-6">
      <h2 className="text-xl font-bold mb-4">Buyer List</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Phone Number</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Area Required</th>
            <th className="border px-2 py-1">Budget</th>
            <th className="border px-2 py-1">Property Available Date</th>
            <th className="border px-2 py-1">First line Of Address</th>
            <th className="border px-2 py-1">Postcode</th>
            <th className="border px-2 py-1">Property Status</th>
            <th className="border px-2 py-1">Form Created Date</th>
            <th className="border px-2 py-1">Notes</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBuyers.map((buyer) => (
            <tr key={buyer._id} className="border-b">
              <td className="border px-2 py-1">{buyer.name}</td>
              <td className="border px-2 py-1">{buyer.phoneNumber}</td>
              <td className="border px-2 py-1">{buyer.emailAddress}</td>
              <td className="border px-2 py-1">{buyer.areaRequired}</td>
              <td className="border px-2 py-1">{buyer.budget}</td>
              <td className="border px-2 py-1">{buyer.propertyAvailableDate}</td>
              <td className="border px-2 py-1">{buyer.FirstLineofAddress}</td>
              <td className="border px-2 py-1">{buyer.postcode}</td>
              <td className="border px-2 py-1">{buyer.propertyStatus}</td>
              <td className="border px-2 py-1">{buyer.formCreatedDate}</td>
              <td className="border px-2 py-1">{buyer.notes}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(buyer._id)}
                >
                  Delete
                </button>
                {/* Add Edit functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(buyers.length / buyersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* ToastContainer to show toast messages */}
      <ToastContainer />
    </div>
  );
};

export default BuyerList;
