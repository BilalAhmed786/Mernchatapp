// src/components/WelcomePage.jsx

import React from 'react';

const Welcome = () => {

 
  return (
    <div className="flex items-center justify-center bg-white text-black min-h-screen">
      <div className="text-center -mt-28">
        <h1 className="text-4xl font-bold mb-4">Welcome to Saif Chat</h1>
        <p className="text-lg mb-8">Connect with your friends and family like never before.</p>
        <button
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
