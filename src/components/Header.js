import React from 'react';

const Header = ()=> {
  return (
    <nav className="navbar">
      <div className="navbar_logo">MEDICONNECT</div>
      <div className="navbar_links">
        <button className="navbar_button">Home</button>
        <button className="navbar_button">Contact Us</button>
        <button className="navbar_button">Volunteers</button>
        <button className="navbar_button">Requests</button>
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
