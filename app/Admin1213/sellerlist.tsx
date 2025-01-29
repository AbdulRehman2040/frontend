import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for Toastify

import { MdDeleteForever } from "react-icons/md";

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
}

const SellerList = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [SellersPerPage] = useState<number>(10); // Set 10 buyers per page

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/sellers');
        setSellers(response.data);
      } catch (error) {
        setError('Failed to load sellers.');
        toast.error('Failed to load sellers.'); // Show toast on error
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://requsest-response.vercel.app/api/sellers/${id}`);
      setSellers(sellers.filter((seller) => seller._id !== id));
      toast.success('Seller deleted successfully!'); // Show success toast
    } catch (error) {
      setError('Failed to delete seller.');
      toast.error('Failed to delete seller.'); // Show error toast
    }
  };

  const indexOfLastSeller = currentPage * SellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - SellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mx-6">
      <h2 className="text-xl font-bold mb-4">Seller List</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Table */}
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Property Type</th>
            <th className="border px-4 py-2">Property Address</th>
            <th className="border px-4 py-2">Rent</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSellers.map((seller) => (
            <tr key={seller._id}>
              <td className="border px-4 py-2">{seller.landlordName}</td>
              <td className="border px-4 py-2">{seller.landlordPhoneNumber}</td>
              <td className="border px-4 py-2">{seller.landlordEmailAddress}</td>
              <td className="border px-4 py-2">{seller.landlordPropertyType}</td>
              <td className="border px-4 py-2">{seller.landlordPropertyAddress}</td>
              <td className="border px-4 py-2">${seller.landlordRent}</td>
              <td className="border px-4 py-2">
                <button
                
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(seller._id)}
                >
                  .
                 <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(sellers.length / SellersPerPage) }, (_, index) => (
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

export default SellerList;
