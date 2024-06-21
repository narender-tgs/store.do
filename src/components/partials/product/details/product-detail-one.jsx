import SlideToggle from "react-slide-toggle";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import macbook_img from "../../../../assets/images/products/Laptops/macbook Pro max.jpg";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCartDetails,
  setCartDetails,
} from "../../../../store/cart/cartDetailsSlice";
import { ToastContainer, toast } from "react-toastify";
import ALink from "../../../common/ALink";
import Qty from "../../../common/Qty";
import AddToCartPopup from "../../../features/modals/add-to-cart-popup";
import { getWishListItems, setWishListItems } from "../../../../store/wishlist/wishlist";

const ProductDetailOne = (props) => {
  const [attrs, setAttrs] = useState({ sizes: [], colors: [] });
  const [variant, setVariant] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [updatedWishListItems, setUpdatedWishListItems] = useState([]);
  const cartData = useSelector(getCartDetails);
  const wishListData = useSelector(getWishListItems);
  const [myArray, setMyArray] = useState([]);
  const [optionCombinations, setOptionCombinations] = useState([]);
  const [productData, setProductData] = useState();

  useEffect(() => {
    setProductData(props.product)
  }, [props.product])
  
  useEffect(() => {
    setUpdatedCartItems(cartData?.cartData?.data);
  }, [cartData]);

  useEffect(() => {
    setUpdatedWishListItems(wishListData?.wishListData?.data);
  }, [wishListData]);

  useEffect(() => {
    setOptionCombinations(productData && productData?.options && productData?.options.length > 0 && productData?.options[0]?.options)
  }, [props.product])


  useEffect(() => {
    if (productData?.available_options && productData.available_options.length > 0) {
      const initialSelections = productData.available_options
        .map((option, index) => {
          const firstOption = option?.optionValue?.[0];
          if (firstOption) {
            return {
              itemName: option.option,
              name: firstOption,
              itemIndex: index,
              _id: firstOption?.variant_sf_id,
            };
          }
          return null;
        })
        .filter(Boolean);
      //   console.log('initial selection' , initialSelections);
      setMyArray(initialSelections);
    }
  }, [productData]);

  const findVariation = (itemName, itemIndex) => {
    return (
      Array.isArray(myArray) &&
      myArray.some(
        (option) => option.name === itemName && option.itemIndex === itemIndex,
      )
    );
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (productObj) {
  //         let attributes = productObj?.variants?.reduce((acc, cur) => {
  //             cur.size && !acc.sizes.find(size => size.size === cur.size.size) && acc.sizes.push(cur.size);
  //             cur.color && !acc.colors.find(color => color.name === cur.color.name) && acc.colors.push(cur.color);
  //             return acc;
  //         }, { sizes: [], colors: [] });
  //         setAttrs(attributes);
  //         initState();
  //     }
  // }, [productObj])

  // useEffect(() => {
  //     if (product) {
  //         let priceToggle = document.querySelector(`${parent} .price-toggle`);
  //         let variationToggle = document.querySelector(`${parent} .variation-toggle`);

  //         if (attrs.sizes.length && !size || attrs.colors.length && !color) {
  //             document.querySelector(`${parent} .shopping-cart`) && document.querySelector(`${parent} .shopping-cart`).classList.add('disabled');
  //             document.querySelector(`${parent} .sticky-cart .add-cart`) && document.querySelector(`${parent} .sticky-cart .add-cart`).classList.add('disabled');
  //             priceToggle && (priceToggle.classList.contains('expanded') && priceToggle.click());
  //         } else {
  //             document.querySelector(`${parent} .shopping-cart`) && document.querySelector(`${parent} .shopping-cart`).classList.remove('disabled');
  //             document.querySelector(`${parent} .sticky-cart .add-cart`) && document.querySelector(`${parent} .sticky-cart .add-cart`).classList.remove('disabled');
  //             let index = product.variants.findIndex(item => {
  //                 return !(item.size && item.size.size !== size) && !(item.color && item.color.name !== color);
  //             });
  //             setVariant({ ...product.variants[index], id: index });
  //         }

  //         if (size !== null || color !== null) {
  //             variationToggle && variationToggle.classList.contains('collapsed') && variationToggle.click();
  //         } else {
  //             variationToggle && variationToggle.classList.contains('expanded') && variationToggle.click();
  //         }
  //     }
  // }, [size, color])

  // useEffect(() => {
  //     if (variant && variant.id >= 0) {
  //         let priceToggle = document.querySelector(`${parent} .price-toggle`);
  //         priceToggle && (priceToggle.classList.contains('collapsed') && priceToggle.click());
  //     }
  // }, [variant])

  function isInWishlist() {
    // return productData && props.wishlist.findIndex(item => item.slug === product.slug) > -1;
    // return productData ;
  }

  function findMatchingItem(initialArray, newArray) {
    console.log('intial array , new array', initialArray, newArray);
    // Step 1: Create a string from the initial array
    const searchString = initialArray.map(item => item.name).join(',');

    // Step 2: Split the search string into parts
    const searchParts = searchString.split(',');

    // Step 3: Find the item in the new array where all parts of the search string are included in the name field
    const foundItem = newArray?.find(item => {
      return searchParts.every(part => item.name.includes(part));
    });

    return foundItem;
  }

  function onWishlistClick(e) {
    e.preventDefault();
    dispatch(setWishListItems({ data: [productData] }))
    if (updatedWishListItems && updatedWishListItems.length > 0) {
      let productArray = [...updatedWishListItems, productData];
      dispatch(setWishListItems({ data: productArray }));
    } else {
      let productArray = [productData];
      dispatch(setWishListItems({ data: productArray }));
    }
    // if (!isInWishlist()) {
    //     let target = e.currentTarget;
    //     target.classList.add("load-more-overlay");
    //     target.classList.add("loading");

    //     setTimeout(() => {
    //         target.classList.remove('load-more-overlay');
    //         target.classList.remove('loading');
    //         props.addToWishList(product);
    //     }, 1000);
    // } else {
    //     router.push('/pages/wishlist');
    // }
  }

  const onAddCartClick = (productDetails) => {
    productDetails.qty = 1;
    if (myArray && myArray.length > 0) {
      console.log('my array added product ', myArray);
      const selectedItem = findMatchingItem(myArray, optionCombinations);
      console.log('result', selectedItem, optionCombinations); // Output: undefined (since 'Blue,XL' i

      const products_variant = {
        option_value: selectedItem.name,
        variant_sf_id: selectedItem.variant_sf_id,
        Price: selectedItem.Price
      }

      // const products_variant = myArray.map((pro) => {
      //   return {
      //     // option_name: pro.itemName,
      //     option_value: pro.name,
      //     variant_sf_id: pro._id,
      //     Price: pro.price

      //     // variation:[ {RAM , guid} , {Storage , guid}]
      //   };
      // });

      //  e.preventDefault();
      const productWithVariants = {
        ...productDetails,
        variants: products_variant,
      };
      showToastWithImage();

      if (updatedCartItems && updatedCartItems.length > 0) {
        let productArray = [...updatedCartItems, productWithVariants];
        dispatch(setCartDetails({ data: productArray }));
      } else {
        let productArray = [productWithVariants];
        dispatch(setCartDetails({ data: productArray }));
      }
    } else {
      let productArray = [...updatedCartItems, productDetails];
      dispatch(setCartDetails({ data: productArray }));
      showToastWithImage();
    }
  };
  function detectColor(color) {
    // console.log('color for the vars' , color);
    if (
      color.includes("Color" || "COLOR" || "Shade" || "SHADE") ||
      color === "Shade" ||
      color === "shade" ||
      color === "SHADE"
    ) {
      // console.log('yes true');
      return true;
    }
  }
  function showToastWithImage() {
    const toastContent = () => (
      <div>
        <AddToCartPopup props={productData} />
      </div>
    );

    toast(toastContent);
  }

  function changeQty(value) {
    setQty(value);
  }

  const selectColor = (itemName, name, e, itemIndex, _id) => {
    setMyArray((prevArray) => {
      const existingItem = prevArray.find(
        (item) => item.itemIndex === itemIndex,
      );
      if (existingItem) {
        // Replace the existing object
        return prevArray.map((item) =>
          item.itemIndex === itemIndex
            ? { ...item, itemName, name, itemIndex, _id }
            : item,
        );
      } else {
        // Add a new object
        return [...prevArray, { itemName, name, itemIndex: itemIndex, _id }];
      }
    });
    e.preventDefault();
    setSize(myArray);
  };
  function handleVariationHover(itemName, name, e, itemIndex, _id) {
    // console.log('itemName, name, e, itemIndex, _id' , itemName, name, e, itemIndex, _id);
  }

  // console.log('product variations added to the cart' , myArray);
  const selectVariation = (itemName, name, e, itemIndex, _id) => {
    setMyArray((prevArray) => {
      const existingItem = prevArray.find(
        (item) => item.itemIndex === itemIndex,
      );
      if (existingItem) {
        // Replace the existing object
        return prevArray.map((item) =>
          item.itemIndex === itemIndex
            ? { ...item, itemName, name, itemIndex, _id }
            : item,
        );
      } else {
        // Add a new object
        return [...prevArray, { itemName, name, itemIndex: itemIndex, _id }];
      }
    });
    e.preventDefault();
    setSize(myArray);
  };

  function initState() {
    setSize(null);
    setColor(null);
    setQty(1);
  }

  function clearVariation(e) {
    e.preventDefault();
    initState();
  }

  // function findVariation(itemName) {
  //     console.log("item");
  //     if (myArray.some(obj => obj.name === itemName)) {

  //         return true;
  //     } else {
  //         return false;
  //     }

  // }
  // function checkItem(itemName){
  //     console.log('item name inside check item' ,itemName);
  //     if (preSeletedVarition.some(obj => obj.option_value === itemName)) {
  //         console.log('preselected variaitons ' , preSeletedVarition);
  //         return true;
  //     } else {
  //         return false;
  //     }
  // }

  function isDisabled(type, name, index) {
    if (type === "color" && size) {
      return !productData?.option?.find(
        (variant) => variant.name === size && variant.name === name,
      );
    } else if (type === "size" && color) {
      return !productData?.option?.find(
        (variant) => variant.name === color && variant.name === name,
      );
    }
    return false;
  }

  return (
    <>
      {/* <Helmet>
        <title>Product - {productData?.name}</title>
        <meta
          name={productData?.description}
          content="Explore our wide range of products tailored to suit your needs."
        />
        <meta
          name="keywords"
          content="electronics, apparel, gadgets, books, online shopping"
        />
      </Helmet> */}

      {
        <div className={`product-single-details col-lg-7 col-md-6`}>
          <h2 className="product-title w-100 ls-0">{productData?.name}</h2>
          {/* {
                        isNav ?
                            <ProductNav prev={ prev } next={ next } />
                            : ""
                    } */}

          <div className="ratings-container">
            <div className="product-ratings">
              <span
                className="ratings"
                style={{ width: `${20 * productData?.ratings}%` }}
              ></span>
              {/* <span className="tooltiptext tooltip-top">{ productObj.avgRatings.toFixed(0) }</span> */}
            </div>
          </div>

          <div className="price-box">
            {
              <span className="product-price">
                &#x20B9;{productData?.price}
              </span>
            }
          </div>

          <div className="product-desc" style={{ width: "700px" }}>
            {/* <p>{productData?.description}</p> */}

            <p
              dangerouslySetInnerHTML={{ __html: productData?.description }}
            ></p>
          </div>

          <ul className="single-info-list">
            <li>
              SKU: <strong>{productData?.product_sku}</strong>
            </li>

            {/* <li>
                                    Stock availability: <strong>2,458</strong>
                                </li> */}

            {/* <li>
                            CATEGORY: { product.categories.map( ( item, index ) =>
                            (
                                <React.Fragment key={ `single-cat-${ index }` }>
                                    <strong>
                                        <ALink href={ { pathname: '/shop', query: { category: item.slug } } } className="category">{ item.name }</ALink>
                                    </strong>
                                    { index < product.categories.length - 1 ? ', ' : '' }
                                </React.Fragment>
                            ) )
                            }
                        </li> */}

            {/* {
                            !product.tags == null && product.tags.length > 0 ?
                                <li>
                                    TAGs: { product.tags.map( ( item, index ) =>
                                    (
                                        <React.Fragment key={ `single-cat-${ index }` }>
                                            <strong>
                                                <ALink href={ { pathname: '/shop', query: { tag: item.slug } } } className="category">{ item.name }</ALink>
                                            </strong>
                                            { index < product.tags.length - 1 ? ', ' : '' }
                                        </React.Fragment>
                                    ) )
                                    }
                                </li>
                                : ''
                        } */}
          </ul>

          {productData?.options?.length > 0 ? (
            <div className="product-filters-container">
              {/* {
                                        productObj?.option[1]?.name === 'Mobile Color' ?
                                            <div className="product-single-filter d-flex align-items-center"><label>Color:</label>
                                                <ul className="config-size-list config-color-list config-filter-list">
                                                    {
                                                        productObj?.option[1]?.options?.map((item, index) => (
                                                            // <li key={`filter-color-${index}`} className={`${item.name === color ? 'active' : ''} ${isDisabled('color', item.name) ? 'disabled' : ''}`}>
                                                            <li key={`filter-color-${index}`} className={`${item.name === color ? 'active' : ''} ${isDisabled('color', item.name) ? 'disabled' : ''}`}>
                                                                {
                                                                        <a href="#" className="filter-color border-2"
                                                                            style={{ backgroundColor: item.name }} onClick={(e) => selectColor(item.name, e)}></a>
                                                                }
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            : ''
                                    } */}

              {productData?.available_options?.map((item, index) =>
                detectColor(item.option) ? (
                  <div className="product-single-filter d-flex align-items-center">
                    <label>{item.option}</label>
                    <ul className="config-size-list config-color-list config-filter-list">
                      {item?.optionValue?.map((item1, index2) => (
                        // <li key={`filter-color-${index}`} className={`${item.name === color ? 'active' : ''} ${isDisabled('color', item.name) ? 'disabled' : ''}`}>
                        <li
                          key={`filter-color-${index}`}
                          className={
                            findVariation(item1, index) ? "active" : ""
                          }
                        >
                          {
                            <a
                              href="#"
                              className="filter-color border-2"
                              onMouseEnter={(e) =>
                                handleVariationHover(
                                  item.option,
                                  item1,
                                  e,
                                  index,
                                  item1?.variant_sf_id,
                                )
                              }
                              style={{ backgroundColor: item1 }}
                              onClick={(e) =>
                                selectColor(
                                  item.option,
                                  item1,
                                  e,
                                  index,
                                  item1?.variant_sf_id,
                                )
                              }
                            ></a>
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="product-single-filter d-flex align-items-center">
                    <label>{item.option}</label>
                    <ul className="config-size-list d-inline-block">
                      {item?.optionValue?.map((item1, index1) => (
                        // <li key={`filter-size-${index1}`} className={`${myArray.some(obj => obj.itemName === item1.name) ? 'active' : ''} ${isDisabled(item, item1.name , index) ? 'disabled' : ''}`}>
                        <li
                          key={`filter-size-${index1}`}
                          className={
                            findVariation(item1, index) ? "active" : ""
                          }
                        >
                          {
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                              onClick={(e) =>
                                selectVariation(
                                  item.option,
                                  item1,
                                  e,
                                  index,
                                  item1?.variant_sf_id,
                                )
                              }
                            >
                              {item1}
                            </a>
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}

              {
                <SlideToggle collapsed={true}>
                  {({ onToggle, setCollapsibleElement, toggleState }) => (
                    <>
                      <button
                        className={`d-none variation-toggle ${toggleState.toLowerCase()}`}
                        onClick={onToggle}
                      ></button>
                      <div
                        className="product-single-filter m-0"
                        ref={setCollapsibleElement}
                      >
                        <label></label>
                        <a
                          className="font1 text-uppercase clear-btn"
                          href="#"
                          onClick={clearVariation}
                        >
                          Clear
                        </a>
                      </div>
                    </>
                  )}
                </SlideToggle>
              }
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            {/* {
                                productObj?.variants?.length ?
                                    <SlideToggle collapsed={true}>
                                        {({ onToggle, setCollapsibleElement, toggleState }) => (
                                            <>
                                                <button className={`d-none price-toggle ${toggleState.toLowerCase()}`} onClick={onToggle}></button>
                                                <div className="price-box product-filtered-price m-0" ref={setCollapsibleElement}>
                                                    {
                                                        variant && variant.id >= 0 && (variant.price ? variant.sale_price ?
                                                            <>
                                                                <del className="old-price"><span>${variant.price.toFixed(2)}</span></del>
                                                                <span className="product-price">${variant && variant.sale_price.toFixed(2)}</span>
                                                            </>
                                                            : <span className="product-price">${variant && variant.price.toFixed(2)}</span>
                                                            : <span className="product-stock pb-3 d-block">{productObj.is_out_of_stock ? 'Out of Stock' : `${productObj.stock} in stock`}</span>)
                                                    }

                                                </div>
                                            </>
                                        )}
                                    </SlideToggle>
                                    : ''
                            } */}

            {/* <Qty max={ product.stock } value={ qty } onChangeQty={ changeQty } /> */}
            {/* <Qty max={5} value={ 5 } onChangeQty={ changeQty } /> */}

            {/* <a href="#" className={ `btn btn-dark add-cart shopping-cart mr-2 ${ attrs.sizes.length > 0 || attrs.colors.length > 0 ? 'disabled' : '' }` } title="Add To Cart" onClick={ onAddCartClick }>Add to Cart</a> */}
            <button
              className="btn btn-dark add-cart mr-2"
              title="Add To Cart"
              onClick={() => onAddCartClick(productData)}
            >
              Add to Cart
            </button>
            <a href="#" className={`btn-icon-wish add-wishlist ${isInWishlist() ? 'added-wishlist' : ''}`} onClick={onWishlistClick} title={`${isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist'}`}><i
              className="icon-wishlist-2"></i><span>{isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist'}</span></a>
          </div>

          <hr className="divider mb-0 mt-0" />

          <div className="product-single-share mb-3">
            {/* <label className="sr-only">Share:</label>

                            <div className="social-icons mr-2">
                                <ALink href="#" className="social-icon social-facebook icon-facebook"
                                    title="Facebook"></ALink>
                                <ALink href="#" className="social-icon social-twitter icon-twitter"
                                    title="Twitter"></ALink>
                                <ALink href="#" className="social-icon social-linkedin fab fa-linkedin-in"
                                    title="Linkedin"></ALink>
                                <ALink href="#" className="social-icon social-mail icon-mail-alt"
                                    title="Mail"></ALink>
                            </div> */}
            {/* <a href="#" className={ `btn-icon-wish add-wishlist ${ isInWishlist() ? 'added-wishlist' : '' }` } onClick={ onWishlistClick } title={ `${ isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist' }` }><i
                            className="icon-wishlist-2"></i><span>{ isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist' }</span></a> */}

          </div>
        </div>
      }
    </>
  );
};

// const mapStateToProps = (state) => {
//     return {
//         wishlist: state.wishlist.list ? state.wishlist.list : []
//     }
// }

export default ProductDetailOne;
