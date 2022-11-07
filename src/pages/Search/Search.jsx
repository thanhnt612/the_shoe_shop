import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  getSearchProductApi,
  sortProduct,
} from "../../redux/reducer/shoesReducer";

export default function Search() {
  const keywordRef = useRef("");
  const searchProduct = useSelector(
    (state) => state.shoesReducer.searchProduct
  );
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    const { value } = e.target;
    keywordRef.current = value;
  };
  //Lấy giá trị để set tăng giảm Product
  const handleOnChange = (e) => {
    const { value } = e.target;
    const action = sortProduct(value);
    dispatch(action);
  };
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    console.log(keyword);
    if (keyword) {
      const action = getSearchProductApi(keyword);
      dispatch(action);
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
            <h4>
              Price <i class="fa-solid fa-arrow-down-up-across-line"></i>
            </h4>

            <div className="sort col-2">
              <select onChange={handleOnChange}>
                <option value="ascending">Ascending </option>
                <option value="descending">Descending</option>
              </select>
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
