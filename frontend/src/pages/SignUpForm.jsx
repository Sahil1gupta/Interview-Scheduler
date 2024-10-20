import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Header from './Hearder';

// Import the Header component
 // Ensure the correct path for the Header

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    email: '',
    employeeSize: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);

      if (res.data.msg) {
        toast.success('OTP sent successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate('/verify-otp', { state: { email: formData.email } });
        }, 3000);
      } else {
        toast.error('Signup failed. Please try again.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error during signup', {
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
    <div>
      {/* Include the Header component here */}
      <Header/>
      
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full bg-white rounded-lg border p-6 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone no."
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Company Email"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="employeeSize"
              value={formData.employeeSize}
              onChange={handleChange}
              placeholder="Employee Size"
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Proceed
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUpForm;
