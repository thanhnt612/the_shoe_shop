import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProductApi } from "../../redux/reducer/shoesReducer";

export default function Home_Mobile() {
  const dispatch = useDispatch();
  const arrProduct = useSelector((state) => state.shoesReducer.arrProduct);
  useEffect(() => {
    const action = getProductApi();
    dispatch(action);
  }, []);

  return (
    <div className="home-page-mobile">
      <div className="container">
        <h3 className="tittle">Product list</h3>
        <div className="product-list">
          {arrProduct.map((prod, index) => {
            return (
              <div className="d-flex mt-2 align-items-center " key={index}>
                <div className="row">
                  <div
                    className="bg-info bg-opacity-25 col-4"
                  >
                    <img
                      src={prod.image}
                      className="w-100"
                      style={{ objectFit: "cover" }}
                      alt="..."
                    />
                  </div>
                  <div className="content bg-secondary bg-opacity-25 p-2 col-8">
                    <h6>{prod.name}</h6>
                    <p>
                      {prod.description.length > 75
                        ? prod.description.substr(0, 75) + "..."
                        : prod.description}
                    </p>
                    <div className="w-100 text-right d-flex align-items-center">
                      <NavLink
                        className="btn btn-dark"
                        to={`/detail/${prod.id}`}
                      >
                        View detail
                      </NavLink>
                      <button className="ms-2 p-2 bg-warning border border-secondary rounded">
                        {prod.price}$
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
