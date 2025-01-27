"use client";
import { useState } from 'react';
import BuyerList from './buyerlist'; // Assuming you already have a BuyerList component
import SellerList from './sellerlist';
import PropertyStatusManagerseller from './sellerstatus';
import Link from 'next/link';
import AdminDashboard from './adminpanelwrrpaer';


const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = () => {
    const adminPassword = 'admin123'; // Replace with a secure password
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!isAuthenticated ? (
        <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-center">Admin Login</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
         {/* <Link href={'/seller-manage-status'}>Buyer List</Link> */}
         <AdminDashboard/>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
