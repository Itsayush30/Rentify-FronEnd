import React, { useState } from 'react';
import axios from 'axios';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    price: '',
    deposit: '',
    preferred_tenants: '',
    apartment_type: '',
    nearby_areas: '',
    contact_number: '',
    city: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.post('https://rentify-backend-azaz.onrender.com/api/v1/createproperty', formData, {
          headers: {
            'x-access-token': token // Include token in headers
          }
        });
      console.log('Property created:', response.data);
      setSuccessMessage('Property added'); 

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Property</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 capitalize">
              {key.replace('_', ' ')}:
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
    </div>
  );
};

export default CreateProperty;
