import React from 'react';
import { useNavigate } from 'react-router'; 

const Done = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-4">Success!</h1>
        <p className="text-lg">Your request has been submitted successfully.</p>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-white text-green-500 px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
            onClick={() => navigate('/')} 
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Done;
