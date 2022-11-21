import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getProductDetailApi } from "../../redux/reducer/shoesReducer";

export default function Detail() {
  const dispatch = useDispatch();
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
                <button className="btn btnQuantity">+</button>
                <span>1</span>
                <button className="btn btnQuantity">-</button>
              </div>
              <button className="add-to-cart-button btn mt-3">
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
              <div className="d-flex mt-2 align-items-center " key={index}>
                <div
                  className="bg-info bg-opacity-25"
                  style={{ width: "52%", height: "100%" }}
                >
                  <img
                    src={prod.image}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    alt="..."
                  />
                </div>
                <div className="content bg-secondary bg-opacity-25 p-2">
                  <h6>{prod.name}</h6>
                  <p>
                    {prod.description.length > 75
                      ? prod.description.substr(0, 75) + "..."
                      : prod.description}
                  </p>
                  <div className="w-100 text-right d-flex align-items-center">
                    <NavLink className="btn btn-dark" to={`/detail/${prod.id}`}>
                      View detail
                    </NavLink>
                    <button className="ms-2 p-2 bg-warning border border-secondary rounded">
                      {prod.price}$
                    </button>
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
