import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export default function Profile() {
  const frm = useFormik({
    initialValues: {
      email: "",
      number: "",
      name: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .max(25, "Không vượt quá 25 ký tự")
        .required("Xin mời nhập vào tên !!!"),
      email: yup
        .string()
        .email("Email không đúng định dạng")
        .required("Xin mời nhập vào email !!!"),
      number: yup
        .number()
        .moreThan(98765432, "Số điện thoại bị lỗi")
        .required("Xin mời nhập vào số điện thoại !!!"),
      password: yup.string().required("Xin mời nhập mật khẩu !!!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="profile-page container">
      <div className="title">
        <h3>Profile</h3>
      </div>
      <div className="row">
        <div className="col-3 avatar">
          <img
            src="https://i.pravatar.cc"
            alt="..."
            className="w-100 rounded-circle"
          />
        </div>
        <div className="col-9 info">
          <form onSubmit={frm.handleSubmit}>
            <div className="row form-fill">
              <div className="col-6">
                <div className="form-group">
                  <p>Email</p>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.email ? (
                    <p className="text text-danger">{frm.errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Phone</p>
                  <input
                    className="form-control"
                    id="number"
                    name="number"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.number ? (
                    <p className="text text-danger">{frm.errors.number}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Name</p>
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.name ? (
                    <p className="text text-danger">{frm.errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Password</p>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.password ? (
                    <p className="text text-danger">{frm.errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="update mt-4">
                  <div className="d-flex align-items-center">
                    <span>Gender:</span>
                    <div className="d-flex gender">
                      <input
                        className="size"
                        type="radio"
                        id="male"
                        name="gender"
                        checked
                        value="true"
                      />
                      <label for="male">Male</label>
                      <input
                        className="size"
                        type="radio"
                        id="female"
                        name="gender"
                        value="false"
                      />
                      <label for="female">Female</label>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn mt-4">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
