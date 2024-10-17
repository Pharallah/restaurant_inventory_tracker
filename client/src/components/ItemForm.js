import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

export const ItemForm = ({
  addItemForm,
  setAddItemForm,
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
          // null,
          // 2
        ),
      })
      .then(res => {
        if (res.status === 200) {
          setAddItemForm(!addItemForm)
        }
        return res.json()
      })
      .then(newItem => onItemAddition(newItem))
      
    }
  })
  
  
    return (
      <div>
      <h4 className='addItemHeader'>Add Inventory Item</h4>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="itemName">Item Name</label>
        <br />
        <input
          id="itemName"
          name="itemName"
          onChange={formik.handleChange}
          value={formik.values.itemName}
        />
        <p style={{ color: "red" }}> {formik.errors.itemName}</p>
        
        <label htmlFor="category">Category</label>
        <br />
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        <p style={{ color: "red" }}> {formik.errors.category}</p>

        <label htmlFor="stockQuantity">Stock Quantity</label>
        <br />

        <input
          id="stockQuantity"
          name="stockQuantity"
          onChange={formik.handleChange}
          value={formik.values.stockQuantity}
        />
        <p style={{ color: "red" }}> {formik.errors.stockQuantity}</p>

        <label htmlFor="reorderQuantity">Reorder Quantity</label>
        <br />

        <input
          id="reorderQuantity"
          name="reorderQuantity"
          onChange={formik.handleChange}
          value={formik.values.reorderQuantity}
        />
        <p style={{ color: "red" }}> {formik.errors.reorderQuantity}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  )

};