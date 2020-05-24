import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">GymTracker</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
              <Link to="/login" className="nav-link">Log in</Link>
          </li>
          <li className="navbar-item">
              <Link to="/register" className="nav-link">Register</Link>
          </li>
          <li className="navbar-item">
              <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
