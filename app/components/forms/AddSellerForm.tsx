// pages/seller-form.js
import { useState } from 'react';
import axios from 'axios';

export default function SellerForm() {
  const [formData, setFormData] = useState({
    landlordName: '',
    landlordPhoneNumber: '',
    landlordEmailAddress: '',
    landlordPropertyType: '',
    landlordPropertyAddress: '',
    landlordRent: '',
    propertyAvailableDate: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = async (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('https://backend-est6d65jg-abdul-rehmans-projects-49109cf3.vercel.app/api/sellers', formData);
      setLoading(false);
      setSuccessMessage('Seller data submitted successfully!');
      setFormData({
        landlordName: '',
        landlordPhoneNumber: '',
        landlordEmailAddress: '',
        landlordPropertyType: '',
        landlordPropertyAddress: '',
        landlordRent: '',
        propertyAvailableDate: '',
        notes: '',
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to submit seller data.');
      console.error('Error submitting seller data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Add Seller</h1>
      <form onSubmit={handleSubmit}>
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
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPropertyType">
            Property Type
          </label>
          <input
            type="text"
            name="landlordPropertyType"
            id="landlordPropertyType"
            value={formData.landlordPropertyType}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
           <select
            name="budget"
            id="budget"
            value={formData.landlordPropertyType}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select property type</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Land">Land</option>
          </select>
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordPropertyAddress">
            Property Area
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="landlordRent">
            Budget
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
        {/* <div className="mb-4">
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
        </div> */}
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
