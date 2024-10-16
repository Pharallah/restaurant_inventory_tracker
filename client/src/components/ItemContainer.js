import React from 'react'
import Item from './Item'

function ItemContainer({
    items,
    setItems
}) {

const itemsDisplay = items.map(item => {
    return <Item
    key={item.id}
    currentItem={item}
    items={items}
    setItems={setItems}
    />
})

  return (
    <div className='itemsDisplay'>
        {itemsDisplay}
    </div>
  )
}

export default ItemContainer