import React, { useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from '../context/Context';


export const RestockOrderForm = ({
  selectedItem,
  showRestockForm,
  setShowRestockForm,
  onSetShowSuccessMessage
}) => {
  const { suppliers, items, setItems } = useContext(Context)
 


  // Defines options of the dropdown
  const supplierOptions = [
    { value: '', label: 'Select a Supplier' },
    ...suppliers.map(supplier => ({
      value: supplier.id,
      label: supplier.name
    }))
  ]

  // Defines the form schema
  const formSchema = yup.object().shape({
    supplierId: yup
      .string()
      .required("Must choose a supplier."),
    itemId: yup
      .number()
      .positive()
      .integer()
      .required("Must be a valid item"),
    orderQuantity: yup
      .number()
      .positive()
      .integer()
      .required("Must enter an order quantity.")
      .typeError("Please enter an integer")
  });
  
  function parseQuantity(num) {
    const parsedNum = parseInt(num)
    return parsedNum
  }

  // useFormik + POST
  const formik = useFormik({
    initialValues: {
      supplierId: "",
      itemId: selectedItem.id,
      orderQuantity: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const parsedNum = parseQuantity(values.orderQuantity)
      
      if (parsedNum) {
        values.orderQuantity = parsedNum
        fetch("/restockorders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            values,
            null,
            2
          ),
        })
        .then(res => {
          if (res.status === 200) {
            setShowRestockForm(false)
            onSetShowSuccessMessage()
          }
          return res.json()
        })
      } else {
        throw new Error('Failed to submit order');
      }

      console.log(values)
    }
  })
  
    return (
      <>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative inline-block overflow-hidden transform transition-all sm:max-w-lg sm:w-full bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Restock Order Form</h2>
              <h2 className="absolute top-6 right-6 text-lg font-medium text-gray-900 mb-4">Item: {selectedItem.item_name}</h2>
                
              <form onSubmit={formik.handleSubmit}>
                {/* SUPPLIER FIELD */}
                <label 
                  htmlFor="supplierId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >Supplier</label>
                <select
                  id="supplierId"
                  name="supplierId"
                  className="mb-4 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                  onChange={formik.handleChange}
                  value={formik.values.supplierId}
                >
                  {supplierOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="block text-sm font-medium text-red-600 mb-1">{formik.errors.supplierId}</p>

                {/* ORDER QUANTITY FIELD */}
                <label 
                  htmlFor="orderQuantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >Order Quantity</label>
                <input
                  id="orderQuantity"
                  name="orderQuantity"
                  className="mb-4 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                  onChange={formik.handleChange}
                  value={formik.values.orderQuantity}
                />
                <p className="block text-sm font-medium text-red-600 mb-1">{formik.errors.orderQuantity}</p>

                {/* BUTTONS */}
                <div className="flex justify-end space-x-2">
                  <button 
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={() => setShowRestockForm(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      
  );
};