import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import EmailActions from "./EmailActions"; // Import the new component

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Buyer {
  _id: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  propertyCategory: string;
  propertyTypeSelect: string;
  areaRequired: string;
  propertyStatus: string;
}

interface Seller {
  _id: string;
  landlordName: string;
  landlordEmailAddress: string;
  landlordPropertyType: string;
  landlordPropertyAddress: string;
  propertyCategory: string;
  propertyStatus: string;
}

interface Match {
  seller: Seller;
  buyer: Buyer;
}

interface DashboardProps {
  buyers: Buyer[];
  sellers: Seller[];
}

// Summary Box Component
const SummaryBox: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => {
  const bgColorClass = {
    blue: "bg-[#22344c]",
    green: "bg-[#b4a483]",
    purple: "bg-yellow-400"
  }[color];

  return (
    <div
      className={`${bgColorClass} text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

// Chart Component
const ChartContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ buyers, sellers }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [emailsSent, setEmailsSent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch match data
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("https://requsest-response.vercel.app/api/match/matches");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMatches(data.matches || data); // Handle both array and object responses
        setEmailsSent(data.matches?.length || data.length || 0); // Safely count emails sent
      } catch (error) {
        console.error("Error fetching match data:", error);
        setError("Failed to fetch match data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Count unmatched buyers and sellers
  const matchedPairs = matches.length;
  const unmatchedBuyers = buyers.length - matchedPairs;
  const unmatchedSellers = sellers.length - matchedPairs;

  // Chart 1: Buyers vs. Sellers (Horizontal Bar Chart)
  const totalData = {
    labels: ["Buyers", "Sellers"],
    datasets: [
      {
        label: "Total Count",
        data: [buyers.length, sellers.length],
        backgroundColor: ["#22344c","#b4a483"],
        borderColor: ["#1E40AF", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  // Chart 2: Match Statistics (Doughnut Chart)
  const matchData = {
    labels: ["Matched Pairs", "Unmatched Buyers", "Unmatched Sellers"],
    datasets: [
      {
        label: "Count",
        data: [matchedPairs, unmatchedBuyers, unmatchedSellers],
        backgroundColor: ["#964B00", "#22344c", "#b4a483"],
        borderColor: ["#964B00", "#22344c", "#b4a483"],
        borderWidth: 1,
      },
    ],
  };

  // Chart 3: Emails Sent (Bar Chart)
  const emailData = {
    labels: ["Emails Sent"],
    datasets: [
      {
        label: "Count",
        data: [emailsSent],
        backgroundColor: ["#FFEE40" ,],
        borderColor: ["#FFFF00"],
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const barOptions = {
    indexAxis: "y" as const, // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Buyers vs. Sellers",
        font: {
          size: 16,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad" as const,
    },
  };

  // Options for Doughnut Chart
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Match Statistics",
        font: {
          size: 16,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad" as const,
    },
  };

  // Options for Email Chart
  const emailOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Emails Sent to Sellers",
        font: {
          size: 16,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad" as const,
    },
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h2>

      {/* Email Actions */}
      {/* <EmailActions matches={matches} /> */}

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryBox title="Total Buyers" value={buyers.length} color="blue" />
        <SummaryBox title="Total Sellers" value={sellers.length} color="green" />
        <SummaryBox title="Matched Pairs" value={matchedPairs} color="green" />
        <SummaryBox title="Emails Sent" value={emailsSent} color="purple" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buyers vs. Sellers Chart (Horizontal Bar Chart) */}
        <ChartContainer title="Buyers vs. Sellers">
          <Bar data={totalData} options={barOptions} />
        </ChartContainer>

        {/* Match Statistics Chart (Doughnut Chart) */}
        <ChartContainer title="Match Statistics">
          <Doughnut data={matchData} options={doughnutOptions} />
        </ChartContainer>

        {/* Emails Sent Chart (Bar Chart) */}
        <div className="lg:col-span-2">
          <ChartContainer title="Emails Sent to Sellers">
            <Bar data={emailData} options={emailOptions} />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;