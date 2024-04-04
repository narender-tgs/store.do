// routes.js

import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Home from '../pages/Home'
import Product from '../pages/Product';
import Checkout from '../pages/checkout/Checkout';

const routes = [
  { path: '/', exact: true, component: <Home/> },
  { path: '/product', component: <Product/> },
  { path: '/about', component: <About/> },
  {path: '/contact_us', component:<ContactUs/>},
  {path: '/checkout', component:<Checkout/>},

  
  // { path: '/contact', component: <About/> }
];

export {routes};
