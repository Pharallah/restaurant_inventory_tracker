import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
import ItemContainer from "../components/ItemContainer";
import NavBar from "../components/NavBar";
import { ItemForm } from "../components/ItemForm";
import { NavLink } from "react-router-dom";


function Dashboard() {

const [items, setItems] = useState([])
const [addItemForm, setAddItemForm] = useState(false);

// GET REQUEST ALL ITEMS
useEffect(() => {
  console.log("FETCH!!!")
  fetch("http://localhost:5555/items")
    .then(res => res.json())
    .then(list => {
      setItems(list);
      console.log(list)
    })
}, [addItemForm])

// let itemForm = <ItemForm
// items={items}
// addItemForm={addItemForm}
// setAddItemForm={setAddItemForm}
// />

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

