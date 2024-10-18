import React, { useState, useEffect } from 'react'
import { RestockOrderForm } from './RestockOrderForm'
import { Outlet } from 'react-router-dom'

function ItemCard({ item }) {
  const [showOrderButton, setShowOrderButton] = useState(false)
  const [showRestockForm, setShowRestockForm] = useState(false)

  // Opens/Closes the Order Button via quantity
  useEffect(() => {
    if (item.reorder_quantity >= item.stock_quantity) {
      setShowOrderButton(true);
    } else {
      setShowOrderButton(false);
    }
  }, [item]);

  return (
    <>
        <div>
            {item.item_name} | {item.category} | Stock Quantity: {item.stock_quantity} | {
              showOrderButton &&
              <button onClick={
                () => setShowRestockForm(true)
              }
                >Order
              </button>
            }
            {showRestockForm && (
                <RestockOrderForm
                closeForm={() => setShowRestockForm(false)}
              />
            )}
            <Outlet/>
        </div>
        
    </>
    
  )
}

export default ItemCard