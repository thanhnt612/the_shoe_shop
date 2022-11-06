import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  ascProduct,
  descProduct,
  getSearchProductApi,
} from "../../redux/reducer/shoesReducer";

export default function Search() {
  const keywordRef = useRef("");
  const searchProduct = useSelector(
    (state) => state.shoesReducer.searchProduct
  );
  console.log(searchProduct);
  // const [arrProduct, setArrProduct] = useState([]);
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    const { value } = e.target;
    keywordRef.current = value;
  };
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    console.log(keyword);
    if (keyword) {
      const action = getSearchProductApi(keyword);
      dispatch(action);
      // setArrProduct(search);
    }
  }, [keywordRef.current]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      keyword: keywordRef.current,
    });
  };
  return (
    <div className="search-page">
      <div className="container">
        <h4>Search</h4>
        <form className="form-group" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            id="keywordRef"
            onChange={handleChange}
            placeholder="product name . . ."
          />
          <button className="btn">SEARCH</button>
        </form>
        <div className="result">
          <div className="tittle">
            <h3>Search result</h3>
          </div>
          <div className="list">
            <h4>Price</h4>
            <div className="sort col-2">
              <button
                className="asc mb-3"
                onClick={() => {
                  dispatch(ascProduct(searchProduct));
                }}
              >
                Ascending <i class="fa-solid fa-arrow-down"></i>
              </button>
              <button
                className="desc"
                onClick={() => {
                  dispatch(descProduct(searchProduct));
                }}
              >
                Descending <i class="fa-solid fa-arrow-up"></i>
              </button>
            </div>
            <div className="row">
              {searchProduct.map((proD, index) => {
                return (
                  <div className="col-lg-4 col-md-6">
                    <div className="item">
                      <div className="thumbnail">
                        <div className="heart">
                          <i class="fa-regular fa-heart"></i>
                        </div>
                        <a>
                          <img src={proD.image} alt />
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
    </div>
  );
}
