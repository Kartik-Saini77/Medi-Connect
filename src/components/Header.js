import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

const Header = ()=> {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MyWebsite</div>
      <div className="navbar__links">
        <button className="navbar__button">Home</button>
        <button className="navbar__button">Contact Us</button>
        <button className="navbar__button">Volunteers</button>
        <button className="navbar__button">Requests</button>
      </div>
      <div className="navbar__search">
        <FaSearch className="navbar__search-icon" /> {/* Add the search icon */}
        <input
          type="text"
          className="navbar__search-input"
          placeholder="Search Medical Supplies"
          aria-label="Search Medical Supplies"
        />
      </div>
    </nav>
  );
};

export default Header;
