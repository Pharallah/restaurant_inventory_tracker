import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

function RestockOrderCard({
  id,
  orderStatus,
  orderQuantity,
  orderDate,
  supplierName,
  onUpdateOrderStatus,
  onDeleteOrder
}) {

  // Displays the dropdown options to PATCH status
  const statusOptions = [
    // { value: '', label: 'Update Status' },
    { value: "Pending", label: "Pending"},
    { value: "Canceled", label: "Canceled"},
    { value: "Completed", label: "Completed"},
  ];

  const statusFormSchema = yup.object().shape({
    orderStatus: yup
    .string()
    .required("Must choose a status.")
  });
    
  const statusFormik = useFormik({
    initialValues: {
      orderStatus: orderStatus
    },
    validationSchema: statusFormSchema,
    onSubmit: (values) => {
      fetch(`/restockorders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(updatedOrder => onUpdateOrderStatus(updatedOrder))
    }
  })

  function handleOrderDelete() {
    fetch(`/restockorders/${id}`, {
      method: "DELETE",
    })
    .then(res => {
      if (res.ok) {
      // If the server responds with 204 or no body, resolve with an empty object
      return res.status === 204 ? { id } : res.json();
    }
    throw new Error('Failed to delete');
    })
    .then((deletedOrder) => {
      onDeleteOrder(deletedOrder)
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <b>Date:</b> {orderDate} | <b>Quantity:</b> {orderQuantity} | <b>Status:</b>
      <form>
        <label htmlFor="orderStatus">
          <select
            id="orderStatus"
            name="orderStatus"
            onChange={(e) => {
              statusFormik.handleChange(e);
              statusFormik.handleSubmit();
            }}
            value={statusFormik.values.orderStatus}                   
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
      |
      <button onClick={handleOrderDelete}>Delete</button>
    </div>
  )
}

export default RestockOrderCard