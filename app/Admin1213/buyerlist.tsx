import { useState, useEffect } from 'react';
import axios from 'axios';

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  areaRequired: string;
  budget: string;
  notes: string;
  propertyAvailableDate: string;
}

const BuyerList = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get('https://requsest-response.vercel.app/api/buyers');
        setBuyers(response.data);
      } catch (error) {
        setError('Failed to load buyers.');
      }
    };

    fetchBuyers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://requsest-response.vercel.app/api/buyers/${id}`);
      setBuyers(buyers.filter((buyer) => buyer._id !== id));
    } catch (error) {
      setError('Failed to delete buyer.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Buyer List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Area Required</th>
            <th className="border px-4 py-2">Budget</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer._id}>
              <td className="border px-4 py-2">{buyer.name}</td>
              <td className="border px-4 py-2">{buyer.phoneNumber}</td>
              <td className="border px-4 py-2">{buyer.emailAddress}</td>
              <td className="border px-4 py-2">{buyer.areaRequired}</td>
              <td className="border px-4 py-2">{buyer.budget}</td>
              <td className="border px-4 py-2">
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
    </div>
  );
};

export default BuyerList;
