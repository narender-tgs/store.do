// import Reveal from 'react-awesome-reveal';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// // Import Custom Component
// import ProductOne from '../../features/products/product-one';
// import OwlCarousel from '../../features/owl-carousel';

// // Import Settings
// import { productSlider } from '../../../utils/data/slider';
// import { fadeInUpShorter } from '../../../utils/data/keyframes'
// import ALink from '../../common/ALink';

// export default function TrendyCollection ( props ) {
//     const { product } = props;

//     return (
//         <section className="trendy-section mb-2">
//             <div className="container">
//                 <Reveal keyframes={ fadeInUpShorter } delay={ 200 } duration={ 500 } triggerOnce>
//                     <h2 className="section-title">Trending Accessories</h2>
//                 </Reveal>

//                 <Reveal className="row" keyframes={ fadeInUpShorter } delay={ 200 } duration={ 1000 } triggerOnce>
//                     <OwlCarousel adClass="products-slider show-nav-hover nav-image-center" options={ productSlider }>
//                         {
//                             product ?
//                                 product.map( ( item, index ) => (
//                                     <ProductOne
//                                         product={ item }
//                                         key={ "product-one" + index }
//                                     />

//                                 ) )

//                                 :
//                                 [ 0, 1, 2, 3, 4 ].map( ( item, index ) =>
//                                     <div className="skel-pro skel-pro-grid" key={ "product-one" + index }></div>
//                                 )
//                         }
//                     </OwlCarousel>
//                 </Reveal>

//                 <div className="row">
//                     <div className="col-xl-6 mb-2">
//                         <div className="banner banner3 d-flex flex-wrap align-items-center bg-gray h-100">
//                             <div className="col-sm-4 text-center">
//                                 <h3 className="font5 mb-0">Summer Sale</h3>
//                                 <h2 className="text-uppercase mb-0">20% off</h2>
//                             </div>
//                             <div className="col-sm-4">
//                                 <figure className="mb-0">
//                                     <LazyLoadImage
//                                         alt="Home Slide"
//                                         src="images/home/banners/banner-3.jpg"
//                                         threshold={ 500 }
//                                         effect="black and white"
//                                         width="100%"
//                                         height={ 137 }
//                                     />
//                                 </figure>
//                             </div>
//                             <div className="col-sm-4 text-center">
//                                 <ALink href="/shop" className="btn btn-dark">Shop All Sale</ALink>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-6 mb-2">
//                         <div className="banner banner4 d-flex flex-wrap align-items-center bg-primary h-100">
//                             <div className="col-sm-4 text-center">
//                                 <h3 className="font5 text-white mb-0">Flash Sale</h3>
//                                 <h2 className="text-uppercase text-white mb-0">30% off</h2>
//                             </div>
//                             <div className="col-sm-4">
//                                 <figure className="mb-0">
//                                     <LazyLoadImage
//                                         alt="Home Slide"
//                                         src="images/home/banners/banner-4.jpg"
//                                         threshold={ 500 }
//                                         effect="black and white"
//                                         width="100%"
//                                         height={ 137 }
//                                     />
//                                 </figure>
//                             </div>
//                             <div className="col-sm-4 text-center">
//                                 <ALink href="/shop" className="btn btn-light">Shop All Sale</ALink>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }