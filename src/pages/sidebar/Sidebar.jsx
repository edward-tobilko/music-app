import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../img/music-logo.png";
import { links } from "../../utils/utils";
import "./sidebar.scss";

import { VscMenu } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = () => {
  const [sidebarMobile, setSidebarMobile] = useState(false);

  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="Sidebar__icon" className="sidebar-icon" />

        <ul className="sidebar__menu">
          {links.map((link) => (
            <li className="sidebar__menu-list" key={link.name}>
              <NavLink to={link.to} className="sidebar__menu-link">
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Burger menu */}
      <div className="burger__menu">
        {!sidebarMobile ? (
          <VscMenu
            className="burger__menu-icon"
            onClick={() => setSidebarMobile(true)}
          />
        ) : (
          <AiOutlineClose
            className="burger__menu-icon"
            onClick={() => setSidebarMobile(false)}
          />
        )}
      </div>

      {/* Show mobile menu */}
      <div
        className={`show__menu ${!sidebarMobile ? "show__menu-hidden" : ""}`}
      >
        <img src={logo} alt="Sidebar__icon" className="sidebar-icon" />

        <ul className="sidebar__menu">
          {links.map((link) => (
            <li className="sidebar__menu-list" key={link.name}>
              <NavLink
                to={link.to}
                className="sidebar__menu-link"
                onClick={() => setSidebarMobile(false)}
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
