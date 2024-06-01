import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ProductOne from '../../features/products/product-one';
import OwlCarousel from '../../features/owl-carousel';

// Import Settings
import { productSlider } from '../../../utils/data/slider';
import { fadeInUpShorter } from '../../../utils/data/keyframes'
import ALink from '../../common/ALink';
import gear1 from '../../../assets/images/gear1.jpg'
import handle1 from '../../../assets/images/handle1.jpg'
import part1 from '../../../assets/images/parts1.jpg'
import cycle1 from '../../../assets/images/cycle1.jpg'
import { useSelector } from 'react-redux';
import { getStoreDetails } from '../../../store/cart/storeData/storeDetailsSlice';
export default function TrendyCollection ( props ) {
    const storeDetails = useSelector(getStoreDetails);
    
    const bannerMidTwo =storeDetails?.storeDetails?.banners && storeDetails?.storeDetails?.banners.filter((bann)=>(bann?.bannerPosition?.includes('Middle') && bann?.bannerPosition?.includes('Two')));
    const bannerMidOne =storeDetails?.storeDetails?.banners && storeDetails?.storeDetails?.banners.filter((bann)=>(bann?.bannerPosition?.includes('Middle') && bann?.bannerPosition?.includes('One')));

    const bannerTwoGuid = bannerMidTwo && bannerMidTwo[0]?.guid;
    const bannerTwoUrl = bannerMidTwo && bannerMidTwo[0]?.url;
    const bannerOneGuid = bannerMidOne && bannerMidOne[0]?.guid;
    const bannerOneUrl = bannerMidOne && bannerMidOne[0]?.url;
    // const allBanner = JSON.parse(localStorage.getItem('productBannerIds'));
    // const secondBannerUrl =  allBanner && allBanner[1]?.url;
    // const secondBannerGuid = allBanner && allBanner[1]?.guid;
    // console.log("banner url for 2nd banner",allBanner);
    const { product } = props;
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
          srcs: gear1,
          name: "Eco-Friendly Yoga Mat",
          categories: ["Fitness", "Yoga"],
          price: [34,98],
          slug: "eco-friendly-yoga-mat",
          ratings: 4.6,
          is_hot: false,
          variants:['Red','Pink']
        },
        {
          srcs: part1,
          name: "Bluetooth Wireless Headphones",
          categories: ["Electronics", "Audio"],
          price: [345,456],
          slug: "bluetooth-wireless-headphones",
          ratings: 4.7,
          is_hot: true,
          variants:['Magenta','violet']
        },
        {
          srcs: handle1,
          name: "Organic Green Tea Leaves",
          categories: ["Groceries", "Beverages"],
          price: [56,343],
          slug: "organic-green-tea-leaves",
          ratings: 4.5,
          is_hot: false,
          variants:['Pitch Black', 'Brown']
        },
        {
          srcs: part1,
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
      
    // const imgObj = [{imgs:part1},{imgs:gear1},{imgs:handle1},{imgs:cycle1},{imgs:cycle1},{imgs:handle1}, {imgs:part1}]
    return (
        <section className="trendy-section mb-2">
            <div className="container">
                <Reveal keyframes={ fadeInUpShorter } delay={ 200 } duration={ 500 } triggerOnce>
                    <h2 className="section-title">Trending Accessories</h2>
                </Reveal>

                <Reveal className="row" keyframes={ fadeInUpShorter } delay={ 200 } duration={ 1000 } triggerOnce>
                    <OwlCarousel adClass="products-slider show-nav-hover nav-image-center" options={ productSlider }>
                    {/* <img src={part1} alt="Description" width="250" height="200"></img>
                    <img src={gear1} alt="Description" width="250" height="200"></img>
                      <img src={handle1} alt="Description" width="250" height="200"></img>
                      <img src={cycle1} alt="Description" width="250" height="200"></img>

                      <img src={part1} alt="Description" width="250" height="200"></img>
                      <img src={handle1} alt="Description" width="250" height="200"></img>
                      <img src={cycle1} alt="Description" width="250" height="200"></img> */}
                        {
                            productList ?
                                productList.map( ( item, index ) => (
                                    <ProductOne
                                        product={ item }
                                        key={ "product-one" + index }
                                    />

                                ) )

                                :
                                [ 0, 1, 2, 3, 4 ].map( ( item, index ) =>
                                    <div className="skel-pro skel-pro-grid" key={ "product-one" + index }></div>
                                )
                        }
                    </OwlCarousel>
                    {/* <div className='d-flex'>
                    <img src={gear1} alt="Description" width="250" height="200"></img>
                      <img src={handle1} alt="Description" width="250" height="200"></img>
                      <img src={cycle1} alt="Description" width="250" height="200"></img>

                      <img src={part1} alt="Description" width="250" height="200"></img>
                      <img src={handle1} alt="Description" width="250" height="200"></img>
                      <img src={cycle1} alt="Description" width="250" height="200"></img>
                    </div> */}
                     
                </Reveal>

                <div className="row">
                    <div className="col-xl-6 mb-2">
                        <div className="banner banner3 d-flex flex-wrap align-items-center bg-gray h-100">
                            <div className="col-sm-4 text-center">
                                <h3 className="font5 mb-0">Summer Sale</h3>
                                <h2 className="text-uppercase mb-0">50% off</h2>
                            </div>
                            <div className="col-sm-4">
                                <figure className="mb-0">
                                    <LazyLoadImage
                                        alt="Home Slide"
                                        // src="images/home/banners/banner-3.jpg"
                                        src={bannerOneUrl}
                                        threshold={ 500 }
                                        effect="black and white"
                                        width="100%"
                                        height={ 137 }
                                    />
                                </figure>
                            </div>
                            <div className="col-sm-4 text-center">
                                {/* <ALink href="/shop" className="btn btn-dark">Shop All Sale</ALink> */}
                    <ALink href={`/product/Sale/${bannerOneGuid}`} state={bannerOneGuid} className="btn btn-dark btn-lg">Shop all sale</ALink>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 mb-2">
                        <div className="banner banner4 d-flex flex-wrap align-items-center bg-primary h-100">
                            <div className="col-sm-4 text-center">
                                <h3 className="font5 text-white mb-0">Flash Sale</h3>
                                <h2 className="text-uppercase text-white mb-0">30% off</h2>
                            </div>
                            <div className="col-sm-4">
                                <figure className="mb-0">
                                    <LazyLoadImage
                                        alt="Home Slide"
                                        // src="images/home/banners/banner-4.jpg"
                                        src={bannerTwoUrl}
                                        threshold={ 500 }
                                        effect="black and white"
                                        width="100%"
                                        height={ 137 }
                                    />
                                </figure>
                            </div>
                            <div className="col-sm-4 text-center">
                                {/* <ALink href="/shop" className="btn btn-light">Shop All Sale</ALink> */}
                                <ALink href={`/product/Sale/${bannerTwoGuid}`} state={bannerTwoGuid} className="btn btn-dark btn-lg">Shop all sale</ALink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}