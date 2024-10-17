import React, { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import SupplierList from './SupplierList'
import RestockingOrders from './RestockOrders'
import { SupplierProvider } from '../context/SupplierContext'

function App() {
  const [items, setItems] = useState([])

  // Items GET ALL request
  useEffect(() => {
    fetch("/items")
    .then(res => {
      return res.json();
    })
    .then(list => setItems(list))
    .catch(error => console.error("Error fetching items:", error));
}, [])

  return (
    <div>
      <Dashboard items={items} setItems={setItems}/>
      <SupplierProvider>
        <SupplierList />
      </SupplierProvider>
    </div>
  );
};

export default App