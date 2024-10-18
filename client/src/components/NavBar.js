import React from 'react'
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <NavLink to="/">Dashboard</NavLink>
        <br></br>
        <NavLink to="/suppliers">Suppliers</NavLink>
        <br></br>
        <NavLink to="/restockorders">Restock Orders</NavLink>
        <br></br>
        <NavLink to="/about">About</NavLink>
    </nav>
  )
}

export default NavBar