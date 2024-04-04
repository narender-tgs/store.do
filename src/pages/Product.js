import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ALink from '../components/common/ALink';
import ShopBanner from '../components/partials/shop/shop-banner';
import ShopSidebarOne from '../components/partials/shop/sidebar/shop-sidebar-one';
import Pagination from '../components/features/pagination';
import ProductsGrid from '../components/partials/products-collection/product-grid';

function Product() {
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
    // const query = new URLSearchParams(location.search);
    const products = [
                  {
                      "name": "Bicycle One",
                      "slug": "bicycle-one",
                      "price": [
                          259,
                          299
                      ],
                      "ratings": 0,
                      "reviews": 0,
                      "is_hot": true,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_8_1_61f1cebc9c.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_8_3_07954045b5.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_8_1_61f1cebc9c.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_8_3_07954045b5.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bike Frames",
                              "slug": "bike-frames",
                              "__typename": "ProductCategory"
                          },
                          {
                              "name": "Bikes",
                              "slug": "bikes",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Two",
                      "slug": "bicycle-two",
                      "price": [
                          129,
                          199
                      ],
                      "ratings": 0,
                      "reviews": 0,
                      "is_hot": null,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_9_1_8bf65c5054.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_9_3_85159d5445.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_9_1_8bf65c5054.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_9_3_85159d5445.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bikes",
                              "slug": "bikes",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [
                          {
                              "price": 199,
                              "sale_price": 149,
                              "__typename": "Variant"
                          },
                          {
                              "price": 199,
                              "sale_price": 129,
                              "__typename": "Variant"
                          },
                          {
                              "price": 199,
                              "sale_price": 148,
                              "__typename": "Variant"
                          }
                      ],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Three",
                      "slug": "bicycle-three",
                      "price": [
                          299,
                          299
                      ],
                      "ratings": 4,
                      "reviews": 1,
                      "is_hot": true,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_10_1_cf67579f18.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_10_3_ef85d87a92.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_10_1_cf67579f18.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_10_3_ef85d87a92.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bikes",
                              "slug": "bikes",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Four",
                      "slug": "bicycle-four",
                      "price": [
                          59,
                          99
                      ],
                      "ratings": 0,
                      "reviews": 0,
                      "is_hot": null,
                      "is_new": true,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_11_1_3ee094bbf4.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_11_3_cab1b4fe71.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_11_1_3ee094bbf4.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_11_3_cab1b4fe71.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bikes",
                              "slug": "bikes",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Part One",
                      "slug": "bicycle-part-one",
                      "price": [
                          49,
                          59
                      ],
                      "ratings": 4,
                      "reviews": 1,
                      "is_hot": null,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_1_1_25be18a02a.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_1_3_5fd99dd620.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_1_1_25be18a02a.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_1_3_5fd99dd620.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Accessories",
                              "slug": "accessories-1",
                              "__typename": "ProductCategory"
                          },
                          {
                              "name": "Bike Tools",
                              "slug": "bike-tools",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Part Two",
                      "slug": "bicycle-part-two",
                      "price": [
                          599,
                          599
                      ],
                      "ratings": 3,
                      "reviews": 1,
                      "is_hot": true,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_2_1_de6d275161.jpg",
                              "width": 900,
                              "height": 900,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_2_3_dc8d67a907.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_2_1_de6d275161.jpg",
                              "width": 900,
                              "height": 900,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_2_3_dc8d67a907.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bike Chains",
                              "slug": "bike-chains",
                              "__typename": "ProductCategory"
                          },
                          {
                              "name": "Bike Tools",
                              "slug": "bike-tools",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          }
                      ],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Five",
                      "slug": "bicycle-five",
                      "price": [
                          129,
                          199
                      ],
                      "ratings": 0,
                      "reviews": 0,
                      "is_hot": null,
                      "is_new": true,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_6_1_07f766840c.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_6_3_1c9004c8cb.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_6_1_07f766840c.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_6_3_1c9004c8cb.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bikes",
                              "slug": "bikes",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Part Three",
                      "slug": "bicycle-part-three",
                      "price": [
                          299,
                          299
                      ],
                      "ratings": 0,
                      "reviews": 0,
                      "is_hot": true,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_3_1_c41ff5a8ed.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_3_3_94bc0662ec.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_3_1_c41ff5a8ed.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_3_3_94bc0662ec.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bike Frames",
                              "slug": "bike-frames",
                              "__typename": "ProductCategory"
                          },
                          {
                              "name": "Bike Tools",
                              "slug": "bike-tools",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Part Four",
                      "slug": "bicycle-part-four",
                      "price": [
                          55,
                          55
                      ],
                      "ratings": 4,
                      "reviews": 1,
                      "is_hot": true,
                      "is_new": true,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_4_1_56097a17ae.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_4_3_5feca1ddd6.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_4_1_56097a17ae.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_4_3_5feca1ddd6.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bike Pedals",
                              "slug": "bike-pedals",
                              "__typename": "ProductCategory"
                          },
                          {
                              "name": "Bike Frames",
                              "slug": "bike-frames",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Part Five",
                      "slug": "bicycle-part-five",
                      "price": [
                          39,
                          39
                      ],
                      "ratings": 4,
                      "reviews": 2,
                      "is_hot": true,
                      "is_new": null,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_5_1_d028406ed1.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_5_3_bcd57102ab.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_5_1_d028406ed1.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_5_3_bcd57102ab.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bike Saddles",
                              "slug": "bike-saddles",
                              "__typename": "ProductCategory"
                          },
                          {
                              "name": "Bike Pedals",
                              "slug": "bike-pedals",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": null,
                              "sale_price": null,
                              "__typename": "Variant"
                          }
                      ],
                      "__typename": "Product"
                  },
                  {
                      "name": "Bicycle Six",
                      "slug": "bicycle-six",
                      "price": [
                          101,
                          108
                      ],
                      "ratings": 0,
                      "reviews": 0,
                      "is_hot": null,
                      "is_new": true,
                      "is_out_of_stock": null,
                      "until": null,
                      "stock": 90,
                      "pictures": [
                          {
                              "url": "/uploads/shop27_Product_7_1_b13fbe2d08.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_7_3_e800e24e9c.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "small_pictures": [
                          {
                              "url": "/uploads/shop27_Product_7_1_b13fbe2d08.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          },
                          {
                              "url": "/uploads/shop27_Product_7_3_e800e24e9c.jpg",
                              "width": 800,
                              "height": 800,
                              "__typename": "Media"
                          }
                      ],
                      "categories": [
                          {
                              "name": "Bikes",
                              "slug": "bikes",
                              "__typename": "ProductCategory"
                          }
                      ],
                      "variants": [
                          {
                              "price": 101,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": 108,
                              "sale_price": null,
                              "__typename": "Variant"
                          },
                          {
                              "price": 105,
                              "sale_price": null,
                              "__typename": "Variant"
                          }
                      ],
                      "__typename": "Product"
                  }
              ]
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
    }, [ perPage, sortBy]);

    function onPerPageChange(e) {
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
            <ShopBanner />

            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><ALink href="/"><i className="icon-home"></i></ALink></li>
                        {
                            // query.get('category') ?
                                <>
                                    <li className="breadcrumb-item"><ALink href={`/shop/${grid}`} scroll={false}>shop</ALink></li>
                                    {
                                        data && data.products.categoryFamily.map((item, index) => (
                                            <li className="breadcrumb-item" key={`category-family-${index}`}><ALink href={`/shop/${grid}?category=${item.slug}`} scroll={false}>{item.name}</ALink></li>
                                        ))
                                    }
                                    <li className="breadcrumb-item active">
                                        {
                                            // query.get('search') ?
                                                <>
                                                    Search - <ALink href={`/shop/${grid}?category=category')}`} scroll={false}>Test</ALink>
                                                </>
                                                // : query.get('category')
                                        }
                                    </li>
                                </>
                                // : query.get('search') ?
                                //     <>
                                //         <li className="breadcrumb-item"><ALink href={`/shop/${grid}`} scroll={false}>Shop</ALink></li>
                                //         <li className="breadcrumb-item active" aria-current="page">{`Search - ${query.get('search')}`}</li>
                                //     </>
                                //     : query.get('tag') ?
                                //         <>
                                //             <li className="breadcrumb-item"><ALink href={`/shop/${grid}`} scroll={false}>Shop</ALink></li>
                                //             <li className="breadcrumb-item active" aria-current="page">{`Product Tag - ${query.get('tag')}`}</li>
                                //         </>
                                //         : <li className="breadcrumb-item active" aria-current="page">Shop</li>
                        }
                    </ol>
                </div>
            </nav>

            <div className="container">
                <div className="row main-content">
                    {
                        showsidebar ? <ShopSidebarOne /> : <ShopSidebarOne style={{ display: 'none' }} />
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
                                            <option value="popularity">Sort by popularity</option>
                                            <option value="rating">Sort by average rating</option>
                                            <option value="date">Sort by newness</option>
                                            <option value="price">Sort by price: low to high</option>
                                            <option value="price-desc">Sort by price: high to low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="toolbox-right">
                                <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control" value={perPage} onChange={(e) => onPerPageChange(e)}>
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="toolbox-item layout-modes">
                                    <ALink href={{ pathname: location.pathname }} className="layout-btn btn-grid active mr-2" title="Grid">
                                        <i className="icon-mode-grid"></i>
                                    </ALink>
                                    <ALink href={{ pathname: '/shop/list' }} className="layout-btn btn-list" title="List">
                                        <i className="icon-mode-list"></i>
                                    </ALink>
                                </div>
                            </div>
                        </nav>

                        <ProductsGrid products={products} loading={loading} perPage={perPage} gridClass={gridClass[grid]} addClass={addclass ? 'sm-padding row-sm' : ''} />

                        {loading || (products && products.length) ?
                            <nav className="toolbox toolbox-pagination">
                                <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control" value={perPage} onChange={e => onPerPageChange(e)}>
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                </div>

                                <Pagination totalPage={totalPage} />

                            </nav>
                            : ''
                        }
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Product