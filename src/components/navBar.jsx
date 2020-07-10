import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <HashLink smooth className="navbar-brand" to="#top">
        Konference
      </HashLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <HashLink smooth className="navbar-brand" to="#speakers" to="#events">
              Events
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink smooth className="navbar-brand" to="#speakers">Talere</HashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
