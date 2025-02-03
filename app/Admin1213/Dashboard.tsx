import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import MatchButton from "../components/button/matchbutton";
import companyLogo from '../../public/Logo-PNG.png'
import Image from "next/image";
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
const SummaryBox: React.FC<{ title: string; value: number; color: string; loading?: boolean }> = ({
  title,
  value,
  color,
  loading,
}) => {
  const bgColorClass = {
    blue: "bg-[#22344c]",
    green: "bg-[#964B00]",
    silver: "bg-[#b4a483]",
    purple: "bg-yellow-400",
  }[color];

  return (
    <div
      className={`${bgColorClass} text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {loading ? (
        <div className="animate-pulse bg-gray-300 h-8 w-16 rounded"></div> // Skeleton loader for value
      ) : (
        <p className="text-3xl font-bold">{value}</p>
      )}
    </div>
  );
};

// Chart Component
const ChartContainer: React.FC<{ title: string; children: React.ReactNode; loading?: boolean }> = ({
  title,
  children,
  loading,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {loading ? (
        <div className="animate-pulse bg-gray-300 h-64 sm:h-80 md:h-96 rounded"></div> // Skeleton loader for chart
      ) : (
        <div className="w-full h-64 sm:h-80 md:h-96">{children}</div>
      )}
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
    const fetchMatchesAndEmailsSent = async () => {
      try {
        // Fetch matches
        const matchesResponse = await fetch("https://requsest-response.vercel.app/api/match/matches");
        if (!matchesResponse.ok) {
          throw new Error(`HTTP error! Status: ${matchesResponse.status}`);
        }
        const matchesData = await matchesResponse.json();
        setMatches(matchesData.matches || matchesData);
  
        // Fetch total emailsSent count
        const emailsSentResponse = await fetch("https://requsest-response.vercel.app/api/match/emails-sent");
        if (!emailsSentResponse.ok) {
          throw new Error(`HTTP error! Status: ${emailsSentResponse.status}`);
        }
        const emailsSentData = await emailsSentResponse.json();
        setEmailsSent(emailsSentData.totalEmailsSent || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMatchesAndEmailsSent();
  }, []);

  // Function to send emails and update the emailsSent state
  const handleSendEmails = async () => {
    try {
      const response = await fetch("https://requsest-response.vercel.app/api/match/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEmailsSent((prevCount) => prevCount + data.emailsSent); // Increment emailsSent by the number of emails sent
    } catch (error) {
      console.error("Error sending emails:", error);
      setError("Failed to send emails. Please try again later.");
    }
  };

  // Count unmatched buyers and sellers
  const matchedPairs = matches.length;
  const unmatchedBuyers = buyers.length - matchedPairs;
  const unmatchedSellers = sellers.length - matchedPairs;

  // Chart 1: Buyers vs. Sellers (Horizontal Bar Chart)
  const totalData = {
    labels: ["Landlord", "Tenants"],
    datasets: [
      {
        label: "Total Count",
        data: [buyers.length, sellers.length],
        backgroundColor: ["#22344c", "#b4a483"],
        borderColor: ["#1E40AF", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  // Chart 2: Match Statistics (Doughnut Chart)
  const matchData = {
    labels: ["Matched Property", "Unmatched Landlord", "Unmatched Tenants"],
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

  // Chart 3: Matched Property vs Emails Sent (Bar Chart)
  const matchedVsEmailsData = {
    labels: ["Matched Properties", "Emails Sent"],
    datasets: [
      {
        label: "",
        data: [matchedPairs, emailsSent],
        backgroundColor: ["#964B00", "#facc15"],
        borderColor: ["#964B00", "#FFFF00"],
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const barOptions = {
    indexAxis: "y" as const, // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false, // Allow chart to resize freely
    plugins: {
      legend: {
        display: false,  // <-- Change this to false
        position: "top" as const,
      },
      title: {
        display: true,
        text: "",
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
    maintainAspectRatio: false, // Allow chart to resize freely
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" /> {/* Spinner animation */}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
     <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
        {companyLogo && (
          <Image src={companyLogo} alt="Company Logo" width={120} height={120}  className="h-16 w-auto " /> // Use Next.js Image component
        )}
      </div>
     

  {/* <MatchButton handleSendEmails={handleSendEmails} /> */}
      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryBox title="Total Landlord" value={buyers.length} color="blue" loading={loading} />
        <SummaryBox title="Total Tenants" value={sellers.length} color="silver" loading={loading} />
        <SummaryBox title="Matched Property" value={matchedPairs} color="green" loading={loading} />
        <SummaryBox title="Emails Sent" value={emailsSent} color="purple" loading={loading} />
      </div>

      {/* Add a button to send emails */}
     
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buyers vs. Sellers Chart (Horizontal Bar Chart) */}
        <ChartContainer title="Landlords vs. Tenants" loading={loading}>
          <Bar data={totalData} options={barOptions} />
        </ChartContainer>

        {/* Match Statistics Chart (Doughnut Chart) */}
        <ChartContainer title="Match Statistics" loading={loading}>
          <Doughnut data={matchData} options={doughnutOptions} />
        </ChartContainer>

        {/* Matched Property vs Emails Sent Chart (Bar Chart) */}
        <div className="lg:col-span-2">
          <ChartContainer title="Matched Property vs Emails Sent" loading={loading}>
            <Bar data={matchedVsEmailsData} options={barOptions} />
          </ChartContainer>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;