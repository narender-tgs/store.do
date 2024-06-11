// import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
// import withApollo from '../server/apollo';
// import { GET_HOME_DATA } from '../server/queries';

// Import Custom Component
// import BannerSection from "../home/banner-section";
import { Helmet } from "react-helmet";
import HomeSection from "../components/common/home/home-section";
import FeaturedCollection from "../components/common/home/popular-section";
import TrendyCollection from "../components/common/home/product-collection";
import BannerSection from "../components/common/home/banner-section";
// import NewsletterModal from "../components/features/modals/newsletter-modal";
// import Popularsection from "../home/popular-section";
// import TrendyCollection from "../home/product-collection";

const Home = () => {
  // const { data, loading, error } = useQuery( GET_HOME_DATA, { variables: { productsCount: 6 } } );
  // const featured = data && data.specialProducts.featured;
  // const topRated = data && data.specialProducts.topRated;

  // if ( error ) {
  //     return <div>{ error.message }</div>
  // }

  return (
    <>
      <Helmet>
        <title>Home Page - Store.Do</title>
        <meta
          name="description"
          content="Welcome to our website where we offer the best products and services."
        />
        <meta
          name="keywords"
          content="best products, top services, quality, home"
        />
      </Helmet>
      <div style={{ backgroundColor: "" }}>
        <HomeSection />
        <FeaturedCollection />
        <TrendyCollection />
        <BannerSection />
      </div>
      {/* <main className={ `home skeleton-body skel-shop-products ${loading ? '' : 'loaded'}` } > */}

      {/* <Popularsection product={ topRated } /> */}

      {/* <BannerSection /> */}

      {/* <TrendyCollection product={ featured } /> */}
      {/* </main> */}

      {/* <NewsletterModal /> */}
    </>
  );
};

// export default withApollo( { ssr: typeof window === 'undefined' } )( Home );
export default Home;
