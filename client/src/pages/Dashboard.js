import React, { useState } from "react";
import ItemContainer from "../components/ItemContainer";
import { ItemForm } from "../components/ItemForm";

function Dashboard({ 
  items, 
  setItems 
}) {
  
  const [addItemForm, setAddItemForm] = useState(false);

  function onItemAddition(item) {
    const updatedItems = [
      ...items,
      item
    ]
    setItems(updatedItems)
  }

  return (
    <>
      <h1>
        Restaurant Inventory Dashboard
      </h1>
      <div className='mainNav'>

      </div>
      <button 
        className='addItemButton'
        onClick={() => setAddItemForm(true)}
      >
        Add Item
      </button>

      {
        addItemForm && <ItemForm
        addItemForm={addItemForm}
        setAddItemForm={setAddItemForm}
        onItemAddition={onItemAddition}
        />
      }

      <div className="itemContainer">
        <ItemContainer
          items={items}
          setItems={setItems}
        />
      </div>
      
    </>
  )
}

export default Dashboard;

