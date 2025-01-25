"use client";

import React, { useState, useEffect } from "react";
import MatchTable from "../Tables/Matchtable";
import axios from "axios";

const MatchesPage = () => {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/match/matches");
        setMatches(response.data.matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <MatchTable matches={matches} />
    </div>
  );
};

export default MatchesPage;
