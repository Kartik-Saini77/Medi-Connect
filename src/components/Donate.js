import React from 'react';
import qr from './assets/images/qr.jpg'

const Donate = () => {
  return (
    <div className="flex justify-center items-center h-[85vh] bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <img 
          src={qr} 
          alt="Donate for a Cause" 
          className="rounded-lg mb-4 w-full"
        />
        <h1 className="text-2xl font-semibold text-center mb-4">Donate for a Cause</h1>
        <p className="text-lg text-center">
          Your contribution can make a difference. Help us support those in need by donating today.
        </p>
      </div>
    </div>
  );
};

export default Donate;
