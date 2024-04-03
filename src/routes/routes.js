// routes.js

import About from '../pages/About';
import Home from '../pages/Home';
import Product from '../pages/Product';

const routes = [
  { path: '/', exact: true, component: <Home/> },
  { path: '/product', component: <Product/> },
  { path: '/about', component: <About/> }
];

export {routes};
