import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

export const ItemForm = ({
  setShowItemForm,
  onItemAddition
}) => {

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'Meat', label: 'Meat' },
    { value: 'Produce', label: 'Produce' },
    { value: 'Dairy', label: 'Dairy' },
    { value: 'Beverage', label: 'Beverage' },
    { value: 'Spice', label: 'Spice' },
    { value: 'Equipment', label: 'Equipment' },
  ];

  const formSchema = yup.object().shape({
    itemName: yup
      .string()
      .required("Must enter an item name")
      .min(2, "Item name must be at least 2 characters long.")
      .trim(),
    category: yup
      .string()
      .required("Must enter a category"),
    stockQuantity: yup
      .number()
      .positive()
      .integer()
      .required("Must enter a stock quantity")
      .typeError("Please enter an Integer")
      .min(1)
      .max(50),
    reorderQuantity: yup
      .number()
      .positive()
      .integer()
      .required("Must enter a stock quantity")
      .typeError("Please enter an Integer")
      .min(1)
      .max(15)
  });
  
  const formik = useFormik({
    initialValues: {
      itemName: "",
      category: "",
      stockQuantity: "",
      reorderQuantity: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://localhost:5555/items", {
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
          setShowItemForm(false)
        }
        return res.json()
      })
      .then(newItem => onItemAddition(newItem))
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
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Add Inventory Item
                </h2>
              <form onSubmit={formik.handleSubmit}>
                {/* ITEM NAME */}
                <label 
                htmlFor="itemName"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name
                </label>
                <input
                  id="itemName"
                  name="itemName"
                  className="mb-4 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                  onChange={formik.handleChange}
                  value={formik.values.itemName}
                />
                <p className="block text-sm font-medium text-red-600 mb-1"> {formik.errors.itemName}</p>
                
                {/* CATEGORY */}
                <label 
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label >
                  <select
                    id="category"
                    name="category"
                    className="mb-4 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                <p className="block text-sm font-medium text-red-600 mb-1"> {formik.errors.category}</p>
                
                {/* STOCK QUANTITY */}
                <label 
                htmlFor="stockQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stock Quantity
                </label>
                <input
                  id="stockQuantity"
                  name="stockQuantity"
                  className="mb-4 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                  onChange={formik.handleChange}
                  value={formik.values.stockQuantity}
                />
                <p className="block text-sm font-medium text-red-600 mb-1"> {formik.errors.stockQuantity}</p>
                
                {/* REORDER QUANTITY */}
                <label 
                htmlFor="reorderQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reorder Quantity
                </label>
                <input
                  id="reorderQuantity"
                  name="reorderQuantity"
                  className="mb-4 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                  onChange={formik.handleChange}
                  value={formik.values.reorderQuantity}
                />
                <p className="block text-sm font-medium text-red-600 mb-1"> {formik.errors.reorderQuantity}</p>
                
                {/* BUTTONS */}
                <div className="flex justify-between mt-4">
                  <button 
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black mr-auto"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={() => setShowItemForm(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
  )

};