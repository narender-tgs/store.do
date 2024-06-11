import SlideToggle from "react-slide-toggle";
import InputRange from "react-input-range";
import StickyBox from "react-sticky-box";
import Tree from "rc-tree";
// import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { turedProductSlider } from "../../../../utils/data/slider";
import { shopColors, shopSizes } from "../../../../utils/data/shop";
import ALink from "../../../common/ALink";
import { getStoreDetails } from "../../../../store/cart/storeData/storeDetailsSlice";
import { useSelector } from "react-redux";
const TreeNode = (props) => {
  return (
    <>
      {props.name}
      <span className="products-count">({props.count})</span>
    </>
  );
};

// Dummy data for categories
const dummyCategories = [
  { name: "Electronics", slug: "electronics", parent: null, count: 120 },
  { name: "Laptops", slug: "laptops", parent: "Electronics", count: 80 },
  {
    name: "Smartphones",
    slug: "smartphones",
    parent: "Electronics",
    count: 40,
  },
  { name: "Fashion", slug: "fashion", parent: null, count: 200 },
  { name: "Men", slug: "men", parent: "Fashion", count: 100 },
  { name: "Women", slug: "women", parent: "Fashion", count: 100 },
];

function ShopSidebarOne(props) {
  const storeId = useSelector(getStoreDetails);
  const [allCategories, setAllCategories] = useState();
  const onChangePrice = props.onChangePrice;
  const onChangeCategory = props.onChangeCategory;
  // const router = useRouter();
  const { adClass } = props;
  const [productsState, setProductsState] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const { data, loading, error } = productsState;
  const [priceRange, setRange] = useState({ min: 0, max: 100000 });
  const [categoryAndSubCatChange, setcategoryAndSubCatChange] = useState();

  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:3003/v1/categoryAndSubcategory/Category-subCategory/count', { headers: { 'service_ref': '8xuf4dev' } })
    axios
      .get(
        `
        http://localhost:3000/v1/categoryAndSubcategory/product/count?store_guid=${storeId?.storeDetails?.store_guid || localStorage.getItem("storeGuid")}`,
        { headers: { service_ref: "8xuf4dev" } },
      )
      .then((response) => {
        // Access the response data
        const responseData = response.data;

        setAllCategories(responseData.data.category);
        // setProducts(responseData.data.products)
        // Process the response data here
      })
      .catch((error) => {
        // Handle any errors
      });
  }, []);
  // function containsAttrInUrl ( type, value ) {
  //     const currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
  //     return currentQueries && currentQueries.includes( value );
  // }

  // function getUrlForAttrs ( type, value ) {
  //     let currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
  //     currentQueries = containsAttrInUrl( type, value ) ? currentQueries.filter( item => item !== value ) : [ ...currentQueries, value ];
  //     return currentQueries.join( ',' );
  // }
  function toggleColor(color) {
    const index = selectedColors.indexOf(color);
    if (index === -1) {
      setSelectedColors([...selectedColors, color]);
    } else {
      const updatedColors = [...selectedColors];
      updatedColors.splice(index, 1);
      setSelectedColors(updatedColors);
    }
  }
  // useEffect(() => {
  //     // Example data we might want to send back to the parent
  //     const data = "Some sidebar data";
  //     onChangePrice(data);
  // }, [props.onChangePrice]);

  // const query = router.query;

  // const categories = useMemo( () => {
  //     let cats = data ? data.shopSidebarData.categories : [];
  //     // let cats =  [];
  //     let stack = [],
  //         result = [];
  //     result = cats.reduce( ( acc, cur ) => {
  //         if ( !cur.parent ) {
  //             let newNode = {
  //                 key: cur.slug,
  //                 title: <TreeNode name={ cur.name } count={ cur.count } />,
  //                 children: []
  //             };
  //             acc.push( newNode );
  //             stack.push( {
  //                 name: cur.name,
  //                 children: newNode.children
  //             } );
  //         }
  //         return acc;
  //     }, [] );

  //     let temp, children, childNode;

  //     while ( stack.length ) {
  //         temp = stack[ stack.length - 1 ];
  //         stack.pop();
  //         children = cats.filter( item => item.parent === temp.name );
  //         children.forEach( child => {
  //             childNode = {
  //                 key: child.slug,
  //                 title: <TreeNode name={ child.name } count={ child.count } />,
  //                 children: []
  //             };
  //             temp.children.push( childNode );
  //             stack.push( {
  //                 name: child.name,
  //                 children: childNode.children
  //             } );
  //         } );
  //     }

  //     return result;
  // }, [ data ] );
  const categories = useMemo(() => {
    let result = [];
    let map = {};
    allCategories &&
      allCategories.length > 0 &&
      allCategories.forEach((cat) => {
        let node = {
          key: cat.slug,
          title: (
            <TreeNode name={cat.name} count={cat?.category_product_count} />
          ),
          children: [],
          ...(cat?.guid && { parent: cat?.guid, name: cat?.name }),
          // Using object spread to conditionally add the parent property
        };

        // map[cat.name] = node;
        // if (cat.parent) {
        //     map[cat.parent].children.push(node);
        // } else {
        //     result.push(node);
        // }
        if (cat.subcategories) {
          cat.subcategories.forEach((subcat) => {
            let subNode = {
              key: subcat.guid,
              name: subcat.name,
              title: (
                <TreeNode
                  name={subcat.name}
                  count={subcat?.subcategory_product_count}
                />
              ), // Assuming no further nesting
              children: [],
              categoryName: cat.name, // No further nested categories,
              categoryGuid: cat.guid,
            };
            node.children.push(subNode);
          });
        }

        result.push(node);
      });
    return result;
  }, [allCategories]);

  // useEffect( () => {
  //     return () => {
  //         closeSidebar();
  //     }
  // }, [] )

  // useEffect( () => {
  //     if ( query.min_price && query.max_price ) {
  //         setRange( { min: parseInt( query.min_price ), max: parseInt( query.max_price ) } );
  //     } else {
  //         setRange( { min: 0, max: 1000 } );
  //     }
  // }, [ query ] )
  const [selectedSizes, setSelectedSizes] = useState([]);

  function toggleSize(size) {
    const index = selectedSizes.indexOf(size);
    if (index === -1) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      const updatedSizes = [...selectedSizes];
      updatedSizes.splice(index, 1);
      setSelectedSizes(updatedSizes);
    }
  }

  function filterByCategory(selected, info) {
    let category_SubCatetory = {
      catName: "",
      catGuid: "",
      subCategory: {
        parentCatName: "",
        parentCatGuid: "",
        subCatGuid: "",
        subCatName: "",
      },
    };
    category_SubCatetory.catName = info?.node?.name;
    category_SubCatetory.subCategory.parentCatName = info?.node?.categoryName;
    category_SubCatetory.subCategory.parentCatGuid = info?.node?.categoryGuid;
    category_SubCatetory.subCategory.subCatGuid = info?.node?.key;
    category_SubCatetory.subCategory.subCatName = info?.node?.name;
    category_SubCatetory.catGuid = info?.node?.parent;

    // const categoryData =  info?.node?.name;

    // const categories =;
    onChangeCategory(category_SubCatetory);
    setcategoryAndSubCatChange(category_SubCatetory);
    // router.push( router.pathname.replace( '[grid]', query.grid ) + '?category=' + ( selected.length ? selected[ 0 ] : '' ) );
  }
  // function resetAll(){
  //     onChangeCategory({catName:"" , catGuid:"" , subCategory:{parentCatName :"" , parentCatGuid:"" , subCatGuid:"", subCatName:""}})
  //     setRange({ min: 0, max: 100000 });
  // }

  const onChangePriceRange = (value) => {
    setRange(value);
    onChangePrice(priceRange);
  };

  // function containsAttrInUrl ( type, value ) {
  //     const currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
  //     return currentQueries && currentQueries.includes( value );
  // }

  // function getUrlForAttrs ( type, value ) {
  //     let currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
  //     currentQueries = containsAttrInUrl( type, value ) ? currentQueries.filter( item => item !== value ) : [ ...currentQueries, value ];
  //     return currentQueries.join( ',' );
  // }

  // function filterByPrice(e) {
  //     e.preventDefault();
  //     // let ranges= "Range"
  //     onChangePrice(priceRange)

  // }

  // function closeSidebar () {
  //     document.querySelector( 'body' ).classList.contains( 'sidebar-opened' ) && document.querySelector( 'body' ).classList.remove( 'sidebar-opened' );
  // }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="sidebar-overlay"></div>
      {/* <div className="sidebar-overlay" onClick={ closeSidebar }></div> */}
      <aside
        className={`sidebar-shop col-lg-3  mobile-sidebar skeleton-body skel-shop-products ${adClass} ${!loading ? "loaded" : ""} ${props.display === "none" ? "d-lg-none" : ""} ${props.right ? "" : "order-lg-first"}`}
      >
        <StickyBox className="sidebar-wrapper" offsetTop={90}>
          <div className="widget widget-price overflow-hidden">
            {loading ? (
              <div className="skel-widget"></div>
            ) : (
              <SlideToggle>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <h3 className="widget-title">
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          onToggle();
                        }}
                        className={
                          toggleState === "COLLAPSED" ? "collapsed" : ""
                        }
                        role="button"
                      >
                        Price
                      </a>
                    </h3>

                    <div ref={setCollapsibleElement}>
                      <div className="widget-body pb-0">
                        <form action="#">
                          <div className="price-slider-wrapper">
                            <InputRange
                              maxValue={100000}
                              minValue={0}
                              step={50}
                              value={priceRange}
                              onChange={onChangePriceRange}
                            />
                          </div>

                          <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                            <div className="filter-price-text">
                              Price:{" "}
                              <span id="filter-price-range">
                                &#x20B9;{priceRange.min} &mdash; &#x20B9;
                                {priceRange.max}
                              </span>
                            </div>

                            {/* <button type="submit" className="btn btn-primary" onClick={(e) => filterByPrice(e)}>Filter</button> */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </SlideToggle>
            )}
          </div>
          <div className="widget">
            {loading ? (
              <div className="skel-widget"></div>
            ) : (
              <SlideToggle>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <h3 className="widget-title">
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          onToggle();
                        }}
                        className={
                          toggleState === "COLLAPSED" ? "collapsed" : ""
                        }
                      >
                        Categories
                      </a>
                    </h3>
                    <div
                      className="overflow-hidden"
                      ref={setCollapsibleElement}
                    >
                      <div className="widget-body">
                        <Tree
                          className="no-icon cat-list border-0"
                          selectable={true}
                          showIcon={false}
                          defaultExpandedKeys={[]}
                          switcherIcon={(props) => {
                            return !props.isLeaf ? (
                              <span className="toggle"></span>
                            ) : (
                              ""
                            );
                          }}
                          selectedKeys={[]}
                          treeData={categories}
                          onSelect={filterByCategory}
                        />
                      </div>
                    </div>
                  </>
                )}
              </SlideToggle>
            )}
          </div>

          {/* {
                        ( priceRange && categoryAndSubCatChange ) && <div className="widget">
                        <ALink scroll={ false } onClick={resetAll} style={{color:"white"}} className="btn btn-primary reset-filter">Reset All Filters</ALink>
                        </div>
                    } */}

          {/* <div className="widget widget-color">
                        {
                            loading ?
                                <div className="skel-widget"></div>
                                :
                                <SlideToggle>
                                    { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                        <>
                                            <h3 className="widget-title">
                                                <a className={ toggleState === 'COLLAPSED' ? 'collapsed' : '' } href="/" onClick={(e) => { e.preventDefault(); onToggle(); } }>Color</a>
                                            </h3>
                                            <div className="overflow-hidden" ref={ setCollapsibleElement }>
                                                <div className="widget-body pb-0">
                                                    <ul className="config-swatch-list">
                                                    {shopColors.map((item, index) => (
                                        <li
                                            className={selectedColors.includes(item.name) ? 'active' : ''}
                                            key={`color-${index}`}
                                            onClick={() => toggleColor(item.name)}
                                        >
                                            <ALink style={{ backgroundColor: item.color }}>{item.name}</ALink>
                                        </li>
                                    ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    ) }
                                </SlideToggle>
                        }
                    </div>
                    <div className="widget widget-size">
            <SlideToggle>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                    <>
                        <h3 className="widget-title">
                            <a
                                className={toggleState === 'COLLAPSED' ? 'collapsed' : ''}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onToggle();
                                }}
                            >
                                Sizes
                            </a>
                        </h3>
                        <div className="overflow-hidden" ref={setCollapsibleElement}>
                            <div className="widget-body">
                                <ul className="cat-list">
                                    {shopSizes.map((item, index) => (
                                        <li
                                            className={selectedSizes.includes(item.size) ? 'active' : ''}
                                            key={`size-${index}`}
                                            onClick={() => toggleSize(item.size)}
                                        >
                                            <ALink>{item.name}</ALink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </SlideToggle>
                    </div> */}
        </StickyBox>
      </aside>
    </>
  );
}

export default ShopSidebarOne;
