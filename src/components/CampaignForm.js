import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    campaignTitle: '',
    campaignDesc: '',
    fundGoal: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated. Please log in.');
        return;
      }

      // Make a POST request to create a new campaign
      const response = await axios.post(
        'http://localhost:5000/api/create-campaign',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      // Redirect to campaign list or dashboard on successful creation
      alert('Campaign created successfully!');
      navigate('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      setError('Failed to create campaign. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create a New Campaign</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Campaign Title</label>
          <input
            type="text"
            name="campaignTitle"
            value={formData.campaignTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Campaign Description</label>
          <textarea
            name="campaignDesc"
            value={formData.campaignDesc}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Funding Goal</label>
          <input
            type="number"
            name="fundGoal"
            value={formData.fundGoal}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
