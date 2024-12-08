import React from 'react';

const Tracking = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Flight</h1>
      <div className="max-w-lg">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Enter flight number"
            className="w-full border rounded p-2"
          />
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Track Flight
        </button>
      </div>
    </div>
  );
};

export default Tracking;
