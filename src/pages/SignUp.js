import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    passwordHash: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const validatePassword = (password) => {
    
    const passwordRegex = /^(?=.*\d).{6,}$/;
    
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 6 characters long and contain at least one number.';
    }

    return ''; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    const passwordError = validatePassword(formData.passwordHash);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      await axios.post('http://localhost:5000/signup', formData);
      
      navigate('/Login');
      
    } catch (error) {
      console.error('Error signing up:', error);

      if (error.response && error.response.status === 400 && error.response.data.error === 'Email already exists') {
        setError('Email already exists.');
      } else {
        setError('Sign up failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>} 
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
