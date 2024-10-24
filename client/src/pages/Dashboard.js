import React, { useContext } from "react";
import ItemContainer from "../components/ItemContainer";
import { ItemForm } from "../components/ItemForm";
import { useOutletContext } from "react-router-dom";
import { Context } from "../context/Context";

function Dashboard() {
  
  const {  
    showItemForm, 
    setShowItemForm,
  } = useOutletContext()

  const { onItemAddition } = useContext(Context)



  return (
   <div className="flex-grow p-4">
      {showItemForm && (
        <ItemForm setShowItemForm={setShowItemForm} onItemAddition={onItemAddition} />
      )}
      <div className="itemContainer">
        <ItemContainer />
      </div>
    </div>
  )
}

export default Dashboard;

