import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout'; // Import Logout component
import Header from './Hearder';

const CreateInterview = () => {
  const navigate = useNavigate();

  const handleCreateInterview = () => {
    navigate('/job-post');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header at the top */}
      <Header />

      {/* Add top padding to avoid overlap with the fixed header */}
      <div className="pt-24 relative flex justify-center items-center">
        {/* Logout Button at the Top Right */}
        <Logout />

        {/* Main content */}
        <button
          onClick={handleCreateInterview}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Interview
        </button>
      </div>
    </div>
  );
};

export default CreateInterview;
