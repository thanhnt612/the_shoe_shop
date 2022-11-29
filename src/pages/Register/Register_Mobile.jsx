import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { registerApi } from "../../redux/reducer/userReducer";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const frm = useFormik({
    initialValues: {
      email: "",
      phone: "",
      name: "",
      password: "",
      passwordConfirm: "",
      gender: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Xin mời nhập vào tên !!!"),
      email: yup
        .string()
        .email("Email không đúng định dạng")
        .required("Xin mời nhập vào email !!!"),
      phone: yup
        .number()
        .typeError("Xin hãy nhập vào ký tự là số")
        .required("Xin mời nhập vào số điện thoại !!!"),
      password: yup.string().required("Xin mời nhập mật khẩu !!!"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu chưa khớp"),
    }),
    onSubmit: (register) => {
      if (register.gender === "true") {
        register.gender = true;
      } else {
        register.gender = false;
      }
      //Gửi thông tin đăng ký sau khi submit
      const action = registerApi(register);
      dispatch(action);
      navigate("/login");
    },
  });
  return (
    <div className="container">
      <h2>Register</h2>
      <hr />
      <form className="row" onSubmit={frm.handleSubmit}>
        <div className="col-12">
          <div className="form-group">
            <p>Email</p>
            <input
              id="email"
              name="email"
              placeholder="Email"
              className="form-control"
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
            <p>Password</p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.password ? (
              <p className="text text-danger">{frm.errors.password}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <p>Password Confirm</p>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Password Confirm"
              className="form-control"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.passwordConfirm ? (
              <p className="text text-danger">{frm.errors.passwordConfirm}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <p>Name</p>
            <input
              name="name"
              placeholder="name"
              className="form-control"
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
            <p>Phone</p>
            <input
              name="phone"
              placeholder="phone"
              className="form-control"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.phone ? (
              <p className="text text-danger">{frm.errors.phone}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group radioGroup">
            <span>Gender:</span>
            <input
              className="radioButton"
              type="radio"
              value="true"
              name="gender"
              onChange={frm.handleChange}
            />
            <label for="">Male</label>
            <input
              className="radioButton"
              type="radio"
              value="false"
              name="gender"
              onChange={frm.handleChange}
            />
            <label for="">Female</label>
          </div>
          <div className="btn-submit">
            <button type="submit" className="btn mt-4">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
