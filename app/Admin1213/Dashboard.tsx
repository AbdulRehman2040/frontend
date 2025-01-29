import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Buyer {
  _id: string;
  buyerName: string;
  buyerPhoneNumber: string;
  buyerEmailAddress: string;
  buyerPropertyType: string;
}

interface Seller {
  _id: string;
  landlordName: string;
  landlordPhoneNumber: string;
  landlordEmailAddress: string;
  landlordPropertyType: string;
}

interface Match {
  _id: string;
  buyerId: string;
  sellerId: string;
}

interface DashboardProps {
  buyers: Buyer[];
  sellers: Seller[];
}

const Dashboard: React.FC<DashboardProps> = ({ buyers, sellers }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  // Fetch match data
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://requsest-response.vercel.app/api/match/matches");
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();
  }, []);

  // Count unmatched buyers and sellers
  const matchedPairs = matches.length;
  const unmatchedBuyers = buyers.length - matchedPairs;
  const unmatchedSellers = sellers.length - matchedPairs;

  // Chart 1: Buyers vs. Sellers
  const totalData = {
    labels: ["Buyers", "Sellers"],
    datasets: [
      {
        label: "Total Count",
        data: [buyers.length, sellers.length],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderColor: ["#1E40AF", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  // Chart 2: Match Statistics
  const matchData = {
    labels: ["Matched Pairs", "Unmatched Buyers", "Unmatched Sellers"],
    datasets: [
      {
        label: "Count",
        data: [matchedPairs, unmatchedBuyers, unmatchedSellers],
        backgroundColor: ["#22C55E", "#EF4444", "#3B82F6"],
        borderColor: ["#16A34A", "#B91C1C", "#1E40AF"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4  ">Overview</h2>

      {/* Summary Boxes */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">Total Buyers</h3>
          <p className="text-2xl">{buyers.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">Total Sellers</h3>
          <p className="text-2xl">{sellers.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">Matched Buyers & Sellers</h3>
          <p className="text-2xl">{matchedPairs}</p>
        </div>
      </div>

      {/* Buyers vs. Sellers Chart */}
      <div className="mt-6  bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Buyers vs. Sellers</h3>
        <Bar data={totalData} options={options} />
      </div>

      {/* Match Chart */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Buyer & Seller Match Statistics</h3>
        <Bar data={matchData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
