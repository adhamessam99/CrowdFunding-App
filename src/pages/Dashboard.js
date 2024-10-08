import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated. Please log in.');
          return;
        }

        // Fetch user's campaigns
        const response = await axios.get('http://localhost:5000/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching user campaigns:', error);
        setError('Failed to fetch user campaigns. Please try again.');
      }
    };

    fetchUserCampaigns();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4 shadow-lg h-auto">
              <h3 className="text-xl font-semibold">{campaign.campaignTitle}</h3>
              <p className="mt-2 text-gray-600 break-words">{campaign.campaignDesc}</p>
              <div className="mt-4">
                <p><strong>Funding Goal:</strong> ${campaign.fundGoal}</p>
                <p><strong>Amount Raised:</strong> ${campaign.amountRaised}</p>
               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not created any campaigns yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
