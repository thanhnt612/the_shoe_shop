import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityAction,
  deleteProductAction,
  orderProductApi,
} from "../../redux/reducer/cartReducer";
import { getProfileApi } from "../../redux/reducer/userReducer";

export default function Cart() {
  const { cart } = useSelector((state) => state.cartReducer);
  const { userProfile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getProfileApi();
    dispatch(action);
  }, []);
  return (
    <div className="container cart">
      <h3>Cart</h3>
      <hr />
      <table className="table border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        {cart.map((item, index) => {
          return (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>
                  <img
                    src={item.image}
                    alt="..."
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}$</td>
                <td>
                  <button
                    className="btn btn-success btnQuantity me-2"
                    onClick={() => {
                      //Tăng số đơn hàng
                      const action = changeQuantityAction({
                        id: item.id,
                        quantity: 1,
                      });
                      dispatch(action);
                    }}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-success btnQuantity ms-2"
                    onClick={() => {
                      //Giảm số đơn hàng
                      const action = changeQuantityAction({
                        id: item.id,
                        quantity: -1,
                      });
                      dispatch(action);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>{item.quantity * item.price}$</td>
                <td>
                  <div className="btnGroup d-flex justify-content-center">
                    <button
                      className="btn btn-danger btnDelete"
                      onClick={() => {
                        //Xóa đơn hàng
                        const action = deleteProductAction(item.id);
                        dispatch(action);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning btnSubmitCart"
                    onClick={() => {
                      //Thêm chức năng đặt hàng
                      const action = orderProductApi(
                        item.id,
                        item.quantity,
                        userProfile.email
                      );
                      dispatch(action);
                      //Đặt hàng xong thì xóa đi
                      const actionDel = deleteProductAction(item.id);
                      dispatch(actionDel);
                    }}
                  >
                    SUBMIT ORDER
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
