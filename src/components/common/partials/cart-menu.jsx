import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { useRouter } from "next/router";

// Import Actions
import { actions as CartAction } from "../../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartDetails,
  setCartDetails,
} from "../../../store/cart/cartDetailsSlice";
// Import Custom Component
import ALink from "../ALink";
import cycle1 from "../../../assets/images/cycle1.jpg";
import cycle2 from "../../../assets/images/cycle2.jpg";
// Import Utils
import { getCartTotal } from "../../../utils";

import { Link } from "react-router-dom";
// import { current } from "@reduxjs/toolkit";

function CartMenu(props) {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  // let cartItems = [];
  const cartData = useSelector(getCartDetails);
  useEffect(() => {
    // Check if cartData.cartData.data exists and is an array
    if (cartData?.cartData?.data && Array.isArray(cartData.cartData.data)) {
      // Update cartItems state with the new data
      setCartItems(cartData.cartData.data);
    }
  }, [cartData]); // Depend on cartData to re-run this effect when cartData changes

  // const cartItems = cartData.cartData.data;
  // cartItems.push(cartData?.cartData?.data[0])
  // setCartItems(...cartData?.cartData?.data[0]);

  // const cartItems = [
  //     {
  //       srcs: cycle1,
  //       name: "Ultra HD Smart TV",
  //       categories: ["Electronics", "Home Entertainment"],
  //       price: [6786],
  //       slug: "ultra-hd-smart-tv",
  //       ratings: 4.8,
  //       is_hot: true,
  //       variants:['Blue','Black']
  //     },
  //     {
  //       srcs: cycle2,
  //       name: "Eco-Friendly Yoga Mat",
  //       categories: ["Fitness", "Yoga"],
  //       price: [34],
  //       slug: "eco-friendly-yoga-mat",
  //       ratings: 4.6,
  //       is_hot: false,
  //       variants:[]
  //     },

  //   ];
  // const { cartItems } = props;
  // const router = useRouter();

  // useEffect( () => {
  //     router.events.on( 'routeChangeStart', cartClose );

  //     return () => {
  //         router.events.off( 'routeChangeStart', cartClose );
  //     }
  // }, [] )

  function toggleCart(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("cart-opened");
  }

  function cartClose() {
    document.querySelector("body").classList.contains("cart-opened") &&
      document.querySelector("body").classList.remove("cart-opened");
  }

  function getQtyTotal(items) {
    let total = 0;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        total += parseInt(1, 10);
      }
    }
    return total;
  }

  function removeFromCart(e, cart, index) {
    e.preventDefault();
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
    dispatch(setCartDetails(updatedCartItems));

    // props.removeFromCart( cart );
  }
  const onclickCheckout = () => {
    cartClose();
  };

  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        title="Cart"
        className="dropdown-toggle cart-toggle"
        onClick={toggleCart}
      >
        <i className="minicart-icon"></i>
        <span className="cart-count badge-circle">
          {getQtyTotal(cartItems)}
        </span>
      </a>

      <div className="cart-overlay" onClick={cartClose}></div>

      <div className="dropdown-menu mobile-cart">
        <a
          href="#"
          title="Close (Esc)"
          className="btn-close"
          onClick={(e) => {
            cartClose();
            e.preventDefault();
          }}
        >
          ×
        </a>

        <div className="dropdownmenu-wrapper">
          <div className="dropdown-cart-header">Shopping Cart</div>

          {cartItems?.length > 0 ? (
            <>
              <div className="dropdown-cart-products">
                {cartItems.map((cart, index) => (
                  <div className="product" key={"cartItems" + index}>
                    <div className="product-details">
                      <h2 className="product-title">
                        {cart?.index > -1 ? (
                          !cart.variants[cart.index].color ? (
                            <ALink href={`/product/default/${cart.slug}`}>
                              {cart.name +
                                " - " +
                                cart.variants[cart.index].size.name}
                            </ALink>
                          ) : !cart.variants[cart.index].size ? (
                            <ALink href={`/product/default/${cart.slug}`}>
                              {cart.name +
                                " - " +
                                cart.variants[cart.index].color.name}
                            </ALink>
                          ) : (
                            <ALink href={`/product/default/${cart.slug}`}>
                              {cart.name +
                                " - " +
                                cart.variants[cart.index].color.name +
                                ", " +
                                cart.variants[cart.index].size.name}
                            </ALink>
                          )
                        ) : (
                          <ALink href={`/product/default/${cart?.slug}`}>
                            {cart?.name}
                          </ALink>
                        )}
                      </h2>

                      <span className="cart-product-info">
                        <span className="cart-product-qty">{cart?.qty}</span> ×
                        &#x20B9;{cart?.price}
                      </span>
                    </div>

                    <figure className="product-image-container">
                      <ALink
                        href={`/product/default/${cart?.slug}`}
                        className="product-image"
                      >
                        <img
                          src={
                            cart &&
                            cart?.imageUrls &&
                            cart?.imageUrls.length > 0 &&
                            cart?.imageUrls[0]
                          }
                          width="78"
                          height="78"
                          alt="product"
                        />
                      </ALink>
                      <a href="#" className="btn-remove icon-cancel" title="Remove Product" onClick={e => { removeFromCart(e, cart, index); }}></a>
                    </figure>
                  </div>
                ))}
              </div>

              <div className="dropdown-cart-total">
                <span>SUBTOTAL:</span>

                <span className="cart-total-price float-right">
                  &#x20B9;{getCartTotal(cartItems)}
                </span>
              </div>

              <div className="dropdown-cart-action">
                {/* <ALink href="/pages/cart" className="btn btn-gray btn-block view-cart">View Cart</ALink> */}
                <Link
                  to="/pages/cart"
                  onClick={(e) => {
                    onclickCheckout();
                  }}
                  className="btn btn-dark btn-block text-white"
                >
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <p className="pt-3 mt-2">No products in the cart.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartItems: state.cartlist.cart ? state.cartlist.cart : [],
  };
}

export default CartMenu;
