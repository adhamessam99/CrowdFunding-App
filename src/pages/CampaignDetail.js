import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CampaignDetail = () => {
  const { id } = useParams(); 
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');

  // Fetch campaign details from the backend
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated. Please log in.');
          return;
        }
  
        
        const response = await axios.get(`http://localhost:5000/campaigns/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCampaign(response.data);
        setDonations(response.data.donations || []);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    };
  
    fetchCampaignDetails();
  }, [id]);
  

  // Handle donation form submission
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
  
    try {
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated. Please log in to donate.');
        return;
      }
  
      // Make PUT request to update the campaign with the donation amount
      const response = await axios.put(
        `http://localhost:5000/campaigns/${id}`,
        {
          donationAmount: parseFloat(donationAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setCampaign(response.data); 
      setDonations([...donations, { amount: donationAmount, date: new Date().toLocaleString() }]);
      setDonationAmount('');
      alert('Donation successful!');
    } catch (error) {
      console.error('Error processing donation:', error);
      setError('Failed to process donation. Please try again.');
    }
  };

  if (!campaign) {
    return <div>Loading campaign details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">{campaign.campaignTitle}</h2>
      <p className="mb-4">{campaign.campaignDesc}</p>
      <p className="mb-4">
        <strong>Goal Amount:</strong> ${campaign.fundGoal}
      </p>
      <p className="mb-4">
        <strong>Funds Raised:</strong> ${campaign.amountRaised}
      </p>


     

      {/* Donation Form */}
      <form onSubmit={handleDonationSubmit} className="mb-4">
        <label className="block mb-2">Donate to this campaign:</label>
        <input
          type="number"
          name="donationAmount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
          placeholder="Enter donation amount"
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Donate
        </button>
      </form>

      
      <h3 className="text-2xl font-bold mb-4">Recent Donations</h3>
      <ul>
        {donations.map((donation, index) => (
          <li key={index} className="mb-2">
            ${donation.amount} donated on {donation.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignDetail;
