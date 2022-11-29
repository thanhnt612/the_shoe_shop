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
    <div className="cart-mobile">
      <div className="container">
        <h3>Cart</h3>
        <hr />
        <table className="table border border-dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
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
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-12">
                        <button
                          className="btn btn-success btnQuantity"
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
                      </div>
                      <div className="col-12">{item.quantity}</div>
                      <div className="col-12">
                        <button
                          className="btn btn-success btnQuantity"
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
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity * item.price}$</td>
                  <td>
                    <button
                      className="btn btn-danger btnDelete mb-2"
                      onClick={() => {
                        //Xóa đơn hàng
                        const action = deleteProductAction(item.id);
                        dispatch(action);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btnSubmitCart text-center"
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
                      <i class="fa-solid fa-arrow-right"></i>Order
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
