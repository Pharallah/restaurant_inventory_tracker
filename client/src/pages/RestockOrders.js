import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";
import { ItemForm } from '../components/ItemForm';


function RestockOrders() {
  const [orders, setOrders] = useState([]);
  const { items, suppliers } = useContext(Context);
  const { showItemForm, setShowItemForm } = useOutletContext()
  const { onItemAddition } = useContext(Context)

  // RESTOCK ORDER GET ALL REQUEST
  useEffect(() => {
    fetch('/restockorders')
      .then(res => res.json())
      .then(orders => setOrders(orders));
  }, []);

  function onUpdateOrderStatus(updatedOrder) {
    const updatedOrders = orders.map(order => {
      if (order.id === updatedOrder.id) {
        return updatedOrder;
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
  }

  function supplierMatcher(supplier_id) {
    const supplierMatch = suppliers.find(supplier => supplier.id === supplier_id);
    return supplierMatch ? supplierMatch.name : "Unknown Supplier";
  }

  function itemNameMatcher(item_id) {
    const itemMatch = items.find(item => item.id === item_id);
    return itemMatch ? itemMatch.item_name : "Unknown Item";
  }

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Canceled", label: "Canceled" },
    { value: "Completed", label: "Completed" },
  ];

  const statusFormSchema = yup.object().shape({
    orderStatus: yup.string().required("Must choose a status.")
  });

  function handleStatusChange(orderId, status) {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, order_status: status };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  function handleStatusSubmit(orderId) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
      fetch(`/restockorders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: order.order_status })
      })
        .then(res => res.json())
        .then(updatedOrder => onUpdateOrderStatus(updatedOrder));
    }
  };

  function onDeleteOrder(id) {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
  }

  function handleOrderDelete(id) {
    fetch(`/restockorders/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      console.log(res.ok)
      if (res.ok) {
        onDeleteOrder(id);
      } else {
        throw new Error('Failed to delete');
      }
    })
  }

  return (
    <>
      {
        showItemForm && <ItemForm
        setShowItemForm={setShowItemForm}
        onItemAddition={onItemAddition}
        />
      }
      <ul role="list" className="divide-y divide-gray-100">
        {orders.map(order => {
          const supplierName = supplierMatcher(order.supplier_id);
          const itemName = itemNameMatcher(order.item_id);

          return (
            <div className="max-w-xl mx-auto">
              <li key={order.id} className="flex justify-between gap-x-6 py-2 items-center">
                <div className="flex items-center gap-x-4">
                  <img
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQE0gKAPEJtOG4aRftb_m2LQpKB_7W_DjGA&s"
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className=" text-sm font-semibold leading-5 text-black-500">{supplierName} | {order.order_date}</p>
                    <p className="text-sm leading-6 text-gray-900">
                      <b>Item:</b> {itemName} 
                    </p>
                    <p className=" text-sm leading-6 text-gray-900">
                      <b>Order Quantity:</b> {order.order_quantity}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end space-y-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleStatusSubmit(order.id);
                    }}
                  >
                    <label
                      htmlFor={`orderStatus-${order.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      <select
                        id={`orderStatus-${order.id}`}
                        name="orderStatus"
                        className="block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        value={order.order_status}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="submit" className="hidden">Submit</button>
                  </form>
                  <button
                    onClick={() => handleOrderDelete(order.id)}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-red-600 text-sm font-medium text-white hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default RestockOrders;