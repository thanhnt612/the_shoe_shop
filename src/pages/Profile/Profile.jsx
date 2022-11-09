import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
export default function Profile() {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      email: "",
      phone: "",
      name: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email không đúng định dạng !"),
      phone: yup.string().phone("Phải nhập số !"),
      name: yup.string().phone("Phải nhập là chữ"),
      password: yup.string().phone("Phải nhập số !"),
    }),
    onSubmit: (values) => {
      // const action = loginApi(values);
      // console.log(values);
      // dispatch(action);
    },
  });
  return (
    <div className="container">
      <h3>Profile</h3>
      <div className="row">
        <div className="col-4">
          <img
            src="https://i.pravatar.cc"
            style={{ height: 250 }}
            alt="..."
            className="w-100"
          />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Email</p>
                <input className="form-control" name={"email"} />
              </div>
              <div className="form-group">
                <p>Phone</p>
                <input className="form-control" name={"Phone"} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Name</p>
                <input className="form-control" name={"Name"} />
              </div>
              <div className="form-group">
                <p>Password</p>
                <input className="form-control" name={"Password"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
