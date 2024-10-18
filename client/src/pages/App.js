import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

function App() {
  const [items, setItems] = useState([])
  
  // Items GET ALL request
  useEffect(() => {
    console.log("ITEM GET FETCH")
    fetch("/items")
    .then(res => {
      return res.json();
    })
    .then(list => setItems(list))
    .catch(error => console.error("Error fetching items:", error));
}, [])

  return (
    <main>
      <header>
        <h1>
        Restaurant Inventory Dashboard
        </h1>
        <NavBar />
      </header>
      <Outlet context={{
        items,
        setItems
      }}/>
    </main>
  );
};

export default App