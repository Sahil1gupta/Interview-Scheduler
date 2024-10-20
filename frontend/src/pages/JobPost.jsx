import React, { useState } from 'react';
import axios from 'axios';
import Logout from '../components/Logout'; // Import Logout component
import Header from './Hearder'; // Ensure the correct path to the Header component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const JobPost = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [candidateInput, setCandidateInput] = useState('');
  const [endDate, setEndDate] = useState('');

  const addCandidate = () => {
    if (candidateInput && !candidates.includes(candidateInput)) {
      setCandidates([...candidates, candidateInput]);
      setCandidateInput('');
    }
  };

  const removeCandidate = (index) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { jobTitle, jobDescription, experienceLevel, candidates, endDate };

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      toast.error('No token found. Please log in again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      await axios.post('https://interview-scheduler-45dd.onrender.com/api/job/job', jobData, {
        headers: { Authorization: `${token}` }, // Include token in request headers
      });
      toast.success('Job posted and emails sent!', {
        position: "bottom-right",
        autoClose: 3000, // Show toast for 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Delay navigation to allow the toast to be visible
      setTimeout(() => {
        navigate('/create-interview'); // Redirect to create interview page
      }, 3000); // Delay for 3 seconds
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Error posting job. Please try again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Include Header here */}
      <Header />
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-semibold mb-4">Create Job Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="border w-full p-2 rounded"
                placeholder="Enter Job Title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="border w-full p-2 rounded"
                placeholder="Enter Job Description"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="border w-full p-2 rounded"
                required
              >
                <option value="">Select Experience Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Add Candidate</label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={candidateInput}
                  onChange={(e) => setCandidateInput(e.target.value)}
                  className="border w-full p-2 rounded"
                  placeholder="xyz@gmail.com"
                />
                <button
                  type="button"
                  onClick={addCandidate}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                {candidates.map((candidate, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-200 p-2 rounded mb-2">
                    <span>{candidate}</span>
                    <button
                      type="button"
                      onClick={() => removeCandidate(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border w-full p-2 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700">
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobPost;