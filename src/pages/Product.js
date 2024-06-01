import React, { useState, useEffect } from 'react';
import { parsePath, useHistory, useLocation } from 'react-router-dom';

import ALink from '../components/common/ALink';
import ShopBanner from '../components/partials/shop/shop-banner';
import ShopSidebarOne from '../components/partials/shop/sidebar/shop-sidebar-one';
import Pagination from '../components/features/pagination';
import ProductsGrid from '../components/partials/products-collection/product-grid';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getStoreDetails } from '../store/cart/storeData/storeDetailsSlice';
const Product = () => {
    const storeDatas = useSelector(getStoreDetails)

    // const {saleData} = props;
    // const history = useHistory();
    const location = useLocation();
    const grid = new URLSearchParams(location.search).get('grid');
    const showsidebar = grid === '3cols' || grid === '4cols';
    const addclass = grid === '7cols' || grid === '8cols';
    // const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
    const [productsState, setProductsState] = useState({ data: null, loading: false, error: null });
    const { data, loading, error } = productsState;
    const [perPage, setPerPage] = useState(12);
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState({ min: "", max: "" });
    const [categoryGuids, setCategoryGuids] = useState([]);
    const [subCategoryGuids, setSubCategoryGuids] = useState([]);
    const [categoryObj, setCategoryObj] = useState();
    const [render, setRe_Render] = useState();

    // const dataReceived = location;
    const pathParts = location.pathname.split('/'); // Split the pathname
    const productObj = pathParts[pathParts.length - 1];

    const checkRender = location.state;
    useEffect(() => {
        if (checkRender === 'renderAgain') {
            setRe_Render(true);
        }
    }, [checkRender])


    const addVariants = (variantsOptions) => {
        const newVariantsArr = variantsOptions.map((item) => {
            return {
                option_name: item.name,
                option_value: item.options[0].name,
                variant_sf_id: item.options[0].variant_sf_id
            }
        })
        return newVariantsArr;
    }

    useEffect(() => {
        if (pathParts.length === 4 && pathParts[3].startsWith('ban-')) {

            axios.get(`http://localhost:3000/v1/product/${productObj}/banner/products?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}`, { headers: { 'service_ref': '8xuf4dev' } })
                // axios.get(`http://localhost:3000/v1/product/${productObj}/banner/products`, { headers: { 'service_ref': '8xuf4dev' } })

                .then(response => {
                    const products_variant = response.data.data.products.map(element => {
                        return {
                            ...element, variants: element?.options && element?.options.length > 0 && addVariants(element.options)
                        }
                    });
                    // Access the response data
                    const responseData = products_variant;
                    if (sortBy === "price_asc") {
                        const priceLowToHigh = responseData.sort((a, b) => {
                            return a.price - b.price;
                        })
                        // console.log("price low to high", priceLowToHigh);
                        setProducts(priceLowToHigh)
                    } else if (sortBy === "price_desc") {
                        const priceHighToLow = responseData.sort((a, b) => {
                            return b.price - a.price;
                        })
                        // console.log("priceHigh to low", priceHighToLow);
                        setProducts(priceHighToLow)
                    }
                })
                .catch(error => {
                    // Handle any errors
                });
        } else if (pathParts.length === 2 && pathParts[1] === 'product') {

            axios.get(`http://localhost:3000/v1/product/store/${storeDatas?.storeDetails?.store_guid || localStorage.getItem('storeGuid')}?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}`, { headers: { 'service_ref': '8xuf4dev' } })

                .then(response => {
                    // const tempProductsArr = response.data.data.products;
                    const products_variant = response.data.data.products.map(element => {
                        return {
                            ...element, variants: element?.options && element?.options.length > 0 && addVariants(element.options)
                        }
                    });

                    // return {
                    //     option_name: pro.itemName,
                    //     option_value: pro.name,
                    //     variant_sf_id: pro._id,

                    // }
                    //  e.preventDefault();
                    // const productWithVariants = {
                    //     ...productDetails,
                    //     variants: products_variant
                    // };
                    // Access the response data
                    const responseData = products_variant;
                    if (sortBy === "price_asc") {
                        const priceLowToHigh = responseData.sort((a, b) => {
                            return a.price - b.price;
                        })
                        // console.log("price low to high", priceLowToHigh);
                        setProducts(priceLowToHigh)
                    } else if (sortBy === "price_desc") {
                        const priceHighToLow = responseData.sort((a, b) => {
                            return b.price - a.price;
                        })
                        // console.log("priceHigh to low", priceHighToLow);
                        setProducts(priceHighToLow)
                    }
                })
                .catch(error => {
                    // Handle any errors
                });
        }

    }, [selectedPriceRange, sortBy, render])

    // useEffect(() => {
    //     axios.get(`http://localhost:3003/v1/product?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}` , { headers: { 'service_ref': '8xuf4dev'}})
    //         .then(response => {
    //             // Access the response data
    //             const responseData = response.data;
    //             setProducts(responseData.data.products)
    //             // Process the response data here
    //         })
    //         .catch(error => {
    //             // Handle any errors
    //         });

    // }, [selectedPriceRange])
    useEffect(() => {
        if (pathParts.length === 4 && pathParts[3].startsWith('ban-')) {
            const categoryGuidsParam = JSON.stringify(categoryGuids); // Convert to JSON string
            const subCategoryGuidsParam = JSON.stringify(subCategoryGuids); // Convert to JSON string
            // axios.get(`http://localhost:3000/v1/product?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}` , { headers: { 'service_ref': '8xuf4dev'}})
            axios.get(`http://localhost:3000/v1/product/${productObj}/banner/products?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}`, { headers: { 'service_ref': '8xuf4dev' } })
                // axios.get(`http://localhost:3000/v1/product/${productObj}/banner/products`, { headers: { 'service_ref': '8xuf4dev' } })

                .then(response => {
                    const products_variant = response.data.data.products.map(element => {
                        return {
                            ...element, variants: element?.options && element?.options.length > 0 && addVariants(element.options)
                        }
                    });
                    // Access the response daeta
                    const responseData = products_variant;
                    setProducts(responseData)
                    // Process the response data here
                })
                .catch(error => {
                    // Handle any errors
                });

        } else if (pathParts.length === 2 && pathParts[1] === 'product') {
            const categoryGuidsParam = JSON.stringify(categoryGuids); // Convert to JSON string
            const subCategoryGuidsParam = JSON.stringify(subCategoryGuids); // Convert to JSON string
            // axios.get(`http://localhost:3000/v1/product?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}` , { headers: { 'service_ref': '8xuf4dev'}})
            axios.get(`http://localhost:3000/v1/product/store/${storeDatas?.storeDetails?.store_guid || localStorage.getItem('storeGuid')}?minPrice=${selectedPriceRange.min}&maxPrice=${selectedPriceRange.max}&categoryGuids=${encodeURIComponent(categoryGuidsParam)}&subcategoryGuids=${encodeURIComponent(subCategoryGuidsParam)}`, { headers: { 'service_ref': '8xuf4dev' } })

                .then(response => {
                    const products_variant = response.data.data.products.map(element => {
                        return {
                            ...element, variants: element?.options && element?.options.length > 0 && addVariants(element.options)
                        }
                    });
                    // Access the response daeta
                    const responseData = products_variant;
                    setProducts(responseData)
                    // Process the response data here
                })
                .catch(error => {
                    // Handle any errors
                });
        }


    }, [selectedPriceRange, categoryGuids, subCategoryGuids, render])


    const totalPage = data ? parseInt(data.products.total / perPage) + (data.products.total % perPage ? 1 : 0) : 1;
    const gridClass = {
        '3cols': 'col-6 col-sm-4',
        '4cols': 'col-6 col-sm-4 col-md-3',
        '5cols': 'col-6 col-sm-4 col-md-3 col-xl-5col',
        '6cols': 'col-6 col-sm-4 col-md-3 col-xl-2',
        '7cols': 'col-6 col-sm-4 col-md-3 col-xl-7col',
        '8cols': 'col-6 col-sm-4 col-md-3 col-xl-8col',
    };

    useEffect(() => {
        let offset = document.querySelector('.main-content').getBoundingClientRect().top + window.pageYOffset - 58;
        setTimeout(() => {
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 200);

        let page = 1;

        // getProducts({
        //     variables: {
        //         search: query.get('search'),
        //         colors: query.get('colors') ? query.get('colors').split(',') : [],
        //         sizes: query.get('sizes') ? query.get('sizes').split(',') : [],
        //         min_price: parseInt(query.get('min_price')),
        //         max_price: parseInt(query.get('max_price')),
        //         category: query.get('category'),
        //         tag: query.get('tag'),
        //         sortBy: sortBy,
        //         from: perPage * (page - 1),
        //         to: perPage * page
        //     }
        // });
    }, [perPage, sortBy]);

    function getProductPriceRange(data) {

        setSelectedPriceRange(data);
    }
    function getCategoryProducts(category) {
        // console.log("category that are selected", category);
        setCategoryObj(category)
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

    function consoles(e) {
        // let url = history.location.pathname.replace('[grid]', grid);
        // let arr = ['page=1'];
        // query.forEach((value, key) => {
        //     if (key !== 'page' && key !== 'grid') arr.push(`${key}=${value}`);
        // });
        // url = `${url}?${arr.join('&')}`;
        // history.push(url);
        setPerPage(e.target.value);
    }

    function onSortByChange(e) {
        // console.log("e target value -->", e.target.value);
        // let url = history.location.pathname.replace('[grid]', grid);
        // let arr = [`sortBy=${e.target.value}`, 'page=1'];
        // query.forEach((value, key) => {
        //     if (key !== 'sortBy' && key !== 'page' && key !== 'grid') arr.push(`${key}=${value}`);
        // });
        // url = `${url}?${arr.join('&')}`;
        // history.push(url);
        setSortBy(e.target.value);

    }

    function sidebarToggle(e) {
        let body = document.querySelector('body');
        e.preventDefault();
        if (body.classList.contains('sidebar-opened')) {
            body.classList.remove('sidebar-opened');
        } else {
            body.classList.add('sidebar-opened');
        }
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <main className="main">
            <Helmet>
                <title>Products - Store.Do</title>
                <meta name="description" content="Explore our wide range of products tailored to suit your needs." />
                <meta name="keywords" content="electronics, apparel, gadgets, books, online shopping" />
            </Helmet>
            <ShopBanner />

            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/"><i className="icon-home"></i></ALink></li>
                        {
                            <>
                                <li className="breadcrumb-item">
                                    <ALink href={`/shop/${grid}`} scroll={false}>Home</ALink>
                                </li>
                                <li className="breadcrumb-item">
                                    <ALink href={`/shop/${grid}`} scroll={false}>Products</ALink>
                                </li>

                                {categoryObj?.subCategory && categoryObj?.subCategory?.parentCatName ? (
                                    <>
                                        {/* Parent Category */}
                                        <li className="breadcrumb-item">
                                            <ALink href={`/shop/${grid}?category=${categoryObj.subCategory.parentCatGuid}`} scroll={false}>
                                                {categoryObj?.subCategory?.parentCatName}
                                            </ALink>
                                        </li>
                                        {/* Subcategory */}
                                        <li className="breadcrumb-item active">
                                            <ALink href={`/shop/${grid}?category=${categoryObj.subCategory.subCatGuid}`} scroll={false}>
                                                {categoryObj?.catName}
                                            </ALink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {/* Main Category (no subcategory) */}
                                        <li className="breadcrumb-item active">
                                            <ALink href={`/shop/${grid}?category=${categoryObj?.catGuid}`} scroll={false}>
                                                {categoryObj?.catName}
                                            </ALink>
                                        </li>
                                    </>
                                )}
                            </>

                        }
                    </ol>
                </div>
            </nav>

            <div className="container">
                <div className="row main-content">
                    {
                        showsidebar ? <ShopSidebarOne onChangePrice={getProductPriceRange} onChangeCategory={getCategoryProducts} /> : <ShopSidebarOne onChangePrice={getProductPriceRange} onChangeCategory={getCategoryProducts} style={{ display: 'none' }} />
                    }
                    {/* <div className={`${showsidebar ? 'col-lg-9' : 'col-12'}`}> */}
                    <div className={'col-lg-9'}>
                        <nav className="toolbox sticky-header mobile-sticky">
                            <div className="toolbox-left">
                                <a href="#" className="sidebar-toggle" onClick={e => sidebarToggle(e)}>
                                    <svg data-name="Layer 3" id="Layer_3" viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <line x1="15" x2="26" y1="9" y2="9" className="cls-1"></line>
                                        <line x1="6" x2="9" y1="9" y2="9" className="cls-1"></line>
                                        <line x1="23" x2="26" y1="16" y2="16" className="cls-1"></line>
                                        <line x1="6" x2="17" y1="16" y2="16" className="cls-1"></line>
                                        <line x1="17" x2="26" y1="23" y2="23" className="cls-1"></line>
                                        <line x1="6" x2="11" y1="23" y2="23" className="cls-1"></line>
                                        <path
                                            d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                                            className="cls-2"></path>
                                        <path d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z" className="cls-2"></path>
                                        <path d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z" className="cls-3"></path>
                                        <path
                                            d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                                            className="cls-2"></path>
                                    </svg>
                                    <span>Filter</span>
                                </a>

                                <div className="toolbox-item toolbox-sort">
                                    <label>Sort By:</label>

                                    <div className="select-custom">
                                        <select name="orderby" className="form-control" value={sortBy} onChange={e => onSortByChange(e)}>
                                            <option value="default">Default sorting</option>
                                            {/* <option value="popularity">Sort by popularity</option> */}
                                            {/* <option value="rating">Sort by average rating</option> */}
                                            {/* <option value="date">Sort by newness</option> */}
                                            <option value="price_asc">Sort by price: low to high</option>
                                            <option value="price_desc">Sort by price: high to low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="toolbox-right">
                                {/* <div className='bounce-loader'>
                                    <div className='bounce3'></div>
                                </div> */}
                                {/* <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control" value={perPage} onChange={(e) => onPerPageChange(e)}>
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                </div> */}

                                <div className="toolbox-item layout-modes">
                                    <ALink href={{ pathname: location.pathname }} className="layout-btn btn-grid active mr-2" title="Grid">
                                        <i className="icon-mode-grid"></i>
                                    </ALink>
                                    <ALink href={{ pathname: '/product/list' }} className="layout-btn btn-list" title="List">
                                        <i className="icon-mode-list"></i>
                                    </ALink>
                                </div>
                            </div>
                        </nav>

                        <ProductsGrid products={products} loading={loading} perPage={perPage} gridClass={gridClass[grid]} addClass={addclass ? 'sm-padding row-sm' : ''} />

                        {/* {loading || (products && products.length) ?
                            <nav className="toolbox toolbox-pagination">
                                <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control" value={perPage} onChange={e => consoles(e)}>
                                            <option value="3">3</option>
                                            <option value="6">6</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>

                                <Pagination totalPage={totalPage} />

                            </nav>
                            : ''
                        } */}

                       
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Product