import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Crowdfunding App</Link>
        <div>
          <Link to="/campaigns" className="mx-2">Campaigns</Link>
          <Link to="/dashboard" className="mx-2">Dashboard</Link>
          <Link to="/create-campaign" className="mx-2">Create Campaign</Link>
          <Link to="/signup" className="mx-2">Sign Up</Link>
          <Link to="/login" className="mx-2">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
