import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/v1/allproperty');
        setProperties(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
      {properties.map(property => (
        <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
          <img src="https://via.placeholder.com/300" alt="property" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{property.address}</h2>
            <p className="text-gray-700 mb-2">{property.description}</p>
            <p className="text-gray-700 mb-2"><strong>City:</strong> {property.city}</p>
            <p className="text-gray-700 mb-2"><strong>Price:</strong> {property.price}</p>
            <p className="text-gray-700 mb-2"><strong>Deposit:</strong> {property.deposit}</p>
            <p className="text-gray-700 mb-2"><strong>Preferred Tenants:</strong> {property.preferred_tenants.join(', ')}</p>
            <p className="text-gray-700 mb-2"><strong>Apartment Type:</strong> {property.apartment_type}</p>
            <p className="text-gray-700 mb-2"><strong>Nearby Areas:</strong> {property.nearby_areas.join(', ')}</p>
            <p className="text-gray-700"><strong>Contact Number:</strong> {property.contact_number}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyerDashboard;
