// Header.js
import React from 'react';
import logo from '../pages/logo.png'
const Header = () => {
  return (
    <header className="bg-white shadow-md py-3 px-8 flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo Section */}
        <img
          src={logo}
          alt="Logo"
          className="h-8"
        />
      </div>
      <div className="flex items-center space-x-8">
        {/* Contact Section */}
        <div className="text-gray-700 text-lg">
          Contact
        </div>
        {/* Dropdown Section */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span>Your Name</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
