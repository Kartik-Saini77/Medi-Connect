import React from 'react';
import { Link } from "react-router";

const Header = ()=> {
  return (
    <nav className="navbar">
      <div className="navbar_logo">MEDICONNECT</div>
      <div className="navbar_links">
        <Link to='/' className="navbar_button">Home</Link>
        <Link to='/Contacts' className="navbar_button">Contact Us</Link>
        <Link to='/Volunteers' className="navbar_button">Volunteers</Link>
        <Link to='/Requests' className="navbar_button">Requests</Link>
      </div>
      <div className="navbar_search">
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
