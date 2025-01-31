import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the Match type
interface Seller {
  landlordName: string;
  landlordEmailAddress: string;
  landlordPropertyType: string;
  landlordPropertyAddress: string;
  propertyCategory: string;
  propertyStatus: string;
}

interface Buyer {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  propertyCategory: string;
  propertyTypeSelect: string;
  areaRequired: string;
  propertyStatus: string;
}

interface Match {
  seller: Seller;
  buyer: Buyer;
}

const Dashboard4 = () => {
  const [matches, setMatches] = useState<Match[]>([]); // Define the type of matches
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch matches when the dashboard loads
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get<{ matches: Match[] }>("http://localhost:5000/api/match/matches"); // Define the response type
        setMatches(response.data.matches);
      } catch (error) {
        setError("Failed to fetch matches.");
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Function to send match emails
  const handleSendMatchEmails = async () => {
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/match/send-emails");
      alert(response.data.message); // Show success message
    } catch (error) {
      setError("Failed to send match emails.");
      console.error("Error sending match emails:", error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Matches Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Matches</h2>
        {matches.length > 0 ? (
          <ul>
            {matches.map((match, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg">
                <p>
                  <strong>Seller:</strong> {match.seller.landlordName}
                </p>
                <p>
                  <strong>Buyer:</strong> {match.buyer.name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )}
      </div>

      {/* Send Match Emails Button */}
      <div className="mt-6">
        <button
          onClick={handleSendMatchEmails}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          {loading ? "Sending Emails..." : "Send Match Emails"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard4;