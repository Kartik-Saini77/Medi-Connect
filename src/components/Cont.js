import React from 'react';
import divy from './assets/images/divy.jpg'; 
import kart from './assets/images/kartik.jpg';
import rana from './assets/images/rana.jpg'; 

const Cont = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Meet the Creators</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="flex flex-col items-center text-center">
            <img 
              src={divy} 
              alt="Divyanshu Joshi" 
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">Divyanshu Joshi</h2>
            <p className="text-gray-600">Phone: 9027065493</p>
          </div>

         
          <div className="flex flex-col items-center text-center">
            <img 
              src={kart}
              alt="Kartik Saini" 
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">Kartik Saini</h2>
            <p className="text-gray-600">Phone: 8791649470</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img 
              src={rana} 
              alt="Abhishek Rana" 
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">Abhishek Rana</h2>
            <p className="text-gray-600">Phone: 9389876055</p>
          </div>
        </div>
      </div>
      <div className="text-xl caret-lime-500 font-semibold mt-40" >
        special thanks to <span className="text-lime-500">Miss Nritya Sharma</span> for her guidance and support in the development of this project.
      </div>
    </div>
  );
};

export default Cont;
