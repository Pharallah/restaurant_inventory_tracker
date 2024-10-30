import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react'

const Context = createContext()

function ContextProvider({ children }) {
    const [suppliers, setSuppliers] = useState([])
    const [items, setItems] = useState([])

    // Suppliers GET ALL request
    useEffect(() => {
        // console.log("SUPPLIER GET FETCH")
        fetch("/suppliers")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(supplier => setSuppliers(supplier))
        .catch(error => console.error("Error fetching suppliers:", error));
    }, [])
  
  // Items GET ALL request
    useEffect(() => {
        fetch("/items")
        .then(res => {
        return res.json();
        })
        .then(list => setItems(list))
        .catch(error => console.error("Error fetching items:", error));
    }, [])

    function onItemAddition(item) {
        console.log("onItemAddition TRIGGERED")
        const updatedItems = [
          ...items,
          item
        ]
        setItems(updatedItems)
      }
  
    return <Context.Provider value={
        {
            suppliers, 
            setSuppliers,
            items,
            setItems,
            onItemAddition
        }
    }>{children}</Context.Provider>
}

export { Context, ContextProvider }