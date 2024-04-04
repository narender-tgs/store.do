// import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
// import withApollo from '../server/apollo';
// import { GET_HOME_DATA } from '../server/queries';

// Import Custom Component
// import BannerSection from "../home/banner-section";
import HomeSection from "../components/common/home/home-section";
import FeaturedCollection from "../components/common/home/popular-section";
import TrendyCollection from "../components/common/home/product-collection";
import BannerSection from "../components/common/home/banner-section";
// import NewsletterModal from "../components/features/modals/newsletter-modal";
// import Popularsection from "../home/popular-section";
// import TrendyCollection from "../home/product-collection";

const Home =() =>{
    // const { data, loading, error } = useQuery( GET_HOME_DATA, { variables: { productsCount: 6 } } );
    // const featured = data && data.specialProducts.featured;
    // const topRated = data && data.specialProducts.topRated;

    // if ( error ) {
    //     return <div>{ error.message }</div>
    // }

    return (
        <>
            {/* <main className={ `home skeleton-body skel-shop-products ${loading ? '' : 'loaded'}` } > */}
                <HomeSection />
                <FeaturedCollection/>
                <TrendyCollection/>
                <BannerSection/>
                {/* <Popularsection product={ topRated } /> */}

                {/* <BannerSection /> */}

                {/* <TrendyCollection product={ featured } /> */}
            {/* </main> */}

            {/* <NewsletterModal /> */}
        </>
    )
}

// export default withApollo( { ssr: typeof window === 'undefined' } )( Home );
export default Home ;