import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import cycle1 from '../../../assets/images/cycle1.jpg'

import ALink from '../../common/ALink';

function CartPopup ( props ) {
    const  product  = props.props;

    return (
        <div className="minipopup-area">
            <div className="minipopup-box" style={ { top: "0" } }>
                <div className="product media-with-lazy">
                    <figure className="product-media w-100">
                        <ALink>
                            <LazyLoadImage
                                alt="product"
                                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROGswtbi-CqtO_5ecgfl_aVaCERXPu1ESJjA&s"
                                src={product?.imageUrls?.length > 0 &&product?.imageUrls[0]}
                                threshold={ 500 }
                                effect="black and white"
                                width="100%"
                                height="auto"
                            />
                        </ALink>
                    </figure>
                    <div className="product-detail">
                       <p>{product.name}</p>

                        <p>has been added to your cart.</p>
                    </div>
                </div>
                <div className="product-action">
                    <ALink href="/pages/cart" className="btn viewcart">View Cart</ALink>
                    <ALink href="/pages/checkout" className="btn btn-dark checkout">Checkout</ALink>
                </div>
                <button className="mfp-close"></button>
            </div>
        </div>
    )
}

export default React.memo( CartPopup );