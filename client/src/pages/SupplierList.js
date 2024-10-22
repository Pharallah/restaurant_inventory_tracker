import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context'
import SupplierCard from '../components/SupplierCard'
import * as yup from "yup";
import { useFormik } from 'formik';

function SupplierList() {
const { suppliers, setSuppliers } = useContext(Context)

// const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

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
    // .matches(phoneRegExp, 'Phone number is not valid')
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
    // onSubmit: (values) => {
    //     console.log("SUPPLIER POST INITIATED")
    //     console.log(values)
    //     fetch("/suppliers", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(values)
    //     })
    //     .then(res => res.json())
    //     .then(newSupplier => {
    //         const updatedSupplierList = [
    //             ...suppliers,
    //             newSupplier
    //         ]
    //         console.log(updatedSupplierList)
    //     })
    // }
})

// DISPLAY SUPPLIERS
const displaySuppliers = suppliers.map(supplier => 
    <SupplierCard 
        key={supplier.id}
        id={supplier.id}
        name={supplier.name}
        email={supplier.email}
        phone_num={supplier.phone_num}
        address={supplier.address}
    />
    
)
    return (
    <>
        <h1>Supplier List</h1>
        <div>
            New Supplier Form
            <br></br>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                
                {/* NAME FIELD */}
                <label htmlFor="name">Supplier Name</label>
                <br />
                <input
                id="name"
                name="name"
                placeholder="Supplier Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>

                {/* EMAIL FIELD */}
                <label htmlFor="email">Email Address</label>
                <br />
                <input
                id="email"
                name="email"
                placeholder="example@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
                />
                <p style={{ color: "red" }}> {formik.errors.email}</p>

                {/* PHONE NUM FIELD */}
                <label htmlFor="phone_num">Phone Number</label>
                <br />
                <input
                id="phone_num"
                name="phone_num"
                placeholder='Ex: 123-456-7890'
                onChange={formik.handleChange}
                value={formik.values.phone_num}
                />
                <p style={{ color: "red" }}> {formik.errors.phone_num}</p>

                {/* ADDRESS FIELD */}
                <label htmlFor="address">Address</label>
                <br />
                <input
                id="address"
                name="address"
                placeholder='123 Main St.'
                onChange={formik.handleChange}
                value={formik.values.address}
                />
                <p style={{ color: "red" }}> {formik.errors.address}</p>

                <button type="submit">Submit</button>

                {/* <fieldset>
                        <legend>Address</legend>

                        <div>
                        <label htmlFor="address.street">Street:</label>
                        <input
                            type="text"
                            id="address.street"
                            name="address.street"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.street}
                        />
                        {formik.touched.address?.street && formik.errors.address?.street ? <div>{formik.errors.address.street}</div> : null}
                        </div>

                        <div>
                        <label htmlFor="address.city">City:</label>
                        <input
                            type="text"
                            id="address.city"
                            name="address.city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.city}
                        />
                        {formik.touched.address?.city && formik.errors.address?.city ? <div>{formik.errors.address.city}</div> : null}
                        </div>

                        <div>
                        <label htmlFor="address.state">State:</label>
                        <input
                            type="text"
                            id="address.state"
                            name="address.state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.state}
                        />
                        {formik.touched.address?.state && formik.errors.address?.state ? <div>{formik.errors.address.state}</div> : null}
                        </div>

                        <div>
                        <label htmlFor="address.postalCode">Postal Code:</label>
                        <input
                            type="text"
                            id="address.postalCode"
                            name="address.postalCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.postalCode}
                        />
                        {formik.touched.address?.postalCode && formik.errors.address?.postalCode ? <div>{formik.errors.address.postalCode}</div> : null}
                        </div>

                        <div>
                        <label htmlFor="address.country">Country:</label>
                        <input
                            type="text"
                            id="address.country"
                            name="address.country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address.country}
                        />
                        {formik.touched.address?.country && formik.errors.address?.country ? <div>{formik.errors.address.country}</div> : null}
                        </div>
                    </fieldset>

                    <button type="submit">Submit</button> */}

            </form>
        </div>
        <div>
            {displaySuppliers}
        </div>
    </>
  )
}

export default SupplierList