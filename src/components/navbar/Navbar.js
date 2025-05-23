import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./menuConfig";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../../Assets/Images/logo-main.png";
import "./style.css"; // custom styles or Tailwind

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null); // Ref for the dropdown
  const navbarRef = useRef(null); // Ref for navbar to handle clicks outside

  // Toggle mobile menu
  const toggleMenu = () => setOpen(!open);

  // Close mobile menu
  const closeMenu = () => setOpen(false);

  // Toggle dropdown for submenus
  const toggleDropdown = (index) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  // Close the dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setActiveDropdown(null); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
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
                <div className="navbar-dropdown" ref={dropdownRef}>
                  <span onClick={() => toggleDropdown(index)}>
                    {item.icon} {item.label} 
                    <FaChevronDown
                      className={`dropdown-arrow ${
                        activeDropdown === index ? "rotated" : ""
                      }`}
                    />
                  </span>
                  {activeDropdown === index && (
                    <ul className="dropdown-menu">
                      {item.dropdown.map((subItem, subIdx) => (
                        <li key={subIdx} className="dropdown-item">
                          <Link
                            to={subItem.path}
                            onClick={() => {
                              closeMenu(); // Close the menu on link click
                              setActiveDropdown(null); // Close the dropdown on link click
                            }}
                          >
                            {subItem.icon} {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={closeMenu}
                >
                  {item.icon} {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
