import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';
import banner1 from '../../../assets/images/home/banners/banner-1t.jpg'
import banner_side from '../../../assets/images/home/banners/banner-side.png'

function BannerSection () {
    return (
        <section className="banners-section mb-4">
            <div className="row row-sm m-0">
                <div className="col-md-4 pl-0 pr-0 pr-md-2">

                    <div className="banner banner1">
                        <figure>
                            <LazyLoadImage
                                alt="banner"
                                src={banner1}
                                width="100%"
                                height="auto"
                                threshold={ 500 }
                                effect="black and white"
                            />
                        </figure>
                    </div>
                        {/* <img src={banner1} alt='desc'></img> */}
                </div>

                <div className="col-md-8 pr-0 pl-0 pl-md-2">
                    <div className="banner banner2 h-100" style={ { background: `#101010 no-repeat center/cover url(${banner_side})` } }>
                        <h4 className="text-light text-uppercase mb-0">Get Ready</h4>

                        <h2 className="d-inline-block align-middle text-uppercase m-b-3">
                            20% off
                        </h2>

                        <ALink href="/shop" className="btn btn-dark btn-lg align-middle m-b-3 d-none d-sm-inline-block">
                            Shop All Sale
                            </ALink>

                        <h3 className="heading-border">BIKES</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default React.memo( BannerSection );