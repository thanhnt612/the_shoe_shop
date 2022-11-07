import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

export default function Register() {

  const frm = useFormik({
    initialValue: {
      email: '',
      password: '',
      name: '',
      gender: true,
      phone: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Email không đúng định dạng !')
    })
  });

  return (
    <div className="container">
      <h2>Register</h2>
      <hr />
      <form className="row">
        <div className="col-6 mt-4">
          <div className="form-group">
          <p>Email</p>
          <input type="text" name='email' placeholder='Email' className='form-control'/>
          </div>
          <div className="form-group">
          <p>Password</p>
          <input type="password" name='password' placeholder='Password' className='form-control'/>
          </div>
          <div className="form-group">
          <p>Password Confirm</p>
          <input type="password" name='passwordConfirm' placeholder='Password Confirm' className='form-control'/>
          </div>
         
        </div>
        <div className="col-6 mt-4">
          <div className="form-group">
          <p>Name</p>
          <input type="text" name='name' placeholder='Email' className='form-control'/>
          </div>
          <div className="form-group">
          <p>Phone</p>
          <input type="text" name='phone' placeholder='Email' className='form-control'/>
          </div>
          <div className="form-group radioGroup">
          <span>Gender</span>
          <input className='radioButton' type="radio" value={true} name='name'/> Male
          <input className='radioButton' type="radio" value={false} name='name'/> Female
          </div>
        <button className='btn btn-success'>Submit</button>
        </div>
      </form>
    </div>
  )
}
