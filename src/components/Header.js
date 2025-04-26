import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router";
import Icon from './assets/images/search-icon.png';

const Header = ()=> {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Simply check if the token cookie exists
    const hasToken = document.cookie.includes('token=');
    setIsLoggedIn(hasToken);
  }, []);

  const renderRightSection = () => {
    if (location.pathname === "/") {
      return isLoggedIn ? (
        <div className="flex gap-4 w-[200px]"></div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="navbar_button">Login</Link>
          <Link to="/register" className="navbar_button">Sign Up</Link>
        </div>
      );
    } else {
      return (
        <div className="flex gap-4 w-[200px]"></div>
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
      </div>
      {renderRightSection()}
    </nav>
  );
};

export default Header;