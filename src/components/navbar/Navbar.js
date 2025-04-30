import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./menuConfig";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../../Assets/Images/logo-main.png";
import "./style.css"; // custom styles or Tailwind

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false); // 🔥 New function to close menu
  const toggleDropdown = (index) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-in">
          <div className="navbar-left">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </div>

          <div className="navbar-toggle" onClick={toggleMenu}>
            {open ? <FaTimes /> : <FaBars />}
          </div>

          <ul className={`navbar-menu ${open ? "active" : ""}`}>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`navbar-item ${
                  location.pathname === item.path ? "active-link" : ""
                }`}
              >
                {item.dropdown ? (
                  <div className="navbar-dropdown">
                    <span onClick={() => toggleDropdown(index)}>
                      {item.icon}
                      {item.label} <FaChevronDown className="dropdown-arrow" />
                    </span>
                    {activeDropdown === index && (
                      <ul className="dropdown-menu">
                        {item.dropdown.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <Link to={subItem.path} onClick={closeMenu}>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link to={item.path} onClick={closeMenu}>
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
