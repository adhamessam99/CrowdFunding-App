import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  // Fetch campaigns from the backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. User is not authenticated.');
          return;
        }

        // Make the API call with the token in the Authorization header
        const response = await axios.get('http://localhost:5000/campaigns', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4 shadow-lg">
              <h3 className="text-xl font-semibold">{campaign.campaignTitle}</h3>
              <p className="mt-2 text-gray-600">{campaign.campaignDesc.slice(0, 100)}...</p>
              <div className="mt-4">
                <p><strong>Funding Goal:</strong> ${campaign.fundGoal}</p>
                <p><strong>Amount Raised:</strong> ${campaign.amountRaised}</p>
                
              </div>
              <Link
                to={`/campaigns/${campaign.id}`}
                className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No campaigns found. Please create a campaign.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
