import React, { 
  // useState, 
  // useEffect 
} from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/Context';

function App() {
  const { suppliers, setSuppliers, items, setItems } = useContext(Context)
  
  return (
    <main>
      <header>
        <h1>
        Restaurant Inventory Dashboard
        </h1>
        <NavBar />
      </header>
      <Outlet context={
        {
          suppliers,
          setSuppliers,
          items,
          setItems
        }
      }/>
    </main>
  );
};

export default App