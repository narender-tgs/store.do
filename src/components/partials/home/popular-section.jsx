// import Reveal from 'react-awesome-reveal';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// // Import Custom Component
// import ProductOne from '../../features/products/product-one';
// import OwlCarousel from '../../features/owl-carousel';

// // Import Settings
// import { productSlider, categorySlider } from '../../../utils/data/slider';
// import { fadeInUpShorter } from '../../../utils/data/keyframes'
// import ALink from '../../common/ALink';

// export default function FeaturedCollection ( props ) {
//     const { product, loading } = props;

//     return (
//         <section className="popular-products">
//             <div className="container">
//                 <Reveal keyframes={ fadeInUpShorter } delay={ 200 } duration={ 500 } triggerOnce>
//                     <h2 className="section-title">Most Popular Products</h2>
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

//                 <Reveal keyframes={ fadeInUpShorter } delay={ 100 } duration={ 1000 } triggerOnce>
//                     <OwlCarousel adClass="categories-slider mb-4 show-nav-hover" options={ categorySlider }>
//                         <div className="product-category">
//                             <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
//                                 <LazyLoadImage
//                                     alt="category"
//                                     src="images/home/icons/icon-1.png"
//                                     width="100%"
//                                     height="auto"
//                                     threshold={ 500 }
//                                     effect="black and white"
//                                 />
//                             </ALink>

//                             <div className="category-content">
//                                 <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Bike Saddles</ALink></h3>
//                             </div>
//                         </div>

//                         <div className="product-category">
//                             <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
//                                 <LazyLoadImage
//                                     alt="category"
//                                     src="images/home/icons/icon-2.png"
//                                     width="100%"
//                                     height="auto"
//                                     threshold={ 500 }
//                                     effect="black and white"
//                                 />
//                             </ALink>

//                             <div className="category-content">
//                                 <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Bike Pedals</ALink></h3>
//                             </div>
//                         </div>

//                         <div className="product-category">
//                             <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
//                                 <LazyLoadImage
//                                     alt="category"
//                                     src="images/home/icons/icon-3.png"
//                                     width="100%"
//                                     height="auto"
//                                     threshold={ 500 }
//                                     effect="black and white"
//                                 />
//                             </ALink>

//                             <div className="category-content">
//                                 <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Bike Frames</ALink></h3>
//                             </div>
//                         </div>

//                         <div className="product-category">
//                             <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
//                                 <LazyLoadImage
//                                     alt="category"
//                                     src="images/home/icons/icon-4.png"
//                                     width="100%"
//                                     height="auto"
//                                     threshold={ 500 }
//                                     effect="black and white"
//                                 />
//                             </ALink>

//                             <div className="category-content">
//                                 <h3 className="font2 ls-0 text-uppercase mb-0"> <ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Bike Chains</ALink></h3>
//                             </div>
//                         </div>

//                         <div className="product-category">
//                             <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
//                                 <LazyLoadImage
//                                     alt="category"
//                                     src="images/home/icons/icon-5.png"
//                                     width="100%"
//                                     height="auto"
//                                     threshold={ 500 }
//                                     effect="black and white"
//                                 />
//                             </ALink>

//                             <div className="category-content">
//                                 <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Bike Tools</ALink></h3>
//                             </div>
//                         </div>
//                     </OwlCarousel>
//                 </Reveal>
//             </div>
//         </section>
//     );
// }
