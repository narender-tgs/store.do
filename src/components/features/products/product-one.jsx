

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCartDetails , setCartDetails} from '../../../store/cart/cartDetailsSlice';
import { Link } from 'react-router-dom';
import macbook from '../../../assets/images/products/Laptops/macbook Pro max.jpg'
import HP from '../../../assets/images/products/Laptops/HP Laptop 15 inch.jpg'
import Apple from '../../../assets/images/products/Laptops/Apple Macbook Air M1.jpg'
import Acer from '../../../assets/images/products/Laptops/Acer Veriton 14 Inch.jpg'
import Bluetooth from '../../../assets/images/products/single/bluetooth headphones.jpg'
import Gourment from '../../../assets/images/products/single/gourmet kichan knifeset.jpg'
import Organic from '../../../assets/images/products/single/green tea.jpg'
import Ultra from '../../../assets/images/products/single/ultra hd smart tv.jpg'
import Eco from '../../../assets/images/products/single/yoga mats.jpg'
import Asus from '../../../assets/images/products/mobiles/asusvivo.png'
import Redme from '../../../assets/images/products/mobiles/redme.jpg'
import Samsung from '../../../assets/images/products/mobiles/samsung.jpg'
import Oppo from '../../../assets/images/products/mobiles/oppo.jpg'
import Chair from '../../../assets/images/products/mobiles/chairs.jpg'

// import CartPopup from '../modals/add-to-cart-popup';
import {  ToastContainer , toast} from 'react-toastify';


// Import Actions
// import { actions as WishlistAction } from "../../../store/wishlist";
// import { actions as CartAction } from "../../../store/cart";
// import { actions as ModalAction } from "../../../store/modal";
 
// Import Custom Component
import ALink from '../../common/ALink';
import ProductCountdown from '../product-countdown';
import cycle1 from '../../../assets/images/cycle1.jpg'
import cycle2 from '../../../assets/images/cycle2.jpg'
import AddToCartPopup from '../modals/add-to-cart-popup';

 
function ProductOne ( props ) {
    const [updatedCartItems , setUpdatedCartItems]= useState([]);
    const cartData = useSelector(getCartDetails);

    useEffect(() => {
        setUpdatedCartItems(cartData?.cartData?.data)
    }, [cartData])
    // useEffect(() => {
    //     toast( <CartPopup/> );
    // }, [])
    
    
    
    const dispatch = useDispatch();
    // dispatch(setCartDetails({data:cartItems}))
    // const router = useRouter();
    const { adClass = "", link = "default", product } = props;

    function getImageSource(productName) {
        // console.log("product name ->",productName.split(" ")[0]);
        // Define a mapping of product names to imported image variables
        const imageMap = {
            "macbook": macbook,
            "HP": HP,
            "Apple": Apple,
            "Acer": Acer,
            "Bluetooth":Bluetooth,
            "Gourmet":Gourment,
            "Organic":Organic,
            "Eco" : Eco,
            "Ultra":Ultra,
            "ASUS":Asus,
            "Redmi" :Redme,
            "OPPO":Oppo,
            "Samsung":Samsung,
            "Folding" :Chair
            // Add more mappings as needed
        };
    
        // Check if the product name exists in the image map
        if (productName in imageMap) {
            return imageMap[productName];
        } else {
            // Return a default image source or handle the case where the product name doesn't match any image
            return "";
        }
    }
 
    function isSale () {
        return product.price[ 0 ] !== product.price[ 1 ] && product.variants.length === 0 ?
            '-' + ( 100 * ( product.price[ 1 ] - product.price[ 0 ] ) / product.price[ 1 ] ).toFixed( 0 ) + '%'
            :
            product?.variants?.find( variant => variant.sale_price ) ? "Sale" : false;
    }
 
    function isInWishlist () {
        // return product && props.wishlist.findIndex( item => item.slug === product.slug ) > -1;
    }
 
    function onWishlistClick ( e ) {
        e.preventDefault();
        if ( !isInWishlist() ) {
            let target = e.currentTarget;
            target.classList.add( "load-more-overlay" );
            target.classList.add( "loading" );
 
            setTimeout( () => {
                target.classList.remove( 'load-more-overlay' );
                target.classList.remove( 'loading' );
                props.addToWishList( product );
            }, 1000 );
        } else {
            // router.push( '/pages/wishlist' );
        }
    }
    function showToastWithImage() {
        const toastContent = () => (
          <div>
           
            <AddToCartPopup props={product}/>
    
          </div>
        );
      
        toast(toastContent);
      }
      
 
 
    const onAddCartClick= ( productDetails ) =>{
        productDetails.qty = 1;
        showToastWithImage()
       
        
        if(updatedCartItems && updatedCartItems.length > 0){
            let productArray=[...updatedCartItems , productDetails]
            dispatch(setCartDetails({data:productArray}))
        }else{
            let productArray=[ productDetails]
            dispatch(setCartDetails({data:productArray}))
        }
      
    }

    
 
    function onQuickViewClick ( e ) {
        e.preventDefault();
        props.showQuickView( product.slug );
    }
    const onClickProduct=()=>{
        
    }
 
    return (
        <div className={ `product-default media-with-lazy ${adClass}` }>
            <figure>
                
                <ALink href={`/product_detail/${product.name}/${product.guid}`} state={product}  onClick={()=>{
                   onClickProduct()
                }}>
                    <div className="lazy-overlay"></div>
 
                    <LazyLoadImage
                        alt="product"
                        src={(product && product.imageUrls && product.imageUrls[1]) || (product && product.imageUrls && product.imageUrls[0]) || getImageSource(product.name.split(" ")[0]) || macbook}
                        
                        threshold={ 500 }
                        effect="black and white"
                        width="100%"
                        height="auto"
                    />
                    {
                        product?.imageUrls?.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={ product?.imageUrls }
                                threshold={ 500 }
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>
 
                <div className="label-group">
                    { product.is_hot ? <div className="product-label label-hot">HOT</div> : '' }
 
                    { isSale() ? <div className="product-label label-sale">{ isSale() }</div> : '' }
                </div>
 
                {
                    product.until && product.until !== null &&
                    <ProductCountdown />
                }
            </figure>
 
            <div className="product-details">
                <div className="category-wrap">
                    <div className="category-list">
                        {
                            product.categories ?
                                product.categories.map( ( item, index ) => (
                                    <React.Fragment key={ item.slug + '-' + index }>
                                        <ALink href={ { pathname: '/shop', query: { category: item.slug } } }>
                                       
                                            { item.name }
                                        </ALink>
                                        { index < product.categories.length - 1 ? ', ' : "" }
                                    </React.Fragment>
                                ) ) : ""
                        }
                    </div>
                </div>
 
 
                <h3 className="product-title">
                    {/* <ALink href={ `/product/${product.slug}` }>{ product.name }</ALink> */}
                    <ALink  onClick={()=>{
                                            onClickProduct()
                                        }}>{ product.name }</ALink>
                </h3>
 
                {/* <div className="ratings-container">
                    <div className="product-ratings">
                        <span className="ratings" style={ { width: 20 * product.ratings + '%' } }></span>
                        <span className="tooltiptext tooltip-top">{ product.avgRatings}</span>
                    </div>
                </div> */}
 
                <div className="price-box">
                    {
                        product.price[ 0 ] == product.price[ 1 ] ?
                            <span className="product-price">&#x20B9;{ product.price }</span>
                            : product.variants.length > 0 ?
                                <span className="product-price">&#x20B9;{product.price } &ndash; { '$' + product.price}</span>
                                : <>
                                    <span className="old-price">&#x20B9;{product.price }</span>
                                    <span className="product-price">&#x20B9;{ product.price }</span>
                                </>
                    }
                </div>
 
                <div className="product-action">
                    {
                        // product?.variants?.length > 0 ?
                        //     <ALink href={ `/product/default/${product.slug}` } className="btn-icon btn-add-cart"><i
                        //         className="fa fa-arrow-right"></i><span>SELECT OPTIONS</span></ALink>
                        //     :
                             <Link className="btn-icon btn-dark btn-add-cart product-type-simple" title="Add To Cart" onClick={() => onAddCartClick(product)}><i
                                className="icon-shopping-cart"></i><span>ADD TO CART</span></Link>
                    }
                    <a href="#" className={ `btn-icon-wish ${isInWishlist() ? 'added-wishlist' : ''}` } onClick={ onWishlistClick } title={ `${isInWishlist() === true ? 'Go to Wishlist' : 'Add to Wishlist'}` }><i className="icon-heart"></i></a>
                    <a href="#" className="btn-quickview" title="Quick View" onClick={ onQuickViewClick }><i
                        className="fas fa-external-link-alt"></i></a>
                </div>
                
            </div>
        </div>
    )
}
 
const mapStateToProps = ( state ) => {
    return {
        wishlist: state.wishlist.list ? state.wishlist.list : []
    }
}
 
export default ProductOne ;