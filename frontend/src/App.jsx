import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import OtpVerification from './pages/OtpVerification';
import CreateInterview from './pages/CreateInterview';
import JobPost from './pages/JobPost';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/create-interview" element={<CreateInterview />} />
        <Route path="/job-post" element={<PrivateRoute><JobPost /></PrivateRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<SignUpForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;