import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="mx-auto" style={{ width: "95%" }}>
      <ul className="m-0 p-0 d-flex justify-content-between">
        <li>
          <NavLink style={{ textDecoration: "none" }}>Login</NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: "none" }}>Profile</NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: "none" }}>Messages</NavLink>
        </li>
      </ul>
    </nav>
  );
}
