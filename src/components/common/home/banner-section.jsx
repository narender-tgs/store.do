import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';
import banner1 from '../../../assets/images/home/banners/banner-1t.jpg'
import banner_side from '../../../assets/images/home/banners/banner-side.png'
import { useSelector } from 'react-redux';
import { getStoreDetails } from '../../../store/cart/storeData/storeDetailsSlice';

function BannerSection () {
    const storeDetails = useSelector(getStoreDetails);
    const bottomPosition = storeDetails?.storeDetails?.banners && storeDetails?.storeDetails?.banners.filter((bann)=>(bann?.bannerPosition?.includes('Bottom')));


    const bannerFirstId =  bottomPosition && bottomPosition[0]?.guid;
    const bannerFirstUrl = bottomPosition && bottomPosition[0]?.url;
    // const allBanner = JSON.parse(localStorage.getItem('productBannerIds'));
    // const secondBannerUrl =  allBanner && allBanner[1]?.url;
    // const secondBannerGuid = allBanner && allBanner[1]?.guid
    // console.log("banner url for 2nd banner",allBanner);
    return (
        <section className="banners-section mb-4">
            <div className="row row-sm m-0">
                <div className="col-md-4 pl-0 pr-0 pr-md-2">

                    <div className="banner banner1">
                        {/* <figure>
                            <LazyLoadImage
                                alt="banner"
                                src={banner1}
                                width="100%"
                                height="auto"
                                threshold={ 500 }
                                effect="black and white"
                            />
                        </figure> */}
                    </div>
                </div>

                <div className="col-md-12 pr-0 pl-0 pl-md-2" style={{height:'465px'}}>
                    <div className="banner banner2 h-100" style={ { background: `#101010 no-repeat center/cover url(${bannerFirstUrl})` } }>
                        <h4 className="text-light text-uppercase mb-0">Get Ready</h4>

                        <h2 className="d-inline-block align-middle text-uppercase m-b-3">
                            20% off
                        </h2>

                        {/* <ALink href="/shop" className="btn btn-dark btn-lg align-middle m-b-3 d-none d-sm-inline-block">
                            Shop All Sale
                            </ALink> */}
                    <ALink href={`/product/Sale/${bannerFirstId}`} state={bannerFirstId} className="btn btn-dark btn-lg">Shop all sale</ALink>


                        <h3 className="heading-border">Head Phones</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default React.memo( BannerSection );