import React, { useState, useEffect } from 'react'
import { RestockingOrderForm } from './RestockingOrderForm'
import { SupplierProvider } from '../context/SupplierContext'

function Item({
    currentItem,
    items,
    setItems
}) {
  const [showOrderButton, setShowOrderButton] = useState(false)
  const [showRestockForm, setShowRestockForm] = useState(false)

  // Opens/Closes the Order Button via quantity
  useEffect(() => {
    if (currentItem.reorder_quantity >= currentItem.stock_quantity) {
      setShowOrderButton(true);
    } else {
      setShowOrderButton(false);
    }
  }, [currentItem]);

  return (
    <>
        <div>
            {currentItem.item_name} | {currentItem.category} | Stock Quantity: {currentItem.stock_quantity} | {
              showOrderButton &&
              <button onClick={
                () => setShowRestockForm(!showRestockForm)
              }
                >Order
              </button>
            }
            {showRestockForm && (
              <SupplierProvider><RestockingOrderForm
                items={items}
                closeForm={() => setShowRestockForm(false)}
              /></SupplierProvider>
            )}
        </div>
        
    </>
    
  )
}

export default Item