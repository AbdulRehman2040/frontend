"use client";

import { useEffect, useState } from "react";

const CookieDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Check if the cookie exists
    const cookies = document.cookie.split("; ").find(row => row.startsWith("userPreference="));
    
    if (cookies) {
      const savedValue = cookies.split("=")[1];
      setSelectedOption(savedValue);
    }
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Set cookie with expiration of 7 days
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `userPreference=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          Select an Option
        </h2>
        <select
          className="mt-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Choose an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

        {selectedOption && (
          <p className="mt-4 text-gray-600">
            You selected: <span className="font-semibold">{selectedOption}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CookieDropdown;
