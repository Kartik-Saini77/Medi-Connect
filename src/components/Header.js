import React from 'react';
import { Link } from "react-router";
import Icon from './assets/images/search-icon.png';

const Header = ()=> {
  return (
    <nav className="navbar">
      <div className="navbar_logo">MEDICONNECT</div>
      <div className="navbar_links">
        <Link to='/' className="navbar_button">Home</Link>
        <Link to='/Requests' className="navbar_button">Requests</Link>
        <Link to='/Volunteers' className="navbar_button">Volunteers</Link>
        <Link to='/Contacts' className="navbar_button">Contact Us</Link>
      </div>
      <div className="navbar_search">
        <img src={Icon} alt="search" className="navbar_search-icon" />
        <input
          type="text"
          className="navbar_search-input"
          placeholder="Search Medical Supplies"
          aria-label="Search Medical Supplies"
        />
      </div>
    </nav>
  );
};

export default Header;
