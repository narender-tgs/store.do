import SlideToggle from 'react-slide-toggle';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import macbook_img from '../../assets/images/products/Laptops/macbook Pro max.jpg'
import { Link, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { getca , setCartDetails} from '../../../store/cart/cartDetailsSlice';
import { getCartDetails , setCartDetails } from '../../store/cart/cartDetailsSlice';
import {  ToastContainer , toast} from 'react-toastify';
import ProductMediaOne from '../../components/partials/product/media/product-media-one';
// Import Actions
// import { actions as WishlistAction } from "../../../../store/wishlist";
// import { actions as CartAction } from "../../../../store/cart";

// Import Custom Component
// import ProductNav from '../product-nav';
// import Qty from '../qty';
// import ALink from '../../../common/ALink';
import ALink from '../../components/common/ALink';
import Qty from '../../components/common/Qty';
import AddToCartPopup from '../../components/features/modals/add-to-cart-popup';
// import ProductCountdown from '../../../features/product-countdown';
// import ProductCountdown from '../../components/features/product-countdown';

const ProductDetails=() =>{
    const location = useLocation();
    const dataReceived = location;
    const productObj = dataReceived?.state;
    console.log("product obj " , productObj);
    // {
    // //   srcs: cycle1,
    //   name: "Apple Macbook Pro 15",
    //   categories: ["Electronics", "Home Entertainment"],
    //   price: [678644,3453],
    //   slug: "ultra-hd-smart-tv",
    //   ratings: 4.8,
    //   is_hot: true,
    //   variants:[],
    //   qty:1,
    //   short_description:"An ultra-soft cleansing brush that uses nylon bristles to gently sweep away impurities and stimulate lymphatic flow for a smooth, radiant complexion."
    // };
    const router = useRouter();
    // const { product, adClass = "col-lg-7 col-md-6", prev, next, isNav = true, parent = ".product-single-default", isSticky = false } = productObj;
    const [attrs, setAttrs] = useState({ sizes: [], colors: [] });
    const [variant, setVariant] = useState(null);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);
    const [qty, setQty] = useState(1);

    const [updatedCartItems , setUpdatedCartItems]= useState([]);
    const cartData = useSelector(getCartDetails);
    const [myArray, setMyArray] = useState([]);

    // const myArray =[];
    useEffect(() => {
        setUpdatedCartItems(cartData?.cartData?.data)
    }, [cartData])
    // useEffect(() => {
    //     toast( <CartPopup/> );
    // }, [])
    
    
    
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

    // function isInWishlist() {
    //     return product && props.wishlist.findIndex(item => item.slug === product.slug) > -1;
    // }

    // function onWishlistClick(e) {
    //     e.preventDefault();
    //     if (!isInWishlist()) {
    //         let target = e.currentTarget;
    //         target.classList.add("load-more-overlay");
    //         target.classList.add("loading");

    //         setTimeout(() => {
    //             target.classList.remove('load-more-overlay');
    //             target.classList.remove('loading');
    //             props.addToWishList(product);
    //         }, 1000);
    //     } else {
    //         router.push('/pages/wishlist');
    //     }
    // }

    const onAddCartClick=(productDetails) =>{
        productDetails.qty = 1;
        if(myArray && myArray.length > 0){
            const products_variant =  myArray.map((pro)=>{
                return {
                    option_name: pro.itemName,
                    option_value: pro.name,
                    variant_sf_id: pro._id,
                
                   // variation:[ {RAM , guid} , {Storage , guid}]
    
                }
            })
            //  e.preventDefault();
            const productWithVariants = {
                ...productDetails,
                variants: products_variant
            };
            showToastWithImage()
           
            
            if(updatedCartItems && updatedCartItems.length > 0){
                let productArray=[...updatedCartItems , productWithVariants]
                dispatch(setCartDetails({data:productArray}))
            }else{
                let productArray=[ productWithVariants]
                dispatch(setCartDetails({data:productArray}))
            }
    
        }else{
            let productArray=[...updatedCartItems , productDetails]
            dispatch(setCartDetails({data:productArray}))
            showToastWithImage()
        }
       
   
    }
    function detectColor(color){
         if(color.includes('Color' || 'COLOR')){
             return true;
         }
    }
    function showToastWithImage() {
        const toastContent = () => (
          <div>
           
            <AddToCartPopup props={productObj}/>
    
          </div>
        );
      
        toast(toastContent);
      }
      

    function changeQty(value) {
        setQty(value);
    }

    const selectColor=(itemName, name, e, itemIndex ,_id) =>{
        setMyArray(prevArray => {
            const existingItem = prevArray.find(item => item.itemIndex === itemIndex);
            if (existingItem) {
                // Replace the existing object
                return prevArray.map(item =>
                    item.itemIndex === itemIndex ? { ...item, itemName, name, itemIndex , _id} : item
                );
            } else {
                // Add a new object
                return [...prevArray, { itemName, name, itemIndex: itemIndex ,_id }];
            }
        });
        e.preventDefault();
        setSize(myArray);
    }

    const selectVariation = (itemName, name, e, itemIndex ,_id) => {
        setMyArray(prevArray => {
            const existingItem = prevArray.find(item => item.itemIndex === itemIndex);
            if (existingItem) {
                // Replace the existing object
                return prevArray.map(item =>
                    item.itemIndex === itemIndex ? { ...item, itemName, name, itemIndex , _id } : item
                );
            } else {
                // Add a new object
                return [...prevArray, { itemName, name, itemIndex: itemIndex ,_id }];
            }
        });
        e.preventDefault();
        setSize(myArray);
    }


    function initState() {
        setSize(null);
        setColor(null);
        setQty(1);
    }

    function clearVariation(e) {
        e.preventDefault();
        initState();
    }

    function findVariation(itemName){
        console.log("item");
        if( myArray.some(obj => obj.name === itemName)){
            
            return true;
        }else{
            return false;
        }
        
    }

    function isDisabled(type, name , index) {
        if (type === 'color' && size) {
            return !productObj?.option?.find(variant => variant.name === size && variant.name === name);
        } else if (type === 'size' && color) {
            return !productObj?.option?.find(variant => variant.name === color && variant.name === name);
        }
        return false;
    }

    return (
        <>

            <Helmet>
                <title>Product - {productObj?.name}</title>
                <meta name={productObj?.description} content="Explore our wide range of products tailored to suit your needs." />
                <meta name="keywords" content="electronics, apparel, gadgets, books, online shopping" />
            </Helmet>
            {/* <div className={ `skel-pro skel-detail ${ adClass }` }></div> */}
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/">Home</ALink></li>
                        <li className="breadcrumb-item"><ALink href="/shop">Products</ALink></li>
                        <li className="breadcrumb-item"><ALink href="/shop">Electronics</ALink></li>
                        <li className="breadcrumb-item">
                            Laptops
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{productObj && productObj.name}</li>
                    </ol>
                </div>
            </nav>
            {
                <div className='row'>
                    <div style={{marginLeft:'20px'}}>
                        <img src={(productObj && productObj?.imageUrls && productObj?.imageUrls[0]) || macbook_img} alt='Ranger cycle' height="400" width="400"></img>
                    </div>
                    
                    {/* <ProductMediaOne product={productObj} /> */}
                    {/* <div style={{ marginLeft: '20px' }} className={`product-single-details ${adClass}`}> */}
                    <div style={{ marginLeft: '20px' }}>
                        {/* <h1 className="product-title">{productObj?.name}</h1> */}
                        <h2 className="product-title w-100 ls-0">{productObj?.name}</h2>
                        {/* {
                        isNav ?
                            <ProductNav prev={ prev } next={ next } />
                            : ""
                    } */}

                        <div className="ratings-container">
                            <div className="product-ratings">
                                <span className="ratings" style={{ width: `${20 * productObj?.ratings}%` }}></span>
                                {/* <span className="tooltiptext tooltip-top">{ productObj.avgRatings.toFixed(0) }</span> */}
                            </div>

                            {/* <ALink href="#" className="rating-link">( { product.reviews > 0 ? `${ productObj.reviews } Reviews` : 'There are no reviews yet.' } )</ALink> */}
                        </div>

                        {/* <hr className="short-divider" /> */}

                        <div className="price-box">
                            {
                                <span className="product-price">&#x20B9;{productObj?.price}</span>

                                // productObj.price[ 0 ] == productObj.price[ 1 ] ?
                                //     <span className="product-price">&#x20B9;{productObj.price }</span>
                                //     : productObj.variants.length > 0 ?
                                //         <span className="product-price">&#x20B9;{ productObj.price[ 0 ].toFixed( 2 ) } &ndash; { '$' + productObj.price[ 1 ].toFixed( 2 ) }</span>
                                //         : <>
                                //             <span className="old-price">&#x20B9;{ productObj.price[ 1 ].toFixed( 2 ) }</span>
                                //             <span className="new-price">&#x20B9;{productObj.price[ 0 ].toFixed( 2 ) }</span>
                                //         </>
                            }
                        </div>

                        {
                            // product.until && product.until !== null &&
                            // <ProductCountdown type="1" />
                        }

                        <div className="product-desc" style={{width:'700px'}}>
                            <p>{productObj?.description}</p>
                        </div>

                        <ul className="single-info-list">


                            <li>
                                SKU: <strong>{productObj?.product_sku}</strong>
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

                        {
                            productObj?.options?.length > 0 ?
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

                                    {
                                        productObj?.options.map((item, index) =>
                                        (
                                            detectColor(item.name) ? (
                                                <div className="product-single-filter d-flex align-items-center"><label>Color:</label>
                                                    <ul className="config-size-list config-color-list config-filter-list">
                                                        {
                                                            item?.options?.map((item1, index2) => (
                                                                // <li key={`filter-color-${index}`} className={`${item.name === color ? 'active' : ''} ${isDisabled('color', item.name) ? 'disabled' : ''}`}>
                                                                <li key={`filter-color-${index}`} className={findVariation(item1.name) ? 'active' : ''} >
                                                                    {
                                                                        <a href="#" className="filter-color border-2"
                                                                            style={{ backgroundColor: item1.name }} onClick={(e) => selectColor(item.name ,item1.name, e ,index,item1.variant_sf_id)}></a>
                                                                    }
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            ) :

                                                <div className="product-single-filter d-flex align-items-center">
                                                    <label>{item.name}</label>
                                                    <ul className="config-size-list d-inline-block">
                                                        {
                                                            item?.options?.map((item1, index1) => (
                                                                // <li key={`filter-size-${index1}`} className={`${myArray.some(obj => obj.itemName === item1.name) ? 'active' : ''} ${isDisabled(item, item1.name , index) ? 'disabled' : ''}`}>
                                                                <li key={`filter-size-${index1}`} className={findVariation(item1.name) ? 'active' : ''}>

                                                                    {   
                                                                        <a href="#" className="d-flex align-items-center justify-content-center" onClick={(e) => selectVariation(item.name ,item1.name, e ,index ,item1.variant_sf_id)}>
                                                                            {item1.name}
                                                                        </a>
                                                                    }
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>


                                        ))
                                    }

                                    {
                                        <SlideToggle collapsed={true}>
                                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                                <>
                                                    <button className={`d-none variation-toggle ${toggleState.toLowerCase()}`} onClick={onToggle}></button>
                                                    <div className="product-single-filter m-0" ref={setCollapsibleElement}>
                                                        <label></label>
                                                        <a className="font1 text-uppercase clear-btn" href="#" onClick={clearVariation}>Clear</a>
                                                    </div>
                                                </>
                                            )}
                                        </SlideToggle>
                                    }
                                </div>
                                : ''
                        }










                      
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
                            <button className="btn btn-dark add-cart mr-2" title="Add To Cart" onClick={() => onAddCartClick(productObj)}>Add to Cart</button>
                        </div>

                        {/* <hr className="divider mb-0 mt-0" /> */}

                        {/* <div className="product-single-share mb-3">
                            <label className="sr-only">Share:</label>

                            <div className="social-icons mr-2">
                                <ALink href="#" className="social-icon social-facebook icon-facebook"
                                    title="Facebook"></ALink>
                                <ALink href="#" className="social-icon social-twitter icon-twitter"
                                    title="Twitter"></ALink>
                                <ALink href="#" className="social-icon social-linkedin fab fa-linkedin-in"
                                    title="Linkedin"></ALink>
                                <ALink href="#" className="social-icon social-mail icon-mail-alt"
                                    title="Mail"></ALink>
                            </div>

                         <a href="#" className={ `btn-icon-wish add-wishlist ${ isInWishlist() ? 'added-wishlist' : '' }` } onClick={ onWishlistClick } title={ `${ isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist' }` }><i
                            className="icon-wishlist-2"></i><span>{ isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist' }</span></a>
                        </div> */}
                    </div>
                </div>

            }
        </>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         wishlist: state.wishlist.list ? state.wishlist.list : []
//     }
// }

export default ProductDetails;




