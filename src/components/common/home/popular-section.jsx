import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ProductOne from '../../features/products/product-one';
import OwlCarousel from '../../features/owl-carousel';

// Import Settings
import { productSlider, categorySlider } from '../../../utils/data/slider';
import { fadeInUpShorter } from '../../../utils/data/keyframes'
import ALink from '../../common/ALink';
import cycle1 from '../../../assets/images/cycle1.jpg'
import cycle2 from '../../../assets/images/cycle2.jpg'
import cycle3 from '../../../assets/images/cycle3.jpg'
import cycle4 from '../../../assets/images/cycle4.jpg'
import glasses1 from '../../../assets/images/glasses1.jpg'
import icons from '../../../assets/images/home/icons/icon-1.png'


export default function FeaturedCollection ( props ) {
    const { product, loading } = props;

    const productList = [
        {
          srcs: cycle1,
          name: "Ultra HD Smart TV",
          categories: ["Electronics", "Home Entertainment"],
          price: [6786,3453],
          slug: "ultra-hd-smart-tv",
          ratings: 4.8,
          is_hot: true,
          variants:['Blue','Black']
        },
        {
          srcs: cycle2,
          name: "Eco-Friendly Yoga Mat",
          categories: ["Fitness", "Yoga"],
          price: [34,98],
          slug: "eco-friendly-yoga-mat",
          ratings: 4.6,
          is_hot: false,
          variants:[]
        },
        {
          srcs: cycle3,
          name: "Bluetooth Wireless Headphones",
          categories: ["Electronics", "Audio"],
          price: [345,456],
          slug: "bluetooth-wireless-headphones",
          ratings: 4.7,
          is_hot: true,
          variants:['Magenta','violet']
        },
        {
          srcs: cycle4,
          name: "Organic Green Tea Leaves",
          categories: ["Groceries", "Beverages"],
          price: [56,343],
          slug: "organic-green-tea-leaves",
          ratings: 4.5,
          is_hot: false,
          variants:['Pitch Black', 'Brown']
        },
        {
          srcs: glasses1,
          name: "Gourmet Kitchen Knife Set",
          categories: ["Kitchen", "Tools"],
          price: [678,234],
          slug: "gourmet-kitchen-knife-set",
          ratings: 4.9,
          is_hot: false,
          variants:['Red','Black']
        },
        {
          srcs: cycle1,
          name: "Portable Camping Tent",
          categories: ["Outdoor", "Camping"],
          price: [789,343],
          slug: "portable-camping-tent",
          ratings: 4.4,
          is_hot: true,
          variants:['White','Grey']
        }
      ];
      

    return (
        <section className="popular-products">
            <div className="container">
                <Reveal keyframes={ fadeInUpShorter } delay={ 200 } duration={ 500 } triggerOnce>
                    <h2 className="section-title">Most Popular Products</h2>
                </Reveal>

                <Reveal className="row" keyframes={ fadeInUpShorter } delay={ 200 } duration={ 1000 } triggerOnce>
                    
                    <OwlCarousel adClass="products-slider show-nav-hover nav-image-center" options={ productSlider }>
                    
                   
                        {
                            productList ?
                                productList.map( ( item, index ) => (
                                    <ProductOne
                                        product={ item }
                                        key={ "product-one" + index }
                                    />

                                ) )

                                :
                                [ 0, 1, 2, 3, 4,5 ].map( ( item, index ) =>
                                    <div className="skel-pro skel-pro-grid" key={ "product-one" + index }></div>
                                )
                        }
                    </OwlCarousel>
                   
                    
                </Reveal>

                <Reveal keyframes={ fadeInUpShorter } delay={ 100 } duration={ 1000 } triggerOnce>
                    <OwlCarousel adClass="categories-slider mb-4 show-nav-hover" options={ categorySlider }>
                        <div className="product-category">
                            <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
                                <LazyLoadImage
                                    alt="category"
                                    src={icons}
                                    width="100%"
                                    height="auto"
                                    threshold={ 500 }
                                    effect="black and white"
                                />
                            </ALink>

                            <div className="category-content">
                                <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Kids Wear</ALink></h3>
                            </div>
                        </div>

                        <div className="product-category">
                            <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
                                <LazyLoadImage
                                    alt="category"
                                    src={icons}
                                    width="100%"
                                    height="auto"
                                    threshold={ 500 }
                                    effect="black and white"
                                />
                            </ALink>

                            <div className="category-content">
                                <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Mens Collection</ALink></h3>
                            </div>
                        </div>

                        <div className="product-category">
                            <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
                                <LazyLoadImage
                                    alt="category"
                                    src="images/home/icons/icon-3.png"
                                    width="100%"
                                    height="auto"
                                    threshold={ 500 }
                                    effect="black and white"
                                />
                            </ALink>

                            <div className="category-content">
                                <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Winter Collection</ALink></h3>
                            </div>
                        </div>

                        <div className="product-category">
                            <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
                                <LazyLoadImage
                                    alt="category"
                                    src="images/home/icons/icon-4.png"
                                    width="100%"
                                    height="auto"
                                    threshold={ 500 }
                                    effect="black and white"
                                />
                            </ALink>

                            <div className="category-content">
                                <h3 className="font2 ls-0 text-uppercase mb-0"> <ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Women Collection</ALink></h3>
                            </div>
                        </div>

                        <div className="product-category">
                            <ALink href={ { pathname: '/shop', query: { category: 'dress' } } }>
                                <LazyLoadImage
                                    alt="category"
                                    src="images/home/icons/icon-5.png"
                                    width="100%"
                                    height="auto"
                                    threshold={ 500 }
                                    effect="black and white"
                                />
                            </ALink>

                            <div className="category-content">
                                <h3 className="font2 ls-0 text-uppercase mb-0"><ALink href={ { pathname: '/shop', query: { category: 'dress' } } } className="text-dark">Bike Tools</ALink></h3>
                            </div>
                        </div>
                    </OwlCarousel>
                </Reveal>
            </div>
        </section>
    );
}