import React, { useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom';
import { Context } from '../context/Context';


export const RestockOrderForm = ({
  closeForm,
  item
}) => {
  const { suppliers } = useContext(Context)
  // const { items } = useOutletContext()
  // Defines options of the dropdown
  const supplierOptions = [
    { value: '', label: 'Select a Supplier' },
    ...suppliers.map(supplier => ({
      value: supplier.id,
      label: supplier.name
    }))
  ]
  
  // Defines options of the dropdown
  // const itemOptions = [
  //   { value: '', label: 'Select an Item' },
  //   ...items.map(item => ({
  //     value: item.id,
  //     label: item.item_name,
  //   })),
  // ];

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
      .typeError("Please enter an Integer")
  });
  
  function parseQuantity(num) {
    const parsedNum = parseInt(num)
    return parsedNum
  }


  // useFormik + POST
  const formik = useFormik({
    initialValues: {
      supplierId: "",
      itemId: item.id,
      orderQuantity: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const parsedNum = parseQuantity(values.orderQuantity)
      
      if (parsedNum) {
        values.orderQuantity = parsedNum
        console.log(values)
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
            closeForm()
          }
          return res.json()
        })
        .then(newOrder => {})

      }

      
      
    }
  })
  
    return (
      <div>
      <h4 className='addItemHeader'>Restock Order</h4>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>

        {/* SUPPLIER FIELD */}
        <label htmlFor="supplierId">Supplier</label>
          <br />
            <select
              id="supplierId"
              name="supplierId"
              onChange={formik.handleChange}
              value={formik.values.supplierId}
            >
              {supplierOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          <p style={{ color: "red" }}> {formik.errors.supplierId}</p>

        {/* ITEM FIELD */}
        {/* <label htmlFor="itemId">Item</label>
        <br />
          <select
            id="itemId"
            name="itemId"
            onChange={formik.handleChange}
            value={formik.values.itemId}
          >
            {itemOptions.map(option => (
              <option 
              key={option.value} 
              value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        <p style={{ color: "red" }}> {formik.errors.itemId}</p> */}

        {/* ORDER QUANTITY FIELD */}
        <label htmlFor="orderQuantity">Order Quantity</label>
        <br />
        <input
          id="orderQuantity"
          name="orderQuantity"
          onChange={formik.handleChange}
          value={formik.values.orderQuantity}
        />
        <p style={{ color: "red" }}> {formik.errors.orderQuantity}</p>

        <button type="submit">Submit</button>
        <button onClick={closeForm}>Close</button>
      </form>
    </div>
  );
};