import React from 'react';

const Ticket = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Book Your Ticket</h1>
      <form className="max-w-lg">
        <div className="mb-4">
          <label className="block mb-2">From</label>
          <input type="text" className="w-full border rounded p-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">To</label>
          <input type="text" className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
          Search Flights
        </button>
      </form>
    </div>
  );
};

export default Ticket;
