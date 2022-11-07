import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProductApi } from "../../redux/reducer/shoesReducer";

export default function Home() {
  const dispatch = useDispatch();
  const arrProductDefault = useSelector(
    (state) => state.shoesReducer.arrProductDefault
  );
  const arrProduct = useSelector((state) => state.shoesReducer.arrProduct);
  useEffect(() => {
    const action = getProductApi();
    dispatch(action);
  }, []);
  return (
    <div className="home-page">
      <div className="carousel">
        <div className="container">
          {arrProductDefault.map((prod, index) => {
            return (
              <div className="row" key={index}>
                <div className="content-left col-7">
                  <img src={prod.image} alt="content" />
                </div>
                <div className="content-right col-5">
                  <div className="detail">
                    <h3>{prod.name}</h3>
                    <h4>{prod.description}</h4>
                    <NavLink to={`/detail/${prod.id}`}>
                    <button className="btn">Buy now</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="slide">
        <div className="slider-left"></div>
        <div className="slide-right"></div>
      </div>
      <div className="product">
        <div className="container">
          <div className="col-5 tittle">
            <h3>Product Feature</h3>
          </div>
          <div className="row">
            {arrProduct.map((proD, index) => {
              return (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="item">
                    <div className="thumbnail">
                      <div className="heart">
                        <i className="fa-regular fa-heart" />

                      </div>
                      <a>
                        <img src={proD.image} alt='...' />
                      </a>
                    </div>
                    <div className="detail">
                      <h3>{proD.name}</h3>
                      <p>{proD.shortDescription}</p>
                    </div>
                  </div>
                  <div className="price">
                    <div className="col-6 buy">
                    <NavLink to={`/detail/${proD.id}`}>
                    <button className="btn">Buy now</button>
                    </NavLink>
                    </div>
                    <div className="col-6 cost">
                      <p>${proD.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
