const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



createCampaign = async (req,res)=>{
    const {campaignTitle,campaignDesc,fundGoal} = req.body
    try{
        const newCampaign = await prisma.campaigns.create({
            data:
            {
                campaignTitle,
                campaignDesc,
                fundGoal,
                amountRaised:0,
                creatorId: req.existUser.id

            },
        });
         
        res.status(201).json(newCampaign);
        

    } catch(error){
        console.log('error creating campaing',error)
        res.status(500).json({error:'An error occurred while creating the campaign'})

    }

};

const getCampaignsByUser = async (req, res) => {
    try {
        // Fetch all campaigns
        const userId = req.existUser.id
        const data = await prisma.campaigns.findMany({
            where:{
                creatorId: userId
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'An error occurred while fetching campaigns' });
    }
};



const getCampaignsByid = async (req, res) => {
    try {
        // Fetch all campaigns
        const campId = req.params.id
        const data = await prisma.campaigns.findUnique({
            where:{
                id: campId
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'An error occurred while fetching campaigns' });
    }
};


const simulatePaymentProcess = () => {
    // Simulate payment outcome: randomly succeed or fail
    const isSuccess = Math.random() > 0.2; // 80% chance of success
    return isSuccess;
  };

  const updateCampaign = async (req, res) => {
    const campaignId = req.params.id;
    const { donationAmount } = req.body;
  
    try {
      const campaign = await prisma.campaigns.findUnique({
        where: { id: campaignId }
      });
  
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      // Simulate payment process
      const paymentSuccess = simulatePaymentProcess();
  
      if (!paymentSuccess) {
        return res.status(400).json({ error: 'Payment failed. Please try again.' });
      }
  
      // If payment succeeds, update the campaign with the donation
      const donateTotal = parseFloat(donationAmount) + parseFloat(campaign.amountRaised);
      const updatedCampaign = await prisma.campaigns.update({
        where: { id: campaignId },
        data: { amountRaised: donateTotal }
      });
  
      // Return the updated campaign data
      res.status(200).json({ message: 'Donation processed successfully', updatedCampaign });
  
    } catch (error) {
      console.error('Error processing donation:', error);
      res.status(500).json({ error: 'An error occurred while processing the donation.' });
    }
  };

module.exports = { createCampaign, getCampaignsByUser,getCampaignsByid, updateCampaign };
