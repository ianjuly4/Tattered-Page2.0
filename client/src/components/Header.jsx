import React from "react";
import NavBar from "./NavBar";

function Header() {
  return (
    <div>
      {/* Sticky Navbar */}
      <div className=" bg-base-100 border-t-2 border-b-2 border-gray-300 sticky top-0 z-10">
        <h2>The Tattered Page</h2>
        <NavBar/>
      </div>

    </div>
  );
}

export default Header;
