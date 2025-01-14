import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
// import { useLazyQuery } from '@apollo/react-hooks';

import ALink from "../../components/common/ALink";
import ShopBanner from "../../components/partials/shop/shop-banner";
import ShopSidebarOne from "../../components/partials/shop/sidebar/shop-sidebar-one";
import Pagination from "../../components/features/pagination";
import ProductsRow from "../../components/partials/products-collection/product-row";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStoreDetails } from "../../store/cart/storeData/storeDetailsSlice";

// import withApollo from '../../server/apollo';
// import { GET_PRODUCTS } from '../../server/queries';

const ProductList = () => {
  const location = useLocation();
  const storeDatas = useSelector(getStoreDetails);

  const grid = new URLSearchParams(location.search).get("grid");
  const showsidebar = grid === "3cols" || grid === "4cols";
  const addclass = grid === "7cols" || grid === "8cols";
  const [products, setProducts] = useState([]);
  const pathParts = location.pathname.split("/"); // Split the pathname
  const productObj = pathParts[pathParts.length - 1];
  const [render, setRe_Render] = useState();
  const [categoryObj, setCategoryObj] = useState();

  const [sortBy, setSortBy] = useState("default");
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: "",
    max: "",
  });
  const [categoryGuids, setCategoryGuids] = useState([]);
  const [subCategoryGuids, setSubCategoryGuids] = useState([]);
  const [totalPage, setTotalPage] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const checkRender = location.state;
  useEffect(() => {
    if (checkRender === "renderAgain") {
      setRe_Render(true);
    }
  }, [checkRender]);

  const addVariants = (variantsOptions) => {
    const newVariantsArr = variantsOptions.map((item) => {
      return {
        option_name: item.name,
        option_value: item.options[0].name,
        variant_sf_id: item.options[0].variant_sf_id,
      };
    });
    return newVariantsArr;
  };
  useEffect(() => {
    if (pathParts.length === 4 && pathParts[3].startsWith("ban-")) {
      axios
        .get(
          `http://localhost:3000/v1/product/${productObj}/banner/products?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&limit=${perPage}&page=${pageNumber}`,
          { headers: { service_ref: "8xuf4dev" } },
        )
        // axios.get(`http://localhost:3000/v1/product/${productObj}/banner/products`, { headers: { 'service_ref': '8xuf4dev' } })

        .then((response) => {
          const totalProducts = response?.data?.data?.pagination?.total;

          setTotalPage(Math.ceil(totalProducts / perPage));
          const products_variant = response.data.data.products.map(
            (element) => {
              return {
                ...element,
                variants:
                  element?.options &&
                  element?.options.length > 0 &&
                  addVariants(element.options),
              };
            },
          );

          // Access the response data
          const responseData = products_variant;
          if (sortBy === "price_asc") {
            const priceLowToHigh = responseData.sort((a, b) => {
              return a.price - b.price;
            });
            setProducts(priceLowToHigh);
          } else if (sortBy === "price_desc") {
            const priceHighToLow = responseData.sort((a, b) => {
              return b.price - a.price;
            });
            setProducts(priceHighToLow);
          }
        })
        .catch((error) => {
          // Handle any errors
        });
    } else if (pathParts.length === 3 && pathParts[1] === "product") {
      axios
        .get(
          `http://localhost:3000/v1/product/store/${storeDatas?.storeDetails?.store_guid || localStorage.getItem("storeGuid")}?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&limit=${perPage}&page=${pageNumber}`,
          { headers: { service_ref: "8xuf4dev" } },
        )

        .then((response) => {
          const totalProducts = response?.data?.data?.pagination?.total;

          setTotalPage(Math.ceil(totalProducts / perPage));
          const products_variant = response.data.data.products.map(
            (element) => {
              return {
                ...element,
                variants:
                  element?.options &&
                  element?.options.length > 0 &&
                  addVariants(element.options),
              };
            },
          );
          // Access the response data
          const responseData = products_variant;
          if (sortBy === "price_asc") {
            const priceLowToHigh = responseData.sort((a, b) => {
              return a.price - b.price;
            });
            setProducts(priceLowToHigh);
          } else if (sortBy === "price_desc") {
            const priceHighToLow = responseData.sort((a, b) => {
              return b.price - a.price;
            });
            setProducts(priceHighToLow);
          }
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }, [selectedPriceRange, sortBy, render, perPage, pageNumber]);

  useEffect(() => {
    if (pathParts.length === 4 && pathParts[3].startsWith("ban-")) {
      const categoryGuidsParam = JSON.stringify(categoryGuids); // Convert to JSON string
      const subCategoryGuidsParam = JSON.stringify(subCategoryGuids); // Convert to JSON string
      // axios.get(`http://localhost:3000/v1/product?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}` , { headers: { 'service_ref': '8xuf4dev'}})
      axios
        .get(
          `http://localhost:3000/v1/product/${productObj}/banner/products?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}&limit=${perPage}&page=${pageNumber}`,
          { headers: { service_ref: "8xuf4dev" } },
        )
        // axios.get(`http://localhost:3000/v1/product/${productObj}/banner/products`, { headers: { 'service_ref': '8xuf4dev' } })

        .then((response) => {
          const totalProducts = response?.data?.data?.pagination?.total;

          setTotalPage(Math.ceil(totalProducts / perPage));
          const products_variant = response.data.data.products.map(
            (element) => {
              return {
                ...element,
                variants:
                  element?.options &&
                  element?.options.length > 0 &&
                  addVariants(element.options),
              };
            },
          );
          // Access the response daeta
          const responseData = products_variant;
          setProducts(responseData);
          // Process the response data here
        })
        .catch((error) => {
          // Handle any errors
        });
    } else if (pathParts.length === 3 && pathParts[1] === "product") {
      const categoryGuidsParam = JSON.stringify(categoryGuids); // Convert to JSON string
      const subCategoryGuidsParam = JSON.stringify(subCategoryGuids); // Convert to JSON string
      // axios.get(`http://localhost:3000/v1/product?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}` , { headers: { 'service_ref': '8xuf4dev'}})
      axios
        .get(
          `http://localhost:3000/v1/product/store/${storeDatas?.storeDetails?.store_guid || localStorage.getItem("storeGuid")}?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}&limit=${perPage}&page=${pageNumber}`,
          { headers: { service_ref: "8xuf4dev" } },
        )

        .then((response) => {
          const totalProducts = response?.data?.data?.pagination?.total;

          setTotalPage(Math.ceil(totalProducts / perPage));
          const products_variant = response.data.data.products.map(
            (element) => {
              return {
                ...element,
                variants:
                  element?.options &&
                  element?.options.length > 0 &&
                  addVariants(element.options),
              };
            },
          );
          // Access the response daeta
          const responseData = products_variant;
          setProducts(responseData);
          // Process the response data here
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }, [
    selectedPriceRange,
    categoryGuids,
    subCategoryGuids,
    render,
    perPage,
    pageNumber,
  ]);

  // const router = useRouter();
  // const query = router.query;
  // const [ getProducts, { data, loading, error } ] = useLazyQuery(  );

  // const [ sortBy, setSortBy ] = useState( query.sortBy ? query.sortBy : 'default' );
  // const products = data && data.products.data;
  // const totalPage = data ? parseInt( data.products.total / perPage ) + ( data.products.total % perPage ? 1 : 0 ) : 1;

  useEffect(() => {
    let offset =
      document.querySelector(".main-content").getBoundingClientRect().top +
      window.pageYOffset -
      58;
    setTimeout(() => {
      window.scrollTo({ top: offset, behavior: "smooth" });
    }, 200);

    // let page = query.page ? query.page : 1;

    // getProducts( {
    //     variables: {
    //         list: true,
    //         search: query.search,
    //         colors: query.colors ? query.colors.split( ',' ) : [],
    //         sizes: query.sizes ? query.sizes.split( ',' ) : [],
    //         min_price: parseInt( query.min_price ),
    //         max_price: parseInt( query.max_price ),
    //         category: query.category,
    //         tag: query.tag,
    //         sortBy: sortBy,
    //         from: perPage * ( page - 1 ),
    //         to: perPage * page
    //     }
    // } );
  }, [perPage, sortBy]);

  // function onPerPageChange ( e ) {
  //     setPerPage( e.target.value );
  //     router.push( {
  //         pathname: router.pathname,
  //         query: {
  //             ...query,
  //             page: 1
  //         }
  //     } );
  // }

  function onSortByChange(e) {
    // router.push( {
    //     pathname: router.pathname,
    //     query: {
    //         ...query,
    //         sortBy: e.target.value,
    //         page: 1
    //     }
    // } )
    setSortBy(e.target.value);
  }

  function getProductPriceRange(data) {
    setSelectedPriceRange(data);
  }
  function getCategoryProducts(category) {
    setCategoryObj(category);
    if (category.catGuid) {
      // It's a main category
      if (!categoryGuids.includes(category.catGuid)) {
        setCategoryGuids([category.catGuid]);
      }
      setSubCategoryGuids([]); // Reset subcategory because we're at top level
    } else if (category.subCategory && category.subCategory.parentCatGuid) {
      // It's a subcategory
      if (!categoryGuids.includes(category.subCategory.parentCatGuid)) {
        setCategoryGuids([category.subCategory.parentCatGuid]);
      }
      if (!subCategoryGuids.includes(category.subCategory.subCatGuid)) {
        setSubCategoryGuids([category.subCategory.subCatGuid]);
      }
    }
  }
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  function sidebarToggle(e) {
    let body = document.querySelector("body");
    e.preventDefault();
    if (body.classList.contains("sidebar-opened")) {
      body.classList.remove("sidebar-opened");
    } else {
      body.classList.add("sidebar-opened");
    }
  }

  // if ( error ) {
  //     return <div>{ error.message }</div>
  // }

  return (
    <main className="main">
      <ShopBanner />

      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          {/* <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/">Home</ALink></li>
                        {
                            query.category ?
                                <>
                                    <li className="breadcrumb-item"><ALink href="/shop" scroll={ false }>shop</ALink></li>
                                    {
                                        data && data.products.categoryFamily.map( ( item, index ) => (
                                            <li className="breadcrumb-item" key={ `category-family-${index}` }><ALink href={ { query: { category: item.slug } } } scroll={ false }>{ item.name }</ALink></li>
                                        ) )
                                    }
                                    <li className="breadcrumb-item active">
                                        {
                                            query.search ?
                                                <>
                                                    Search - <ALink href={ { query: { category: query.category } } } scroll={ false }>{ query.category }</ALink> / { query.search }
                                                    Search - <ALink href={ { query: { category: query.category } } } scroll={ false }>{ query.category }</ALink> / { query.search }
                                                </>
                                                : query.category
                                        }
                                    </li>
                                </>
                                : query.search ?
                                    <>
                                        <li className="breadcrumb-item"><ALink href={ { pathname: router.pathname, query: {} } } scroll={ false }>shop</ALink></li>
                                        <li className="breadcrumb-item active" aria-current="page">{ `Search - ${query.search}` }</li>
                                    </>
                                    : query.tag ?
                                        <>
                                            <li className="breadcrumb-item"><ALink href={ { pathname: router.pathname, query: {} } } scroll={ false }>shop</ALink></li>
                                            <li className="breadcrumb-item active" aria-current="page">{ `Product Tag - ${query.tag}` }</li>
                                        </>
                                        : <li className="breadcrumb-item active" aria-current="page">Shop</li>
                        }
                    </ol> */}
        </div>
      </nav>

      <div className="container">
        <div className="row main-content">
          <div className="col-lg-9">
            <nav className="toolbox sticky-header mobile-sticky">
              <div className="toolbox-left">
                <a
                  href="#"
                  className="sidebar-toggle"
                  onClick={(e) => sidebarToggle(e)}
                >
                  <svg
                    data-name="Layer 3"
                    id="Layer_3"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="15"
                      x2="26"
                      y1="9"
                      y2="9"
                      className="cls-1"
                    ></line>
                    <line x1="6" x2="9" y1="9" y2="9" className="cls-1"></line>
                    <line
                      x1="23"
                      x2="26"
                      y1="16"
                      y2="16"
                      className="cls-1"
                    ></line>
                    <line
                      x1="6"
                      x2="17"
                      y1="16"
                      y2="16"
                      className="cls-1"
                    ></line>
                    <line
                      x1="17"
                      x2="26"
                      y1="23"
                      y2="23"
                      className="cls-1"
                    ></line>
                    <line
                      x1="6"
                      x2="11"
                      y1="23"
                      y2="23"
                      className="cls-1"
                    ></line>
                    <path
                      d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                      className="cls-2"
                    ></path>
                    <path
                      d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z"
                      className="cls-2"
                    ></path>
                    <path
                      d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z"
                      className="cls-3"
                    ></path>
                    <path
                      d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                      className="cls-2"
                    ></path>
                  </svg>
                  <span>Filter</span>
                </a>

                <div className="toolbox-item toolbox-sort">
                  <label>Sort By:</label>

                  <div className="select-custom">
                    <select
                      name="orderby"
                      className="form-control"
                      value={sortBy}
                      onChange={(e) => onSortByChange(e)}
                    >
                      <option value="default">Default sorting</option>
                      {/* <option value="popularity">Sort by popularity</option> */}
                      {/* <option value="rating">Sort by average rating</option> */}
                      {/* <option value="date">Sort by newness</option> */}
                      <option value="price">Sort by price: low to high</option>
                      <option value="price-desc">
                        Sort by price: high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="toolbox-right">
                {/* <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control" value={ perPage } onChange={ ( e ) => onPerPageChange( e ) }>
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                </div> */}

                <div className="toolbox-item layout-modes">
                  <ALink
                    href={{ pathname: "/product" }}
                    className="layout-btn btn-grid"
                    title="Grid"
                  >
                    <i className="icon-mode-grid"></i>
                  </ALink>
                  <ALink
                    href={{ pathname: "/pages/product/list" }}
                    className="layout-btn btn-list active"
                    title="List"
                  >
                    <i className="icon-mode-list"></i>
                  </ALink>
                </div>
              </div>
            </nav>

            {/* <ProductsRow products={ products } loading={ loading } perPage={ perPage } /> */}
            <ProductsRow products={products} perPage={perPage} />

            {products && products.length ? (
              // { loading || ( products && products.length ) ?
              <nav className="toolbox toolbox-pagination">
                <div className="toolbox-item toolbox-show">
                  {/* <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control" value={ perPage }>
                                       </select> <select name="count" className="form-control" value={ perPage } onChange={ e => onPerPageChange( e ) }>
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div> */}
                </div>
                {/* <Pagination totalPage={ totalPage } />  */}
                <Pagination
                  totalPage={totalPage}
                  onPageChange={handlePageChange}
                />
              </nav>
            ) : (
              ""
            )}
          </div>

          {/* <ShopSidebarOne /> */}
          {showsidebar ? (
            <ShopSidebarOne
              onChangePrice={getProductPriceRange}
              onChangeCategory={getCategoryProducts}
            />
          ) : (
            <ShopSidebarOne
              onChangePrice={getProductPriceRange}
              onChangeCategory={getCategoryProducts}
              style={{ display: "none" }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductList;
