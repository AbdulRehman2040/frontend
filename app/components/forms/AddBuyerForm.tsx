import { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  areaRequired: string;
  budget: string;
  notes: string;
  propertyAvailableDate: string;
}

const BuyerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    areaRequired: '',
    budget: '',
    notes: '',
    propertyAvailableDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const ukCities = [
    'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford',
    'Liverpool', 'Edinburgh', 'Bristol', 'Wakefield', 'Cardiff', 'Coventry', 'Nottingham',
    'Leicester', 'Sunderland', 'Newcastle', 'Kingston upon Hull', 'Stoke-on-Trent', 'Wolverhampton',
    'Derby', 'Dundee', 'Derry', 'Plymouth', 'Aberdeen', 'Oxford', 'Cambridge'
    // Add more cities as needed
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/buyers', formData);
      setLoading(false);
      setSuccessMessage('Buyer data submitted successfully!');
      setFormData({
        name: '',
        phoneNumber: '',
        emailAddress: '',
        areaRequired: '',
        budget: '',
        notes: '',
        propertyAvailableDate: '',
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to submit buyer data.');
      console.error('Error submitting buyer data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Landlord Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Landlord Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
            Landlord Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="emailAddress">
            Landlord Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Area Required (Dropdown for UK Cities) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="areaRequired">
            Landlord Property Address (City)
          </label>
          <select
            name="areaRequired"
            id="areaRequired"
            value={formData.areaRequired}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select a City</option>
            {ukCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="budget">
            Landlord Rent Budget
          </label>
          <select
            name="budget"
            id="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Budget Range</option>
            <option value="100-200">100-200</option>
            <option value="200-400">200-400</option>
            <option value="400-600">400-600</option>
            <option value="600-1000">600-1000</option>
            <option value="1000+">1000+</option>
          </select>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Add Buyer'}
        </button>
      </form>
    </div>
  );
};

export default BuyerForm;
