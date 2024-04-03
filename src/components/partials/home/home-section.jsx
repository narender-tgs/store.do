import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';
import OwlCarousel from '../../features/owl-carousel';

// Import Settings
import { HomeSlider } from '../../../utils/data/slider';

// Import Keyframes
import { fadeInUpShorter, fadeInLeftShorter, fadeInRightShorter } from '../../../utils/data/keyframes'

function HomeSection () {
    return (
        <section className="intro-section">
            <div className="container">
                <OwlCarousel adClass="home-slider show-nav-hover dot-inside" options={ HomeSlider }>
                    <div className="home-slide home-slide-1 banner d-flex flex-wrap">
                        <Reveal keyframes={ fadeInLeftShorter } delay={ 200 } duration={ 1000 } className="col-lg-4 d-flex justify-content-center">
                            <div className="d-flex flex-column justify-content-center">
                                <h4 className="text-light text-uppercase m-b-1">Extra</h4>
                                <h2 className="text-uppercase m-b-1">20% off</h2>
                                <h4 className="font-weight-bold text-uppercase heading-border m-b-3">BIKES</h4>
                                <h3 className="font5 m-b-5">Summer Sale</h3>

                                <div>
                                    <ALink href="/shop" className="btn btn-dark btn-lg">Shop all sale</ALink>
                                </div>
                            </div>
                        </Reveal>

                        <div className="col-lg-8 with-bg" style={ { backgroundImage: 'url(images/home/slider/slide-bg.png)' } }>
                            <Reveal keyframes={ fadeInLeftShorter } delay={ 500 } duration={ 1000 }>
                                <div className="media-with-lazy">
                                    <figure className="m-b-5">
                                        <LazyLoadImage
                                            alt="Home Slide"
                                            src="images/home/slider/slide-1.png"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>
                            </Reveal>

                            <div className="content-box d-sm-flex appear-animate"
                                data-animation-name="fadeInLeftShorter" data-animation-delay="700">
                                <h5 className="text-uppercase m-b-2">only <b
                                    className="text-secondary"><small>$</small>399<small>99</small></b></h5>
                                <div className="content-info">
                                    <h6 className="mb-0">Start Shopping Right Now</h6>
                                    <p className="font2 mb-0">* Get Plus Discount Buying Package</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="home-slide home-slide-2 banner d-flex flex-wrap">
                        <div className="col-lg-5 d-flex justify-content-center">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 200 } duration={ 1000 } className="d-flex flex-column justify-content-center">
                                <>
                                    <h4 className="text-light text-uppercase m-b-1">Extra</h4>
                                    <h2 className="text-uppercase m-b-1">20% off</h2>
                                    <h4 className="font-weight-bold text-uppercase heading-border m-b-3">BIKES</h4>
                                    <h3 className="font5 p-b-4 m-b-5">Summer Sale</h3>

                                    <div>
                                        <ALink href="/shop" className="btn btn-dark btn-lg">Shop all sale</ALink>
                                    </div>
                                </>
                            </Reveal>
                        </div>

                        <div className="col-lg-7 order-lg-first text-lg-right">
                            <Reveal keyframes={ fadeInRightShorter } delay={ 500 } duration={ 1000 }>
                                <figure className="m-b-5">
                                    <LazyLoadImage
                                        alt="Home Slide"
                                        src="images/home/slider/slide-2.png"
                                        threshold={ 500 }
                                        effect="black and white"
                                        width="100%"
                                        height="auto"
                                        className="ml-auto"
                                    />
                                </figure>
                            </Reveal>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </section>
    );
}

export default React.memo( HomeSection );