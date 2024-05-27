import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowProperty = () => {
  const [properties, setProperties] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('https://rentify-backend-azaz.onrender.com/api/v1/property', {
          headers: {
            'x-access-token': token 
          }
        });
        console.log("response", response.data.data);
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
    <div>
      <h1>Property Details</h1>
      {properties.length === 0 ? (
        <div>No property added! Please add your property first.</div>
      ) : (
        properties.map((property, index) => (
          <div className='mb-3 border-[0.5px] border-black border-solid p-1' key={index}>
            <h2>Property {index + 1}</h2>
            <p><strong>Address:</strong> {property?.address}</p>
            <p><strong>Description:</strong> {property?.description}</p>
            <p><strong>City:</strong> {property?.city}</p>
            <p><strong>Price:</strong> {property?.price}</p>
            <p><strong>Deposit:</strong> {property?.deposit}</p>
            <p><strong>Preferred Tenants:</strong> {property?.preferred_tenants?.join(', ')}</p>
            <p><strong>Apartment Type:</strong> {property?.apartment_type}</p>
            <p><strong>Nearby Areas:</strong> {property?.nearby_areas?.join(', ')}</p>
            <p><strong>Contact Number:</strong> {property?.contact_number}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowProperty;
