import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import LoginFacebook from "../../Component/LoginFacebook/LoginFacebook";
import { loginApi } from "../../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email không đúng định dạng !"),
    }),
    onSubmit: (login) => {
      console.log(login);
      const action = loginApi(login);
      dispatch(action);
      navigate("/home");
    },
  });

  return (
    <form className="login" onSubmit={frm.handleSubmit}>
      <div className="container">
        <h2>Login</h2>
        <hr />
        <div className="form-group">
          <p>Email</p>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            onChange={frm.handleChange}
          />
          {frm.errors.email ? (
            <p className="text-danger">{frm.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            id="name"
            name="password"
            className="form-control"
            onChange={frm.handleChange}
          />
        </div>
        <div className="form-group register-form text-end">
          <button className="btn btn-success" type="submit">
            Login
          </button>
          <div>
            <NavLink to={"/register"}>Register now ?</NavLink>
          </div>
        </div>
        {/* <LoginFacebook /> */}
      </div>
    </form>
  );
}
