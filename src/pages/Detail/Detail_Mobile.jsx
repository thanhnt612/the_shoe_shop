import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addNewProductAction } from "../../redux/reducer/cartReducer";
import { getProductDetailApi } from "../../redux/reducer/shoesReducer";

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
  console.log(productDetail);
  return (
    <>
      <div className="container mt-5 productDetail">
        <div className="row">
          <div className="col-4  bg-success bg-opacity-25">
            <img src={productDetail.image} alt="detail" className=" w-100" />
          </div>
          <div className="col-8 p-3 bg-secondary bg-opacity-25">
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
        <h3 className="tittle m-3 text-center">- Related Products -</h3>
        <div className="row">
          {productDetail.relatedProducts?.map((prod, index) => {
            return (
              <div className="d-flex mt-2 align-items-center " key={index}>
                <div className="row">
                  <div className="bg-info bg-opacity-25 col-4">
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
    </>
  );
}
