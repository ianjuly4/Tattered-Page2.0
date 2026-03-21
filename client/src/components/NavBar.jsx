import React, {useContext} from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const {user} = useContext(MyContext) || {}
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

          <li><NavLink to={user?.id ? `/user/${user.id}` : "/auth/login"} className="navlink">
            Account
          </NavLink>
          </li>
     
      </ul>
    </nav>
  );
};

export default NavBar;
