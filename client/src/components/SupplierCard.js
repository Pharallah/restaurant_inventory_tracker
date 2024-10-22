import React from 'react'

function SupplierCard({
  id,
  name,
  email,
  phoneNum,
  address
}) {
  

  // Use useParams() to dynamically access this component

  // const params = useParams();
  // const supplierId = params.id;
  
  return (
    <>
      <div>
      <b>Supplier:</b> {name} | <b>Email:</b> {email} | <b>Phone:</b> {phoneNum} | <b>Address:</b> {address}
      </div>
      <br></br>
    </>
  )
}

export default SupplierCard