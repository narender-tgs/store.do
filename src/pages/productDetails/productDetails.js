

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// Import Custom Component
import ALink from "../../components/common/ALink";
import axios from "axios";

import ProductMediaOne from "../../components/partials/product/media/product-media-one";
import ProductDetailOne from "../../components/partials/product/details/product-detail-one";
// import SingleTabOne from '../../components/partials/product/tabs/single-tab-one';
import RelatedProducts from "../../components/partials/product/widgets/related-products";
// import ProductSidebarTwo from '../../components/partials/product/sidebars/sidebar-two';

function ProductDetails() {
  const location = useLocation();
  const dataReceived = location;
  console.log('data recieved' , dataReceived.state);
  // const productObj = dataReceived?.state;
  // console.log('pathSegments',productObj);
  const myUrl = new URL(window.location.href);
  const [productObj  , setProductObj] = useState(dataReceived?.state);
  // Split the path segments
  const pathSegments = myUrl.pathname.split('/');
  const prodGuid =pathSegments[pathSegments.length-1];
  useEffect(() => {
    axios.get(`http://localhost:3000/v1/product/${prodGuid}`, {header:{'service_ref':'8xuf4dev'}}).then((respones)=>{
      if(respones.data.success === true){
        console.log('respones.data.success' , respones.data.data.product);
          setProductObj(respones.data.data.product || dataReceived?.state);
      }
    })
      
  }, [prodGuid])
  
  console.log("window location origin", window.location.origin);
  // const paramdata=useParams();

 
  const data = {};
  const product = productObj;

  const related = data && data?.product?.related;

  // if ( error ) {
  //     return <div>{ error.message }</div>
  // }

  return (
    <main className="main product-page">
      {/* <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/">home</ALink></li>
                        <li className="breadcrumb-item"><ALink href="/shop">Shop</ALink></li>
                        <li className="breadcrumb-item">
                            {
                                product && product.categories.map((item, index) => (
                                    <React.Fragment key={`category-${index}`}>
                                        <ALink href={{ pathname: "/shop", query: { slug: item.slug } }}>{item.name}</ALink>
                                        {index < product.categories.length - 1 ? ',' : ''}
                                    </React.Fragment>
                                ))
                            }
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{product && product.name}</li>
                    </ol>
                </div>
            </nav> */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/shop">Products</ALink>
            </li>
            {/* <li className="breadcrumb-item"><ALink href="/shop">Electronics</ALink></li>
                        <li className="breadcrumb-item">
                            Laptops
                        </li> */}
            <li className="breadcrumb-item active" aria-current="page">
              {product && product.name}
            </li>
          </ol>
        </div>
      </nav>
      <div className={`container `}>
        {/* <div className={`container skeleton-body skel-shop-products ${loading ? '' : 'loaded'}`}> */}

        <div className="row">
          <div className="col-lg-9 main-content pb-2">
            <div className={`product-single-container product-single-default`}>
              <div className="row">

                <ProductMediaOne product={productObj} />
                <ProductDetailOne product={productObj}/>
                  {/* // prev={product && data?.product?.prev}
                  // next={product && data?.product?.next} */}
                
              </div>
            </div>

            {/* <SingleTabOne product={product} /> */}
          </div>

          {/* <ProductSidebarTwo /> */}
        </div>

        <RelatedProducts
          adClass="mb-1"
          // loading={loading}
          products={related}
        />
      </div>
    </main>
  );
}

export default ProductDetails;
