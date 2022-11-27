import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  addNewProductAction,
  addNewProductApi,
} from "../../redux/reducer/cartReducer";
import {
  getProductApi,
  getProductDetailApi,
} from "../../redux/reducer/shoesReducer";

export default function Detail() {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.shoesReducer);
  const arrProduct = useSelector((state) => state.shoesReducer.arrProduct);
  useEffect(() => {
    const action = getProductDetailApi(id);
    dispatch(action);
  }, [id]);
  return (
    <>
      <div className="container mt-5 productDetail">
        <div className="row">
          <div className="col-4">
            <img src={productDetail.image} alt="detail" className="w-100" />
          </div>
          <div className="col-8">
            <h1>{productDetail.name}</h1>
            <p>{productDetail.description}</p>
            <h5>Available size</h5>
            {productDetail.size?.map((size, index) => {
              return (
                <button className="btn btnSize mt-3 mb-2" key={index}>
                  {size}
                </button>
              );
            })}

            <div className="add-to-cart">
              <div className="quantity mt-3">
                <button
                  className="btn btnQuantity"
                  onClick={() => {
                    setNumber(number + 1);
                  }}
                >
                  +
                </button>
                <span>{number}</span>
                <button
                  className="btn btnQuantity"
                  onClick={() => {
                    if (number > 1) {
                      setNumber(number - 1);
                    } else {
                      return number;
                    }
                  }}
                >
                  -
                </button>
              </div>

              <button
                className="add-to-cart-button btn mt-3"
                onClick={() => {
                  const itemCart = { ...productDetail, quantity: number };
                  console.log("itemCart: ", itemCart);
                  const action = addNewProductAction(itemCart);
                  dispatch(action);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 productRelated">
        <h3 className="mt-3 mb-5 text-center">- Related Products -</h3>
        <div className="row">
          {productDetail.relatedProducts?.map((prod, index) => {
            return (
              <div
                className="col-12 col-lg-6 col-xl-4 d-flex flex-column justify-content-between"
                key={index}
              >
                <img
                  src={prod.image}
                  alt="related-product"
                  className="w-100 bg-light"
                />

                <h1>{prod.name}</h1>
                <p>{prod.description}</p>

                <div className="button d-flex justify-content-center">
                  <div>
                    <NavLink to={`/detail/${prod.id}`}>
                      <button className="btnBuy">Buy now</button>
                    </NavLink>
                  </div>
                  <div>
                    <button className=" btnPrice">{prod.price}$</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
