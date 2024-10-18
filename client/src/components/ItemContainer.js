import React from 'react'
import ItemCard from './ItemCard'
import { useOutletContext } from 'react-router-dom'

function ItemContainer() {
    const { items } = useOutletContext()
    
    const itemsDisplay = items.map(item => {
        return <ItemCard
        key={item.id} 
        item={item}
        />
    })

  return (
    <div className='itemsDisplay'>
        {itemsDisplay}
    </div>
  )
}

export default ItemContainer