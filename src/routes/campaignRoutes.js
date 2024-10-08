const express = require('express');
const { createCampaign, getCampaignsByUser, getCampaignsByid, updateCampaign } = require('../controllers/campaignController');
const { authJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a campaign
router.post('/create-campaign', authJWT, createCampaign);
router.get('/campaigns', authJWT, getCampaignsByUser);  // Likely for fetching all campaigns of a user

// Route to get all campaigns created by the logged-in user (for dashboard)
router.get('/dashboard', authJWT, getCampaignsByUser);

// Route to get a campaign by its ID
router.get('/campaigns/:id', authJWT, getCampaignsByid);

// Route to update a campaign (as donation)
router.put('/campaigns/:id', authJWT, updateCampaign);

module.exports = router;
