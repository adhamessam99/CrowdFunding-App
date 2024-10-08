const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// use the Routes
app.use(authRoutes);
app.use(campaignRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
