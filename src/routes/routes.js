// routes.js

import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Checkout from "../pages/checkout/Checkout";
import ProductDetails from "../pages/productDetails/productDetails";
import Thankyou from "../pages/thankyou";
import Cart from "../pages/cart/Cart";
import ProductList from "../pages/productList/prouductList";
import NewSale from "../components/sale/NewSale";
import ForgotPassword from "../pages/forgot-password.js";
import Login from "../pages/login.js";
import LoginModal from "../components/features/modals/login-modal.jsx";
import Register from "../pages/register.js";
const routes = [
  { path: "/", exact: true, component: <Home /> },
  { path: "/product", component: <Product /> },
  { path: "/product/Sale/:SaleId", component: <Product /> },
  { path: "/about", component: <About /> },
  { path: "/contact_us", component: <ContactUs /> },
  { path: "pages/checkout", component: <Checkout /> },
  { path: "pages/login", component: <Login /> },
  { path: "pages/register", component: <Register /> },
  {
    path: "/product_detail/:productName/:productId",
    component: <ProductDetails />,
  },
  { path: "/thankyou", component: <Thankyou /> },
  { path: "/pages/cart", component: <Cart /> },
  { path: "/product/list", component: <ProductList /> },
  { path: "/pages/product/Sale", component: <NewSale /> },
  { path: "/pages/forgot-password", component: <ForgotPassword /> },


  // { path: '/contact', component: <About/> }
];

export { routes };
