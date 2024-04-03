import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from "./ALink";
import OwlCarousel from '../features/owl-carousel';

import { instagramSlider } from "../../utils/data/slider";

function Footer () {
    return (
        <footer className="footer font2">
            <div className="footer-top">
                <div className="instagram-box bg-dark">
                    <div className="row m-0 align-items-center">
                        <div className="instagram-follow col-md-4 col-lg-3 d-flex align-items-center">
                            <div className="info-box">
                                <i className="fab fa-instagram text-white mr-4"></i>
                                <div className="info-box-content">
                                    <h4 className="text-white line-height-1">Follow Us on Instagram</h4>
                                    <p className="line-height-1">@portoecommerce</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-9 p-0">
                            <OwlCarousel adClass="instagram-carousel" options={ instagramSlider }>
                                <div className="media-with-lazy">
                                    <figure className="mb-0">
                                        <LazyLoadImage
                                            alt="instagram"
                                            src="images/home/instagram/instagram1.jpg"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>

                                <div className="media-with-lazy">
                                    <figure className="mb-0">
                                        <LazyLoadImage
                                            alt="instagram"
                                            src="images/home/instagram/instagram2.jpg"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>

                                <div className="media-with-lazy">
                                    <figure className="mb-0">
                                        <LazyLoadImage
                                            alt="instagram"
                                            src="images/home/instagram/instagram3.jpg"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>

                                <div className="media-with-lazy">
                                    <figure className="mb-0">
                                        <LazyLoadImage
                                            alt="instagram"
                                            src="images/home/instagram/instagram4.jpg"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>

                                <div className="media-with-lazy">
                                    <figure className="mb-0">
                                        <LazyLoadImage
                                            alt="instagram"
                                            src="images/home/instagram/instagram5.jpg"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>

                                <div className="media-with-lazy">
                                    <figure className="mb-0">
                                        <LazyLoadImage
                                            alt="instagram"
                                            src="images/home/instagram/instagram6.jpg"
                                            threshold={ 500 }
                                            effect="black and white"
                                            width="100%"
                                            height="auto"
                                        />
                                    </figure>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="widget-newsletter d-lg-flex align-items-center justify-content-between flex-wrap">
                        <div className="footer-left d-xl-flex align-items-center">
                            <div className="info-box flex-column flex-sm-row mr-5 my-3">
                                <i className="far fa-envelope text-white mr-sm-4 mb-sm-0 mb-1"></i>
                                <div className="widget-newsletter-info text-center text-sm-left">
                                    <h4 className="line-height-1 text-white">
                                        Get Special Offers and Savings
                                    </h4>
                                    <p className="line-height-1">Get all the latest information on Events,
                                    Sales
                                        and Offers.</p>
                                </div>
                            </div>

                            <form action="#" className="my-3">
                                <div className="footer-submit-wrapper d-flex justify-content-center justify-content-sm-start">
                                    <input type="email" className="form-control font-italic"
                                        placeholder="Enter Your E-mail Address..." size="40" required />
                                    <button type="submit" className="btn btn-sm">Sign Up</button>
                                </div>
                            </form>
                        </div>

                        <div className="footer-right">
                            <div className="social-icons my-3 text-center text-sm-left">
                                <ALink href="#" className="social-icon social-facebook icon-facebook"></ALink>
                                <ALink href="#" className="social-icon social-twitter icon-twitter"></ALink>
                                <ALink href="#" className="social-icon social-linkedin fab fa-linkedin-in"></ALink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-lg-3">
                            <ALink href="/" className="logo">
                                <img src="images/logo-white.png" width="113" height="48" alt="Logo" className="logo" />
                            </ALink>

                            <p className="footer-desc">Lorem ipsum dolor sit amet, consectetur adipis.</p>

                            <div className="ls-0 footer-question mb-3">
                                <h6 className="mb-0 text-white">QUESTIONS?</h6>
                                <h3 className="mb-0 text-primary">1-888-123-456</h3>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">Account</h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="links">
                                            <li>
                                                <ALink href="/pages/account">My Account</ALink>
                                            </li>
                                            <li><ALink href="#">Track Your Order</ALink></li>
                                            <li><ALink href="#">Payment Methods</ALink></li>
                                            <li><ALink href="#">Shipping Guide</ALink></li>
                                        </ul>
                                    </div>

                                    <div className="col-md-6">
                                        <ul className="links">
                                            <li><ALink href="#">FAQs</ALink></li>
                                            <li><ALink href="#">Product Support</ALink></li>
                                            <li><ALink href="#">Privacy</ALink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">About</h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="links">
                                            <li>
                                                <ALink href="/pages/about-us">About Porto</ALink>
                                            </li>
                                            <li><ALink href="#">Our Guarantees</ALink></li>
                                            <li><ALink href="#">Terms And Conditions</ALink></li>
                                            <li><ALink href="#">Privacy policy</ALink></li>
                                        </ul>
                                    </div>

                                    <div className="col-md-6">
                                        <ul className="links">
                                            <li><ALink href="#">Return Policy</ALink></li>
                                            <li><ALink href="#">Intellectual Property Claims</ALink></li>
                                            <li><ALink href="#">Site Map</ALink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="widget text-lg-right">
                                <h4 className="widget-title">Features</h4>

                                <ul className="links">
                                    <li><ALink href="#">Powerful Admin Panel</ALink></li>
                                    <li><ALink href="#">Mobile &amp; Retina Optimized</ALink></li>
                                    <li><ALink href="#">Super Fast React Template</ALink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright text-lg-center mb-0">&copy; Porto eCommerce. 2021. All Rights
                    Reserved
                    </p>
                </div>
            </div>
        </footer >
    );
}

export default React.memo( Footer );