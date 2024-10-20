import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Hearder'; // Ensure the correct path to the Header component
const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [emailOtp, setEmailOtp] = useState('');
  const email = location.state?.email; // Retrieve email from state

  const handleEmailVerify = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp: emailOtp });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Store JWT
        toast.success(res.data.msg || 'Email verified', {
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
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error verifying email', {
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
    <div className="min-h-screen bg-gray-100">
      {/* Include Header here */}
      <Header />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              name="emailOtp"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              placeholder="Email OTP"
              className="w-full p-3 border rounded"
              required
            />
            <button
              type="button"
              className="w-full py-3 mt-2 bg-blue-600 text-white rounded-lg font-semibold"
              onClick={handleEmailVerify}
            >
              Verify Email OTP
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpVerification;