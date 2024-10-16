import React from 'react'
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <NavLink to="/">Dashboard</NavLink>
        <br></br>
        <NavLink to="/about">About</NavLink>
        {/* <NavLink to="/restockorders">Restock Orders</NavLink>
        <NavLink to="/suppliers">SupplierList</NavLink> */}
    </nav>
  )
}

export default NavBar



// How to convert NavLinks to buttons instead???