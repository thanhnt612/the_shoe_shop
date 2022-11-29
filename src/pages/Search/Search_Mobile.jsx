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
    <div className="search-page-mobile">
      <div className="container">
        <h4>Search</h4>
        <form className="form-group" onSubmit={handleSubmit}>
          <input
            className="form-control w-100"
            type="text"
            id="keywordRef"
            onChange={handleChange}
            placeholder="product name . . ."
          />
          <button className="btn">Search</button>
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
              {searchProduct.map((prod, index) => {
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
        </div>
      </div>
    </div>
  );
}
