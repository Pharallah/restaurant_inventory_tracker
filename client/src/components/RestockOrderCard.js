import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

function RestockOrderCard({
  id,
  orderStatus,
  orderQuantity,
  orderDate,
  supplierName,
  onUpdateOrder
}) {

  // Displays the dropdown options to PATCH status
  const statusOptions = [
    // { value: '', label: 'Update Status' },
    { value: "Pending", label: "Pending"},
    { value: "Canceled", label: "Canceled"},
    { value: "Completed", label: "Completed"},
  ];

  const formSchema = yup.object().shape({
    orderStatus: yup
    .string()
    .required("Must choose a status.")
  });
    
  const formik = useFormik({
    initialValues: {
      orderStatus: orderStatus
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values)
      fetch(`/restockorders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(updatedOrder => onUpdateOrder(updatedOrder))
    },
    
  })

  return (

    <div>
      {orderDate} | {orderQuantity} | 
      <form>
        <label htmlFor="orderStatus">
          <select
            id="orderStatus"
            name="orderStatus"
            onChange={(e) => {
              formik.handleChange(e);
              formik.handleSubmit();
            }}
            value={formik.values.orderStatus}                   
          >
            {statusOptions.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
                </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  )
}

export default RestockOrderCard