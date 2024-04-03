import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';

function ShopBanner ( { adClass } ) {
    return (
        <div className={ `category-banner-container bg-gray ${adClass}` }>
            <div className="container">
                <div className="category-banner banner p-0">
                    <div className="row align-items-center no-gutters m-0 text-center text-lg-left">
                        <div className="col-md-4 col-xl-2 offset-xl-2 d-flex justify-content-center justify-content-lg-start my-5 my-lg-0">
                            <div className="d-flex flex-column justify-content-center">
                                <h3 className="text-left text-light text-uppercase m-0">extra</h3>
                                <h2 className="text-uppercase m-b-1">20% off</h2>
                                <h3 className="font-weight-bold text-uppercase heading-border ml-0 m-b-3">Bikes</h3>
                            </div>
                        </div>

                        <div className="col-md-5 col-lg-4 text-md-center my-5 my-lg-0" style={ { backgroundImage: 'url(images/home/banners/shop-banner-bg.png)' } }>
                            <figure className="mb-0">
                                <LazyLoadImage
                                    alt="Banner"
                                    src="images/home/banners/shop-banner.png"
                                    threshold={ 500 }
                                    effect="black and white"
                                    width="auto"
                                    height={ 242 }
                                    className="d-inline-block"
                                />
                            </figure>
                        </div>

                        <div className="col-md-3 my-5 my-lg-0">
                            <h4 className="font5 line-height-1 m-b-4">Summer Sale</h4>
                            <ALink href="/shop" className="btn btn-teritary btn-lg ml-0">Shop All Sale</ALink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo( ShopBanner );