import React from 'react'

export default function Cart() {
  return (
    <div className="container cart">
      <h3>Cart</h3>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>id</th>
            <th>img</th>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>1</td>
            <td><img src="https://picsum.photos/200/200" alt="..." style={{width:'50px',height:'50px'}} /></td>
            <td>Product Name</td>
            <td>100 $</td>
            <td>
              <button className='btn btn-success btnQuantity'>+</button>
                <span>2</span>
              <button className='btn btn-success btnQuantity'>-</button>
            </td>
            <td>200 $</td>
            <td>
              <div className='btnGroup d-flex justify-content-center'>
              <button className='btn btn-primary btnEdit'>EDIT</button>
              <button className='btn btn-danger btnDelete'>DELETE</button>
              </div>
            </td>
            
          </tr>
        </tbody>
      </table>
        <button className='btn btn-warning btnSubmitCart'>SUBMIT ORDER</button>
    </div>
  )
}
