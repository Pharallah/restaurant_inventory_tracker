import React, { useState } from "react";
import ItemContainer from "../components/ItemContainer";
import { ItemForm } from "../components/ItemForm";
import { Outlet, useOutletContext } from "react-router-dom";
import { SupplierProvider } from "../context/SupplierContext";

function Dashboard() {
  const { items, setItems } = useOutletContext()

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
        <SupplierProvider>
          <ItemContainer />
        </SupplierProvider>
      </div>
      <Outlet context={items}/>
      
    </>
  )
}

export default Dashboard;

