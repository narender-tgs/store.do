// routes.js

import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Home from '../pages/Home'
import Product from '../pages/Product';
import Checkout from '../pages/checkout/Checkout';
import ProductDetails from '../pages/productDetails/productDetails';
import Thankyou from '../pages/thankyou';
import Cart from '../pages/cart/Cart';
import ProductList from '../pages/productList/prouductList';
import NewSale from '../components/sale/NewSale';

const routes = [
  { path: '/', exact: true, component: <Home/> },
  { path: '/product', component: <Product/> },
  { path: '/about', component: <About/> },
  {path: '/contact_us', component:<ContactUs/>},
  {path: 'pages/checkout', component:<Checkout/>},
  {path: '/product_detail/:productName/:productId', component:<ProductDetails/>},
  {path: '/thankyou', component:<Thankyou/>},
  {path: '/pages/cart', component:<Cart/>},
  {path: '/pages/product/list', component:<ProductList/>},
  {path: '/pages/product/Sale', component:<NewSale/>},

  


  
  // { path: '/contact', component: <About/> }
];

export {routes};
