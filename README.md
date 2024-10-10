# CrowdFunding
## Overview
This project is a full-stack web application that allows users to create and manage crowdfunding campaigns. It includes essential features like user authentication, campaign creation, donation processing, and a dashboard to track the progress of campaigns. The system is built using React on the frontend and Express.js on the backend, with a PostgreSQL/MySQL database for data persistence. The app also features a mock payment system to simulate donation processing.

## Features
## Features

- **User Authentication**
  - Sign Up: Allows users to create an account.
  - Login: Users can log in to their account using their credentials.
  -  Encryption: Passwords are securely stored using bcrypt.
  - JWT: Tokens are generated using jsonwebtoken for secure user sessions.
  
- **Campaign Management**
  - Create Campaign: Authenticated users can create new crowdfunding campaigns with a title, description, and fundraising goal.
  - Campaign List: View all active campaigns available in the system.
  - Campaign Details: View detailed information of a specific campaign, including progress.

- **Donation Management**
  - Donation Processing: Users can make donations to a campaign. This uses a mock payment system for simulation purposes.

- **Dashboard**
  - User Campaigns: View all the campaigns created by the logged-in user.
  - Campaign Progress: Track the progress of campaigns, including total funds raised.
  - Donations Made: A record of donations the user has made.
 
## Tech Stack
  **Frontend**
  - React: For building dynamic user interfaces.
  - Tailwind CSS: For styling and responsiveness.
  - React-router: For routing and navigation between different pages.
  - Axios: For making API requests to the backend.

**Backend**
  - Express.js: A Node.js framework for building the backend API.
  - JWT: For secure authentication and session management.
  - Prisma ORM: Used for interacting with the database.

**Database**
  - PostgreSQL: For storing user, campaign, and donation data.


## API Documentation

**Auth Routes**

**POST /signup**
- Description: User signup and account creation.
- Body: { "userName": "string", "email": "string", "passwordHash": "string" }
- Response: 201 Created if successful, 400 if the email already exists.

**POST /login**
- Description: User login and token generation.
- Body: { "email": "string", "passwordHash": "string" }
- Response: 200 OK if successful, 400 if the email or password is incorrect.


**Campaign Routes**

**POST /create-campaign**
- Description: Create a new campaign.
- Body: { "campaignTitle": "string", "campaignDesc": "string", "fundGoal": "number" }
- Response: 201 Created if successful.


**GET /dashboard**
- Description: Retrieve campaigns created by the logged-in user.
- Response: 200 OK with a list of campaigns.

**GET /campaigns/:id**
- Description: Get details of a campaign by its ID.
- Response: 200 OK with campaign details.

**PUT /campaign/:id**
- Description: Update campaign with a donation.
- Body: { "donationAmount": "number" }
- Response: 200 OK if the donation is successful.


## Backend Setup
  **1- Clone the repository.**
    git clone https://github.com/yourusername/crowdfunding-app.git
    cd crowdfunding-app
  **2- Install dependencies.**
    npm install
  **3- Create a .env file in the root directory and add the following environment variables:**
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
  **4- Run database migrations using Prisma.**
    npx prisma migrate dev
  **5- Start the backend server.**
    cd src
    node server.js

## Frontend Setup
  npm start


## Running Tests
To run tests, ensure that the backend server is running and use tools like Postman to interact with the API routes.
  
  


