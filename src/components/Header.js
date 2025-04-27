import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router";

const Header = ()=> {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));
    setIsLoggedIn(Boolean(hasToken));
    console.log(isLoggedIn);
}, [document.cookie]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        credentials: 'include'
      });
      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const renderRightSection = () => {
    if (isLoggedIn) {
      return (
        <div className="flex gap-4">
          <button onClick={handleLogout} className="navbar_button">Logout</button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-4">
          <Link to="/login" className="navbar_button">Login</Link>
          <Link to="/register" className="navbar_button">Sign Up</Link>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar_logo">MEDICONNECT</div>
      <div className="navbar_links">
        <Link to='/' className="navbar_button">Home</Link>
        <Link to='/requests' className="navbar_button">Requests</Link>
        <Link to='/volunteers' className="navbar_button">Volunteers</Link>
        <Link to='/contacts' className="navbar_button">Contact Us</Link>
        <Link to='/donate' className="navbar_button">Donate for a Cause</Link>
      </div>
      {renderRightSection()}
    </nav>
  );
};

export default Header;