import React, { useState, useEffect }from 'react'
import RestockOrderCard from '../components/RestockOrderCard'
import { useContext } from 'react';
import { SupplierContext } from '../context/SupplierContext';


function RestockOrders() {
  const [orders, setOrders] = useState([])
  const { suppliers, setSuppliers } = useContext(SupplierContext)

  console.log(orders)
  console.log(suppliers)
  
  // RESTOCK ORDER GET ALL REQUEST
  useEffect(() => {
    fetch('/restockorders')
    .then(res => res.json())
    .then(orders => setOrders(orders))
  }, [])


  // create a function we can call inside the orderDisplay to loop through suppliers and return the supplier name that matches the current order's id

  // function supplierMatcher(supplier_id) {
  //   const supplierMatch = suppliers.find(supplier => supplier.id === supplier_id);
  //   console.log(supplierMatch)
  //   return supplierMatch.name
  // }

  const orderDisplay = orders.map(order => {
    // const supplierName = supplierMatcher(order.supplier_id)

    return <RestockOrderCard 
      key={order.id}
      orderStatus={order.order_status}
      orderQuantity={order.order_quantity}
      orderDate={order.order_date}
      // supplierName={supplierName}
    />
  })
  
  
  return (
    <>
      <h1>Restock Orders</h1>
      <div>
        <h3>Order History</h3>
        {orderDisplay}
      </div>
      <button>Order</button>
    </>
  )
}

export default RestockOrders