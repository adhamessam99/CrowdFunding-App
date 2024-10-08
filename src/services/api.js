import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/', 
});

export const createCampaign = async (data) => {
  return await api.post('/campaigns', data);
};

export const fetchCampaigns = async () => {
  return await api.get('/campaigns');
};


