import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () =>{
    return(
        <div className="navbar bg-base-100 sticky top-0 z-10">
      <div className="flex-1">
        <NavLink to={'/dashboard'}>
          <span className="btn btn-ghost text-xl">The Tattered Page</span>
        </NavLink>
      </div>
      <div className="flex-none gap-2">
        <ul className="flex space-x-5">
          <NavLink to={'/bookclubs'}>
            <li>Bookclubs</li>
          </NavLink>
          <NavLink to={"/bookshelves"}>
            <li>Bookshelves</li>
          </NavLink>
          <NavLink to={"/books"}>
            <li>Search Results</li>
          </NavLink>
        </ul>
        </div>
        </div>
    )
}
export default NavBar;