import React, { useState, useEffect }from 'react'

const SupplierContext = React.createContext();

function SupplierProvider({ children }) {
    const [suppliers, setSuppliers] = useState([])
    
    // Suppliers GET ALL request
    useEffect(() => {
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
  
    return <SupplierContext.Provider 
    value={{ suppliers, setSuppliers }}
    >{children}</SupplierContext.Provider>;
};

export { SupplierContext, SupplierProvider };