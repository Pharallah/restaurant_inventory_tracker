import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context'
import SupplierCard from '../components/SupplierCard'
import * as yup from "yup";
import { useFormik } from 'formik';
import { useOutletContext } from "react-router-dom";
import { ItemForm } from '../components/ItemForm';


function SupplierList() {
const { suppliers, setSuppliers } = useContext(Context)
const { showItemForm, setShowItemForm } = useOutletContext()
const { onItemAddition } = useContext(Context)
const supplierImages = {
    restaurantDepot: "https://www.restaurantdepot.com/images/default-source/default-album/logo.png?sfvrsn=17ca70b1_0",
    gordonFoodService: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPTIr8TePA5fIv2ksOOY6aeQO3TxG0bvtdFA&s",
    eatLocalOhio: "https://www.eatlocalohio.com/assets/images/shapes/elo-logo.png"
}

const phoneRegExp = /^(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

const supplierFormSchema = yup.object().shape({
    name: yup
    .string()
    .required("Supplier name required")
    .min(1, "Name must be at least 1 character long")
    .max(20, "Maximum characters exceeded"),
    email: yup
    .string()
    .email("Invalid email format")
    .required("Email required"),
    phone_num: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required("Phone Number required"),
    address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must at least be 5 characters long")
    .max(250, "Maximum length exceeded")
});

function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        phone_num: "",
        address: ""
    },
    validationSchema: supplierFormSchema,
    onSubmit: (values, { resetForm }) => {
        const formattedPhoneNum = formatPhoneNumber(values.phone_num);

        if (formattedPhoneNum) {
            values.phone_num = formattedPhoneNum;

            fetch("/suppliers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then(newSupplier => {
                const updatedSupplierList = [
                    ...suppliers,
                    newSupplier
                ];
                setSuppliers(updatedSupplierList);
                resetForm();
            });
        } else {
            console.error("Invalid phone number format");
        }
    }
})

    function getSupplierImageUrl(supplierName) {
        switch (supplierName.toLowerCase()) {
            case 'restaurant depot':
                return supplierImages.restaurantDepot;
            case 'gordon food service':
                return supplierImages.gordonFoodService;
            case 'eat local ohio':
                return supplierImages.eatLocalOhio;
            default:
                return "https://t4.ftcdn.net/jpg/05/86/73/21/240_F_586732137_fm65Y6l2FSyD0MZF4eUTxq03fYfCuiQ8.jpg";
        }
    }

    return (
        <>
        {showItemForm && (
          <ItemForm
            setShowItemForm={setShowItemForm}
            onItemAddition={onItemAddition}
          />
        )}
        <div className="flex justify-center mt-10">
          <form onSubmit={formik.handleSubmit} className="space-y-4 p-4 border border-gray-200 rounded lg:w-1/3 md:w-1/2 w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Supplier Form</h2>
      
            {/* NAME FIELD */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Supplier Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Supplier Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            </div>
      
            {/* EMAIL FIELD */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            </div>
      
            {/* PHONE NUM FIELD */}
            <div>
              <label htmlFor="phone_num" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phone_num"
                name="phone_num"
                type="text"
                placeholder="Ex: 123-456-7890"
                onChange={formik.handleChange}
                value={formik.values.phone_num}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone_num}</p>
            </div>
      
            {/* ADDRESS FIELD */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St."
                onChange={formik.handleChange}
                value={formik.values.address}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
            </div>
      
            <div className="flex justify-center">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </div>
        
        <br></br>
        <br></br>
        
        {/* SUPPLIER LIST */}
        <div className="max-w-xl mx-auto">
          <ul role="list" className="divide-y divide-gray-100">
            {suppliers.map((supplier) => (
              <li key={supplier.id} className="flex justify-between gap-x-3 py-1 max-w-full">
                <div className="flex min-w-0 gap-x-4">
                    {}
                    <img 
                    alt="" 
                    src={getSupplierImageUrl(supplier.name)}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50" 
                    />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{supplier.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{supplier.address}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{supplier.email}</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">{supplier.phone_num}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
  )
}

export default SupplierList