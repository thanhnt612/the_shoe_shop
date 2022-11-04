import React from 'react'
import { Formik, Form, Field } from 'formik'

export default function Register() {
  return (
    <div className="container">
      <Formik>
      
        <Form>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Tài Khoản</p>
                <Field type="text" name='name' className='form-control' />
              </div>
              <div className="form-group">
                <p>Tài Khoản</p>
                <Field type="text" name='name' className='form-control' />
              </div>
              <div className="form-group">
                <p>Tài Khoản</p>
                <Field type="text" name='name' className='form-control' />
              </div>
            </div>
            <div className="col-6">

              <div className="form-group">
                <p>Tài Khoản</p>
                <Field type="text" name='name' className='form-control' />
              </div>
              <div className="form-group">
                <p>Tài Khoản</p>
                <Field type="text" name='name' className='form-control' />
              </div>
              <div className="form-group">
                
                <div role="group" aria-labelledby="my-radio-group">
                  <span id="my-radio-group">Gender</span>
                  <label>
                    <Field type="radio" name="picked" value="One" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="picked" value="Two" />
                    Female
                  </label>
                </div>
              </div>
              <button className='btn btn-success' type='submit'>Submit</button>
            </div>

          </div>


        </Form>
      </Formik>
    </div>
  )
}
