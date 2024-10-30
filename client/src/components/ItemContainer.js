import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context'
import { RestockOrderForm } from './RestockOrderForm'

function ItemContainer() {
    const { items, suppliers } = useContext(Context)
    const [showRestockForm, setShowRestockForm] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    function onSetShowSuccessMessage() {
        setShowSuccessMessage(true)
        setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
    };

    // Category to image URL mapping
    const categoryImages = {
        "Meat": "https://cdn-icons-png.flaticon.com/128/2403/2403379.png",
        "Produce": "https://cdn-icons-png.flaticon.com/128/9862/9862079.png",
        "Dairy": "https://cdn-icons-png.flaticon.com/128/3070/3070925.png",
        "Beverage": "https://cdn-icons-png.flaticon.com/128/3050/3050130.png",
        "Spice": "https://cdn-icons-png.flaticon.com/128/5495/5495595.png",
        "Equipment": "https://cdn-icons-png.flaticon.com/128/3245/3245107.png",
    };


  return (
    <>
  <ul role="list" className="divide-y divide-gray-100 max-w-xl mx-auto">
    {items.map((item) => (
      <li key={item.id} className="flex justify-between gap-x-6 py-2 max-w-full">
        <div className="flex min-w-0 gap-x-4">
          <img
            alt={item.category}
            src={categoryImages[item.category] || "https://cdn-icons-png.flaticon.com/128/857/857681.png"}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{item.item_name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.category}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Stock Quantity: {item.stock_quantity}</p>
          {item.stock_quantity <= item.reorder_quantity ? (
            <div className="mt-1 flex items-center gap-x-1.5">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
                onClick={() => {
                  setShowRestockForm(true);
                  setSelectedItem(item);
                }}
              >
                Order Now
              </button>
            </div>
          ) : (
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">In Stock</p>
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>

  {showRestockForm && selectedItem && (
    <RestockOrderForm
      selectedItem={selectedItem}
      showRestockForm={showRestockForm}
      setShowRestockForm={setShowRestockForm}
      onSetShowSuccessMessage={onSetShowSuccessMessage}
    />
  )}

  {showSuccessMessage && (
    <div className="fixed top-0 right-0 m-4 p-4 bg-black text-white rounded shadow-md">
      Order has been successfully submitted!
    </div>
  )}
</>
    
  )
}

export default ItemContainer