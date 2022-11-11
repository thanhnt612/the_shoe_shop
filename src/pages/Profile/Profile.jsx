import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getProfileApi } from "../../redux/reducer/userReducer";
export default function Profile() {
  const frm = useFormik({
    initialValues: {
      email: "",
      number: "",
      name: "",
      password: "",
      gender: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Xin mời nhập vào tên !!!"),
      email: yup
        .string()
        .email("Email không đúng định dạng")
        .required("Xin mời nhập vào email !!!"),
      number: yup
        .number()
        .typeError("Xin hãy nhập vào ký tự là số")
        .required("Xin mời nhập vào số điện thoại !!!"),
      password: yup.string().required("Xin mời nhập mật khẩu !!!"),
    }),
    onSubmit: (values) => {
      if (values.gender === "true") {
        values.gender = true;
      } else {
        values.gender = false;
      }
      console.log(values);
    },
  });
  const {userProfile} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    //Gọi api get profile
    const action = getProfileApi();
    dispatch(action);
    //
  },[]);
  return (
    <div className="profile-page">
      <div className="my-3 col-6 title">
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
                        name="gender"
                        value={true}
                        onChange={frm.handleChange}
                      />
                      <label for="">Male</label>
                      <input
                        className="size"
                        type="radio"
                        name="gender"
                        value={false}
                        onChange={frm.handleChange}
                      />
                      <label for="">Female</label>
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
      <div className="order">
        <div className="title-order d-flex my-3">
          <h3>Order History</h3>
          {/* <h3 className="text-dark ms-4">Favorite</h3> */}
        </div>
        <div className="buying-history my-3">
          <span>+ Order have been placed on 10 - 11 - 2022</span>
        </div>
        <table className="table text-center border">
          <thead>
            <tr>
              <td>id</td>
              <td>img</td>
              <td>name</td>
              <td>price</td>
              <td>quantity</td>
              <td>total</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img
                  src="https://picsum.photos/300/300"
                  alt="..."
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>Product 1</td>
              <td>1000</td>
              <td>1</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img
                  src="https://picsum.photos/200/200"
                  alt="..."
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>Product 2</td>
              <td>1000</td>
              <td>1</td>
              <td>1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
