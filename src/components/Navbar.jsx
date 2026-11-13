import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ChevronDown
} from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="pvc-navbar">
      <div className="pvc-nav-container">

        <NavLink to="/" className="pvc-brand" onClick={closeMenu}>
          <img
            src="/images/logo.png"
            alt="Prosperity Vision Construction"
            className="pvc-brand-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="pvc-brand-text">
            <strong>Prosperity Vision</strong>
            <strong>Construction</strong>
            <small>Building the future sustainably.</small>
          </div>
        </NavLink>

        <button
          className="pvc-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`pvc-nav-links ${menuOpen ? "active" : ""}`}>

          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink title=" Vision Engineer" to="/assistant" onClick={closeMenu}>
            Vision Engineer 🤖
          </NavLink>

          <NavLink to="/jobs" onClick={closeMenu}>
            Jobs
          </NavLink>


          <NavLink to="/services" onClick={closeMenu}>
            Services <ChevronDown size={14} />
          </NavLink>

          <NavLink to="/companies" onClick={closeMenu}>
            Companies
          </NavLink>

          <NavLink to="/recommendations" onClick={closeMenu}>
            Recommendations
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
           <NavLink to="/terms" onClick={closeMenu}>
            Terms
          </NavLink>
           <NavLink to="/contact" onClick={closeMenu}>
            Contact Us
          </NavLink>

          <NavLink to="/ecosystem" onClick={closeMenu}>
            More <ChevronDown size={14} />
          </NavLink>

        </nav>

        <div className="pvc-nav-actions">
          <button className="pvc-search-icon" aria-label="Search">
            <Search size={20} />
          </button>

         
        </div>

      </div>
    </header>
  );
}