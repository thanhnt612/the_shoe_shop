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
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getProfileApi();
    dispatch(action);
  }, []);
  return (
    <div className="container cart">
      <h3>Cart</h3>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>id</th>
            <th>img</th>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
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
                    <button className="btn btn-primary btnEdit">EDIT</button>
                    <button
                      className="btn btn-danger btnDelete"
                      onClick={() => {
                        const action = deleteProductAction(item.id);
                        dispatch(action);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="btn btn-warning btnSubmitCart"
        onClick={() => {
          const action = orderProductApi();
          dispatch(action);
        }}
      >
        SUBMIT ORDER
      </button>
    </div>
  );
}
