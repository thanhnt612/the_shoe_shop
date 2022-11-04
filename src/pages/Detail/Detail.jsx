import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProductApi, getProductDetailApi } from '../../redux/reducer/shoesReducer';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetail } = useSelector(
    (state) => state.shoesReducer
  );
  const arrProduct = useSelector((state) => state.shoesReducer.arrProduct);
  useEffect(() => {
    const action = getProductDetailApi(id);
    dispatch(action);
  }, [id]);
  console.log(productDetail)
  return (
    <>
      <div className="container mt-5 productDetail">
        <div className="row">
          <div className="col-4">
            <img src={productDetail.image} alt="detail" className='w-100' />
          </div>
          <div className="col-8">
            <h1>{productDetail.name}</h1>
            <p>{productDetail.description}</p>
            <h5>Available size</h5>
            {productDetail.size?.map((size, index) => {
              return <button className='btn btnSize mt-3 mb-2'>{size}</button>
            })}

            <div className="add-to-cart">
              <div className="quantity mt-3">
                <button className='btn btnQuantity'>+</button>
                <span>1</span>
                <button className='btn btnQuantity'>-</button>
              </div>
              <button className='add-to-cart-button btn mt-3'>Add to cart</button>
            </div>

          </div>
        </div>
      </div>

      <div className="container mb-5 productRelated">
        <h3 className='mt-3 mb-5 text-center'>- Related Products -</h3>
        <div className="row">
          {productDetail.relatedProducts?.map((prod, index) => {
            return <div className="col-4 d-flex flex-column justify-content-between" key={index}>

              <img src={prod.image} alt="related-product" className='w-100 bg-light' />

              <h1>{prod.name}</h1>
              <p>{prod.description}</p>

              <div className="button d-flex justify-content-center">
                <div>
                <NavLink to={`/detail/${prod.id}`}>
                    <button className="btnBuy">Buy now</button>
                    </NavLink>
                </div>
                <div>
                <button className=' btnPrice'>85$</button>
                </div>
              </div>


            </div>
          })}

        </div>
      </div>
    </>
  )
}
