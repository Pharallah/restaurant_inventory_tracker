import React from 'react'

function SupplierCard({
  id,
  name,
  email,
  phone_num,
  address
}) {
  

  
  return (
    <>
      <div>
      <b>Supplier:</b> {name} | <b>Email:</b> {email} | <b>Phone:</b> {phone_num} | <b>Address:</b> {address}
      </div>
      <br></br>
    </>
  )
}

export default SupplierCard