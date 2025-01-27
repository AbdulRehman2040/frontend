import React, { useState } from 'react';
import BuyerList from '../Admin1213/buyerlist'; // Import the BuyerList component
import SellerList from '../Admin1213/sellerlist'; // Import the SellerList component
import PropertyStatusManagerseller from '../Admin1213/sellerstatus'; // Import the PropertyStatusManagerseller component
import PropertyStatusManagerBuyer from '../Admin1213/buyerstatus'; // Import the PropertyStatusManagerBuyer component
import MatchButton from '../components/button/matchbutton';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'buyers' | 'sellers' | 'propertyStatusSeller' | 'propertyStatusBuyer' | 'matchbutton'>('buyers');

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Admin Dashboard</h1>

      {/* Tabs for navigation */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'buyers' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('buyers')}
        >
          Manage Buyers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'sellers' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('sellers')}
        >
          Manage Sellers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'propertyStatusSeller' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('propertyStatusSeller')}
        >
          Status of Sellers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'propertyStatusBuyer' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('propertyStatusBuyer')}
        >
          Status of Buyers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'matchbutton' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('matchbutton')}
        >
          Match Button
        </button>
      </div>

      {/* Conditional rendering of components */}
      <div className="bg-white p-4 rounded shadow">
        {activeTab === 'buyers' && <BuyerList />}
        {activeTab === 'sellers' && <SellerList />}
        {activeTab === 'propertyStatusSeller' && <PropertyStatusManagerseller />}
        {activeTab === 'propertyStatusBuyer' && <PropertyStatusManagerBuyer />}
        {activeTab === 'matchbutton' && <MatchButton />}
      </div>
    </div>
  );
};

export default AdminDashboard;
