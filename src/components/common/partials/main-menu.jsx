// Import Custom Component
import ALink from "../ALink";

// Import Utils
import { mainMenu } from "../../../utils/data/menu";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStoreDetails } from "../../../store/cart/storeData/storeDetailsSlice";
function MainMenu({ router }) {
  const storeDetails = useSelector(getStoreDetails);

  const fontType = storeDetails?.storeDetails?.fontType;
  const fontSize = storeDetails?.storeDetails?.fontSize;

  const location = useLocation();
  function isOtherPage() {
    return mainMenu.other.find(
      (variation) => variation.url === location.pathname,
    );
  }

  return (
    <>
      <nav className="main-nav w-100">
        <ul
          className="menu sf-js-enabled sf-arrows"
          style={{ fontFamily: fontType }}
        >
          <li className={location.pathname === "/" ? "active" : ""}>
            <ALink style={{ fontSize: fontSize + "px" }} href="/">
              Home
            </ALink>
          </li>
          <li className={location.pathname === "/product" ? "active" : ""}>
            <ALink
              style={{ fontSize: fontSize + "px" }}
              href="/product"
              state="renderAgain"
            >
              Products
            </ALink>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <ALink style={{ fontSize: fontSize + "px" }} href="/about">
              About
            </ALink>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <ALink style={{ fontSize: fontSize + "px" }} href="/contact_us">
              Contact Us
            </ALink>
          </li>
          {/* <li className={location.pathname === "/account" ? "active" : ""}>
            <ALink style={{ fontSize: fontSize + "px" }} href="pages/account">
              Account 
            </ALink>
          </li> */}
          {/* <li className={location.pathname === "/login" ? "active" : ""}>
          </li> */}
          
          {/* <li className={ pathname?.startsWith( '/shop' ) ? 'active' : '' }>
                        <ALink href="/shop" className="sf-with-ul">Shop</ALink>
                        <div className="megamenu megamenu-fixed-width megamenu-3cols">
                            <div className="row">
                                <div className="col-lg-4">
                                    <ALink href="#" className="nolink">VARIATION 1</ALink>
                                    <ul className="submenu">
                                        {
                                            mainMenu.shop.variation1.map( ( variations, index ) => (
                                                <li key={ "menu-item" + index }>
                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                </li>
                                            ) )
                                        }
                                    </ul>
                                </div>

                                <div className="col-lg-4">
                                    <ALink href="#" className="nolink">VARIATION 2</ALink>
                                    <ul className="submenu">
                                        {
                                            mainMenu.shop.variation2.map( ( variations, index ) => (
                                                <li key={ "menu-item" + index }>
                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                </li>
                                            ) )
                                        }
                                    </ul>
                                </div>

                                <div className="col-lg-4 p-0">
                                    <div className="menu-banner">
                                        <figure>
                                            <img src="images/menu-banner.jpg" alt="Menu banner" width="300" height="300" />
                                        </figure>
                                        <div className="banner-content">
                                            <h4>
                                                <span className="">UP TO</span><br />
                                                <b className="">50%</b>
                                                <i>OFF</i>
                                            </h4>
                                            <ALink href="/shop" className="btn btn-sm btn-dark text-white">SHOP NOW</ALink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className={ pathname?.startsWith( '/product' ) ? 'active' : '' }>
                        <ALink href="/product/default/bicycle-three" className="sf-with-ul">Products</ALink>
                        <div className="megamenu megamenu-fixed-width">
                            <div className="row">
                                <div className="col-lg-4">
                                    <ALink href="#" className="nolink">PRODUCT PAGES</ALink>
                                    <ul className="submenu">
                                        {
                                            mainMenu.product.pages.map( ( variations, index ) => (
                                                <li key={ "menu-item" + index }>
                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                </li>
                                            ) )
                                        }
                                    </ul>
                                </div>

                                <div className="col-lg-4">
                                    <ALink href="#" className="nolink">PRODUCT LAYOUTS</ALink>
                                    <ul className="submenu">
                                        {
                                            mainMenu.product.layout.map( ( variations, index ) => (
                                                <li key={ "menu-item" + index }>
                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                </li>
                                            ) )
                                        }
                                        <li >
                                            <ALink href="#">BUILD YOUR OWN</ALink>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-lg-4 p-0">
                                    <div className="menu-banner menu-banner-2">
                                        <figure>
                                            <img src="images/menu-banner-1.jpg" alt="Menu banner" width="380" height="790"
                                                className="product-promo" />
                                        </figure>
                                        <i>OFF</i>
                                        <div className="banner-content">
                                            <h4>
                                                <span className="">UP TO</span><br />
                                                <b className="">50%</b>
                                            </h4>
                                        </div>

                                        <ALink href="/shop" className="btn btn-sm btn-dark text-white">SHOP NOW</ALink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className={ pathname === '/pages/blog' ? 'active' : '' }>
                        <ALink href="/pages/blog">Blog</ALink>
                    </li> */}
          {/* <li className={ isOtherPage() ? 'active' : '' }>
                        <ALink href="#" className="sf-with-ul">Pages</ALink>
                        <ul>
                            {
                                mainMenu.other.map( ( variations, index ) => (
                                    <li key={ "menu-item" + index }>
                                        <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                    </li>
                                ) )
                            }
                        </ul>
                    </li> */}
          {/* <li>
                        <a href="https://1.envato.market/DdLk5" target="_blank">Buy Porto!</a>
                    </li> */}
        </ul>
      </nav>
    </>
  );
}

export default MainMenu;
