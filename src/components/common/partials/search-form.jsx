import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/router';
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Custom Component
import ALink from "../ALink";
import axios from "axios";
import lappy from "../../../assets/images/products/Laptops/macbook Pro max.jpg";
import { useSelector } from "react-redux";
import { getStoreDetails } from "../../../store/cart/storeData/storeDetailsSlice";
import { useLocation } from "react-router-dom";
import LoginModal from "../../features/modals/login-modal";
function SearchForm(props) {
  const storeDatas = useSelector(getStoreDetails);
  const fontType = storeDatas?.storeDetails?.fontType;
  const fontSize = storeDatas?.storeDetails?.fontSize;
  // console.log("storeDatas for searching " , storeDatas);

  // const router = useRouter();
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState();
  // const [ searchProducts, { data } ] = {data:[]};
  const data = [];
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  // useEffect( () => {
  //     setSearch( "" );
  //     setCat( "" );
  // }, [ router.query.slug ] )
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
    if (search.length > 2) {
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        // searchProducts( { variables: { search: search, category: cat } } );
        setTimer(null);
      }, 500);

      setTimer(timerId);
    }
  }, [search, cat]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/v1/product/store/${storeDatas?.storeDetails?.store_guid}?search=${search}`,
        { headers: { service_ref: "8xuf4dev" } },
      )
      .then((response) => {
        const products_variant = response.data.data.products.map((element) => {
          return {
            ...element,
            variants:
              element?.options &&
              element?.options.length > 0 &&
              addVariants(element.options),
          };
        });
        // Access the response data
        const responseData = products_variant;
        // console.log("response Data for products-->", responseData);
        setProducts(responseData);
        // Process the response data here
      })
      .catch((error) => {
        // Handle any errors
      });
  }, [search]);

  // useEffect( () => {
  //     document.querySelector( '.header-search.show-results' ) && document.querySelector( '.header-search.show-results' ).classList.remove( 'show-results' );
  // }, [ router.pathname ] )

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  function onCatSelect(e) {
    setCat(e.target.value);
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
    // console.log("searched item->", e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    // router.push( {
    //     pathname: '/shop',
    //     query: {
    //         search: search,
    //         category: cat
    //     }
    // } );
  }
  const location = useLocation();


  return (
  
    <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right d-none d-sm-block">
    

      {/* <a
        href="#"
        className="search-toggle"
        role="button"
        onClick={onSearchClick}
      >
        <i className="icon-magnifier"></i>
      </a> */}
      <div className="row">
          <LoginModal/>

      <form action="#" method="get" onSubmit={(e) => onSubmitSearchForm(e)}>
        <div className="header-search-wrapper">

        {/* <ul
        className="menu sf-js-enabled sf-arrows mr-4"
        style={{ fontFamily: fontType }}
      > */}
        {/* <li className={location.pathname === "/" ? "active" : ""}></li> */}
        {/* <ALink style={{ fontSize: fontSize + "px" }} href="/login">
          Login
        </ALink> */}
      {/* </ul> */}

          <input
            type="search"
            className="form-control"
            name="q"
            id={`${props.type === 1 ? "q" : "qqq"}`}
            placeholder="I'm searching for..."
            value={search}
            required
            onChange={(e) => onSearchChange(e)}
          />
          {/* <div className="select-custom font2">
                        <select id={ `${props.type === 1 ? 'cat1' : 'cat'}` } name="cat" value={ cat } onChange={ ( e ) => onCatSelect( e ) }>
                            <option value="">All Categories</option>
                            <option value="fashion">Fashion</option>
                            <option value="women">- Women</option>
                            <option value="men">- Men</option>
                            <option value="jewellery">- Jewellery</option>
                            <option value="kids-fashion">- Kids Fashion</option>
                            <option value="electronics">Electronics</option>
                            <option value="smart-tvs">- Smart TVs</option>
                            <option value="cameras">- Cameras</option>
                            <option value="games">- Games</option>
                            <option value="home-garden">Home &amp; Garden</option>
                            <option value="motors">Motors</option>
                            <option value="cars-and-trucks">- Cars and Trucks</option>
                            <option value="motorcycles-powersports">- Motorcycles &amp; Powersports</option>
                            <option value="parts-accessories">- Parts &amp; Accessories</option>
                            <option value="boats">- Boats</option>
                            <option value="auto-tools-supplies">- Auto Tools &amp; Supplies</option>
                        </select>
                    </div> */}

          <button
            className="btn icon-magnifier"
            title="search"
            type="submit"
          ></button>

          <div className="live-search-list bg-white">
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <ALink
                  href={`/product_detail/${product.name}/${product.guid}`}
                  state={product}
                  className="autocomplete-suggestion"
                  key={`search-result-${index}`}
                >
                  <LazyLoadImage
                    src={
                      product &&
                      product?.imageUrls?.length > 0 &&
                      product?.imageUrls[0]
                    }
                    width={40}
                    height={40}
                    alt="product"
                  />
                  <div
                    className="search-name"
                    dangerouslySetInnerHTML={removeXSSAttacks(
                      matchEmphasize(product.name)
                    )}
                  ></div>
                  <span className="search-price">
                    {
                      <span className="product-price">{products.price}</span>
                      // product.price[ 0 ] == product.price[ 1 ] ?
                      //     <span className="product-price">{ '$' + product.price[ 0 ].toFixed( 2 ) }</span>
                      //     : product.variants.length > 0 ?
                      //         <span className="product-price">{ '$' + product.price[ 0 ].toFixed( 2 ) } &ndash; { '$' + product.price[ 1 ].toFixed( 2 ) }</span>
                      //         : <>
                      //             <span className="old-price">{ '$' + product.price[ 1 ].toFixed( 2 ) }</span>
                      //             <span className="product-price">{ '$' + product.price[ 0 ].toFixed( 2 ) }</span>
                      //         </>
                    }
                  </span>
                </ALink>
              ))}
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

export default SearchForm;
