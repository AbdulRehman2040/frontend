import { useState } from "react";
import axios from "axios";

export default function SellerForm() {
  const [formData, setFormData] = useState({
    landlordName: "",
    landlordPhoneNumber: "",
    landlordEmailAddress: "",
    landlordPropertyType: "",
    landlordPropertyAddress: "",
    landlordRent: "",
    propertyAvailableDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const propertyTypes = ["Commercial", "Industrial", "Land"]; // Property types based on schema

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://requsest-response.vercel.app/api/sellers",
        formData
      );
      setLoading(false);
      setSuccessMessage("Seller data submitted successfully!");
      setFormData({
        landlordName: "",
        landlordPhoneNumber: "",
        landlordEmailAddress: "",
        landlordPropertyType: "",
        landlordPropertyAddress: "",
        landlordRent: "",
        propertyAvailableDate: "",
        notes: "",
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to submit seller data.");
      console.error("Error submitting seller data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Seller</h1>
      <form onSubmit={handleSubmit}>
        {/* Landlord Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordName">
             Name
          </label>
          <input
            type="text"
            name="landlordName"
            id="landlordName"
            value={formData.landlordName}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Landlord Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPhoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            name="landlordPhoneNumber"
            id="landlordPhoneNumber"
            value={formData.landlordPhoneNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Landlord Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordEmailAddress">
            Email Address
          </label>
          <input
            type="email"
            name="landlordEmailAddress"
            id="landlordEmailAddress"
            value={formData.landlordEmailAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Property Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPropertyType">
            Property Type
          </label>
          <select
            name="landlordPropertyType"
            id="landlordPropertyType"
            value={formData.landlordPropertyType}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Property Type</option>
            {propertyTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Property Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPropertyAddress">
            Property Address
          </label>
          <input
            type="text"
            name="landlordPropertyAddress"
            id="landlordPropertyAddress"
            value={formData.landlordPropertyAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Rent */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordRent">
            Rent (£)
          </label>
          <input
            type="number"
            name="landlordRent"
            id="landlordRent"
            value={formData.landlordRent}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Property Available Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="propertyAvailableDate">
            Property Available Date
          </label>
          <input
            type="date"
            name="propertyAvailableDate"
            id="propertyAvailableDate"
            value={formData.propertyAvailableDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="notes">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Success and Error Messages */}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
 