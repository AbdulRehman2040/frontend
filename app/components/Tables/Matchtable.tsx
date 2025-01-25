import React from "react";

interface MatchTableProps {
  matches: {
    seller: {
      landlordName: string;
      landlordPhoneNumber: string;
      landlordEmailAddress: string;
      landlordPropertyType: string;
      landlordPropertyAddress: string;
      landlordRent: number;
    };
    buyer: {
      name: string;
      phoneNumber: string;
      emailAddress: string;
      areaRequired: string;
      budget: number;
    };
  }[];
}

const MatchTable: React.FC<MatchTableProps> = ({ matches }) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Seller Name</th>
          <th className="border border-gray-300 px-4 py-2">Seller Phone</th>
          <th className="border border-gray-300 px-4 py-2">Seller Email</th>
          <th className="border border-gray-300 px-4 py-2">Property Type</th>
          <th className="border border-gray-300 px-4 py-2">Property Address</th>
          <th className="border border-gray-300 px-4 py-2">Rent</th>
          <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
          <th className="border border-gray-300 px-4 py-2">Buyer Phone</th>
          <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
          <th className="border border-gray-300 px-4 py-2">Area Required</th>
          <th className="border border-gray-300 px-4 py-2">Buyer Budget</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <tr key={index} className="text-center">
            <td className="border border-gray-300 px-4 py-2">{match.seller.landlordName}</td>
            <td className="border border-gray-300 px-4 py-2">{match.seller.landlordPhoneNumber}</td>
            <td className="border border-gray-300 px-4 py-2">{match.seller.landlordEmailAddress}</td>
            <td className="border border-gray-300 px-4 py-2">{match.seller.landlordPropertyType}</td>
            <td className="border border-gray-300 px-4 py-2">{match.seller.landlordPropertyAddress}</td>
            <td className="border border-gray-300 px-4 py-2">${match.seller.landlordRent}</td>
            <td className="border border-gray-300 px-4 py-2">{match.buyer.name}</td>
            <td className="border border-gray-300 px-4 py-2">{match.buyer.phoneNumber}</td>
            <td className="border border-gray-300 px-4 py-2">{match.buyer.emailAddress}</td>
            <td className="border border-gray-300 px-4 py-2">{match.buyer.areaRequired}</td>
            <td className="border border-gray-300 px-4 py-2">${match.buyer.budget}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchTable;
