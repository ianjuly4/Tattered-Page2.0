import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="navlink">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/books" className="navlink">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookclub" className="navlink">
            Bookclub
          </NavLink>
        </li>
        {/* <li>
          <NavLink to={`/users/${user.id}`} className="navlink">
            Profile
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
