import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BuyerEdit = () => {
  const { id } = useParams();  // Get the ID from the URL params
  const navigate = useNavigate();  // Replace useHistory with useNavigate
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    areaRequired: '',
    budget: '',
    notes: '',
    propertyAvailableDate: '',
  });

  useEffect(() => {
    // Fetch the buyer data by ID
    const fetchBuyerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/buyers/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching buyer data:', error);
      }
    };

    if (id) {
      fetchBuyerData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/buyers/${id}`, formData);
      navigate('/admin');  // Redirect to the admin page after successful update
    } catch (error) {
      console.error('Error updating buyer:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Buyer</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for buyer data */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
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

        {/* Other fields here... */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Buyer
        </button>
      </form>
    </div>
  );
};

export default BuyerEdit;
