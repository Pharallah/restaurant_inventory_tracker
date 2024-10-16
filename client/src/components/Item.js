import React from 'react'

function Item({
    currentItem,
    items,
    setItems
}) {




  return (
    <>
        <div>
            {currentItem.item_name} | {currentItem.category} | Stock Quantity: {currentItem.stock_quantity} | <button>Order</button>
        </div>
        
    </>
    
  )
}

export default Item