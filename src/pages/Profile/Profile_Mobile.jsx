import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducer/userReducer";
export default function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getProfileApi();
    dispatch(action);
  }, []);
  const { userProfile } = useSelector((state) => state.userReducer);
  console.log(userProfile);
  const frm = useFormik({
    initialValues: {
      email: userProfile.email,
      phone: userProfile.phone,
      name: userProfile.name,
      password: userProfile.password,
      gender: userProfile.gender,
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
    }),
    onSubmit: (update) => {
      if (update.gender === "male") {
        update.gender = true;
      } else {
        update.gender = false;
      }
      //Gửi thông tin cập nhật sau khi submit
      const action = updateProfileApi(update);
      dispatch(action);
    },
  });
  return (
    <div className="profile-page-mobile">
      <div className="my-3 rounded title">
        <h3>Profile</h3>
      </div>
      <div className="row">
        <div className="col-12 avatar">
          <img
            src="https://i.pravatar.cc"
            alt="..."
            className=" rounded-circle"
          />
        </div>
        <div className="info">
          <form onSubmit={frm.handleSubmit}>
            <div className="row form-fill">
              <div className="form-group">
                <p>Email</p>
                <input
                  className="form-control"
                  name="email"
                  value={frm.values.email} //Email chỉ hiện thị, không thay đổi được
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
                  name="phone"
                  value={frm.values.phone}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.phone ? (
                  <p className="text text-danger">{frm.errors.phone}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <p>Name</p>
                <input
                  className="form-control"
                  name="name"
                  value={frm.values.name}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.name ? (
                  <p className="text text-danger">{frm.errors.name}</p>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="form-group">
                <p>Password</p>
                <input
                  className="form-control"
                  name="password" 
                  //Password chỉ hiện thị, không thay đổi được
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
              </div> */}
              <div className="update mt-4">
                <div className="d-flex align-items-center">
                  <span>Gender:</span>
                  <div className="d-flex gender">
                    <input
                      className="size"
                      type="radio"
                      name="gender"
                      checked={
                        (frm.values.gender === true) |
                        (frm.values.gender === "male")
                          ? true
                          : ""
                      }
                      value="male"
                      onChange={frm.handleChange}
                    />
                    <label for="">Male</label>
                    <input
                      className="size"
                      type="radio"
                      name="gender"
                      checked={
                        (frm.values.gender === false) |
                        (frm.values.gender === "female")
                          ? true
                          : ""
                      }
                      value="female"
                      onChange={frm.handleChange}
                    />
                    <label for="">Female</label>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn mt-4">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="order">
        <div className="title-order d-flex my-3">
          <h3>Order History</h3>
        </div>
        {userProfile.ordersHistory.map((info, index) => {
          return (
            <>
              <div className="buying-history my-3">
                <span>+ Order have been placed on {info.date}</span>
              </div>
              <table className="table text-center border">
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Picture</td>
                    <td>Name</td>
                    <td>Cost</td>
                    <td>quantity</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{info.id}</td>
                    {info.orderDetail.map((item, index) => {
                      return (
                        <>
                          <td>
                            <img
                              src={item.image}
                              alt="..."
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}$</td>
                          <td>{item.quantity}</td>
                          <td>
                            {(item.quantity * item.price).toLocaleString()}$
                          </td>
                        </>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </>
          );
        })}
      </div>
    </div>
  );
}
