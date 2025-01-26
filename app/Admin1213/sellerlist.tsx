import { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/sellers');
        setSellers(response.data);
      } catch (error) {
        setError('Failed to load sellers.');
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://requsest-response.vercel.app/api/sellers/${id}`);
      setSellers(sellers.filter((seller) => seller._id !== id));
    } catch (error) {
      setError('Failed to delete seller.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Seller List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full table-auto border-collapse">
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
          {sellers.map((seller) => (
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
                  Delete
                </button>
                {/* Add Edit functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerList;
