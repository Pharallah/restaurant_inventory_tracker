import React, { useState, useEffect }from 'react'
import RestockOrderCard from '../components/RestockOrderCard'
// import { useContext } from 'react';
// import { Context } from '../context/Context';


function RestockOrders() {
  const [orders, setOrders] = useState([])
  // const { items, setItems, suppliers, setSuppliers } = useContext(Context)

  // console.log(orders)
  // console.log(suppliers)
  
  // RESTOCK ORDER GET ALL REQUEST
  useEffect(() => {
    fetch('/restockorders')
    .then(res => res.json())
    .then(orders => setOrders(orders))
  }, [])

  function onUpdateOrder(updatedOrder) {
    console.log(updatedOrder)
    const updatedOrders = orders.map(order => {
      if (order.id === updatedOrder.id) {
        return updatedOrder
      }
      else {
        return order
      }
    })
    setOrders(updatedOrders)
    // const orderIds = orders.map(order => {
    //   console.log(order.orderStatus)
    // })
  }
  // function supplierMatcher(supplier_id) {
  //   const supplierMatch = suppliers.find(supplier => supplier.id === supplier_id);
  //   return supplierMatch.name
  // }

  const orderDisplay = orders.map(order => {
    // const supplierName = supplierMatcher(order.supplier_id)

    return <RestockOrderCard 
      key={order.id}
      id={order.id}
      orderStatus={order.order_status}
      orderQuantity={order.order_quantity}
      orderDate={order.order_date}
      onUpdateOrder={onUpdateOrder}
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