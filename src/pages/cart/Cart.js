import { useState, useEffect } from "react";
import { connect } from "react-redux";

import ALink from "../../components/common/ALink";
import Qty from "../../components/partials/product/qty";
import { actions as CartAction } from "../../store/cart";
import { getCartTotal } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartDetails,
  setCartDetails,
  removeFromCart,
} from "../../store/cart/cartDetailsSlice";

function Cart(props) {
  const dispatch = useDispatch();
  const cartData = useSelector(getCartDetails);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    setCartList(cartData?.cartData?.data);
  }, [cartData]);
  function removeFromCart(item, index) {
    // Create a new array excluding the item at the specified index
    const updatedCartList = cartList.filter((_, i) => i !== index);
    // Update the state with the new array

    setCartList(updatedCartList);
    dispatch(setCartDetails({ data: updatedCartList }));

    // props.removeFromCart( item );
  }

  function onChangeQty(id, qty) {
    // let newPrice = prices * qty;
    setCartList(
      cartList.map((item, index) => {
        return index === id ? { ...item, qty: qty } : item;
      }),
    );
  }

  // function updateCart () {
  //     dispatch(setCartDetails({data:cartList}))
  //     props.updateCart( cartList );
  // }
  const onClickProceedToCheckout = () => {
    dispatch(setCartDetails({ data: cartList }));
  };

  return (
    <main className="main">
      <div className="container">
        <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
          <li className="active">
            <ALink href="/pages/cart">Shopping Cart</ALink>
          </li>
          <li>
            <ALink>Checkout</ALink>
          </li>
          <li className="disabled">
            <ALink href="#">Order Complete</ALink>
          </li>
        </ul>

        {!cartList || cartList.length === 0 ? (
          <div className="cart-table-container">
            <div className="table table-cart">
              <div className="cart-empty-page text-center">
                <i className="icon-bag-2"></i>
                <p>No products added to the cart</p>
                <ALink
                  href="/shop"
                  className="btn btn-dark btn-add-cart product-type-simple btn-shop font1"
                >
                  return to shop
                </ALink>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-table-container">
                <table className="table table-cart">
                  <thead>
                    <tr>
                      <th className="thumbnail-col"></th>
                      <th className="product-col">Product</th>
                      <th className="product-col">Specifications</th>
                      <th className="price-col">Price</th>
                      <th className="qty-col">Quantity</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList &&
                      cartList.map((item, index) => (
                        <tr key={"cart-item" + index} className="product-row">
                          <td>
                            <figure className="product-image-container">
                              <ALink>
                                <img
                                  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROGswtbi-CqtO_5ecgfl_aVaCERXPu1ESJjA&s"
                                  src={
                                    item?.imageUrls?.length > 0 &&
                                    item?.imageUrls[0]
                                  }
                                  alt="product"
                                />
                              </ALink>

                              <a
                                href="#"
                                className="btn-remove icon-cancel"
                                title="Remove Product"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFromCart(item, index);
                                }}
                              ></a>
                            </figure>
                          </td>

                          <td className="product-col">
                            <h5 className="product-title">
                              <ALink href={`/product/default/${item.slug}`}>
                                {item.name}
                              </ALink>
                            </h5>
                          </td>
                          <td className="">
                            <h5 className="product-title">
                              {item?.variants &&
                              
                                
                                    <span>
                                      {item.variants.option_value}
                                    </span>
                                
                                }
                              {/* {item?.variants && item?.variants.length > 0 &&
                                item?.variants.map((vars, index) => (
                                  <li key={index}>
                                    <span>
                                      {vars.option_value}
                                    </span>
                                  </li>
                                ))} */}
                            </h5>
                          </td>

                          <td>&#x20B9;{item.price.toFixed(2)}</td>

                          <td>
                            <Qty
                              value={item.qty}
                              max={item.stock}
                              onChangeQty={(qty) =>
                                onChangeQty(index, qty, qty * item.price)
                              }
                            />
                          </td>

                          <td className="text-right">
                            <span className="subtotal-price">
                              &#x20B9;{item.price * (item.qty || 1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart-summary">
                {/* <h3>CART TOTALS</h3>

                                    <table className="table table-totals">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>${ getCartTotal( cartList ).toFixed( 2 ) }</td>
                                            </tr>

                                            <tr>
                                                <td colSpan="2" className="text-left">
                                                    <h4>Shipping</h4>

                                                    <div className="form-group form-group-custom-control">
                                                        <div className="custom-control custom-radio">
                                                            <input type="radio" className="custom-control-input" name="radio"
                                                                defaultChecked />
                                                            <label className="custom-control-label">Local pickup</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group form-group-custom-control mb-0">
                                                        <div className="custom-control custom-radio mb-0">
                                                            <input type="radio" name="radio" className="custom-control-input" />
                                                            <label className="custom-control-label">Flat rate</label>
                                                        </div>
                                                    </div>

                                                    <form action="#">
                                                        <div className="form-group form-group-sm">
                                                            <label>Shipping to <strong>NY.</strong></label>
                                                            <div className="select-custom">
                                                                <select className="form-control form-control-sm">
                                                                    <option value="USA">United States (US)</option>
                                                                    <option value="Turkey">Turkey</option>
                                                                    <option value="China">China</option>
                                                                    <option value="Germany">Germany</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group form-group-sm">
                                                            <div className="select-custom">
                                                                <select className="form-control form-control-sm">
                                                                    <option value="NY">New York</option>
                                                                    <option value="CA">California</option>
                                                                    <option value="TX">Texas</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group form-group-sm">
                                                            <input type="text" className="form-control form-control-sm"
                                                                placeholder="Town / City" required />
                                                        </div>

                                                        <div className="form-group form-group-sm">
                                                            <input type="text" className="form-control form-control-sm"
                                                                placeholder="ZIP" required />
                                                        </div>

                                                        <button type="submit" className="btn btn-shop btn-update-total">
                                                            Update Totals
                                                    </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td>Total</td>
                                                <td>${ getCartTotal( cartList ) }</td>
                                            </tr>
                                        </tfoot>
                                    </table> */}

                <div className="checkout-methods">
                  <ALink
                    href="/pages/checkout"
                    onClick={() => {
                      onClickProceedToCheckout();
                    }}
                    className="btn btn-block btn-dark"
                  >
                    Proceed to Cart
                    <i className="fa fa-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6"></div>
    </main>
  );
}

// const mapStateToProps = ( state ) => {
//     return {
//         cart: state.cartlist.cart ? state.cartlist.cart : []
//     }
// }

export default Cart;
