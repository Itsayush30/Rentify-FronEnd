import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(3);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://rentify-backend-azaz.onrender.com/api/v1/allproperty');
        setProperties(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleInterested = (propertyId) => {
    // Handle the "I am interested" action
    console.log(`Interested in property with ID: ${propertyId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
      {currentProperties.map(property => (
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
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2" onClick={() => handleInterested(property._id)}>
              I am interested
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <nav className="flex justify-center">
          <ul className="gap-4 flex justify-center">
            {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className="bg-gray-200 p-5">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BuyerDashboard;
