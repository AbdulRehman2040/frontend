"use client";

import React from 'react';

interface Buyer {
  id: string;
  name: string;
  lastName: string;
  city: string;
  country: string;
  area: string;
}

interface BuyerTableProps {
  buyers: Buyer[];
}

const BuyerTable: React.FC<BuyerTableProps> = ({ buyers }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Buyer List</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">Area</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer.id}>
              <td className="border border-gray-300 px-4 py-2">{buyer.id}</td>
              <td className="border border-gray-300 px-4 py-2">{buyer.name}</td>
              <td className="border border-gray-300 px-4 py-2">{buyer.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{buyer.city}</td>
              <td className="border border-gray-300 px-4 py-2">{buyer.country}</td>
              <td className="border border-gray-300 px-4 py-2">{buyer.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerTable;
