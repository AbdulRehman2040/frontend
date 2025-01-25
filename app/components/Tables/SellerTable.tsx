"use client";

import React from 'react';

interface Seller {
  id: string;
  name: string;
  lastName: string;
  city: string;
  country: string;
  area: string;
}

interface SellerTableProps {
  sellers: Seller[];
}

const SellerTable: React.FC<SellerTableProps> = ({ sellers }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Seller List</h3>
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
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td className="border border-gray-300 px-4 py-2">{seller.id}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.name}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.city}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.country}</td>
              <td className="border border-gray-300 px-4 py-2">{seller.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTable;
