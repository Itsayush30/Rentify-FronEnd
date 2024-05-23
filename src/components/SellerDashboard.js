// MainComponent.js
import React, { useState } from 'react';
import AddProperty from './AddProperty';
import ShowProperty from './ShowProperty';

const MainComponent = () => {
  const [view, setView] = useState('');

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setView('add')}
        >
          Add Property
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => setView('show')}
        >
          Show Property
        </button>
      </div>

      <div className="mt-4">
        {view === 'add' && <AddProperty />}
        {view === 'show' && <ShowProperty />}
      </div>
    </div>
  );
};

export default MainComponent;
