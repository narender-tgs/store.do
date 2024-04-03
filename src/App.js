// App.js

import React, { useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import { routes } from './routes/routes';
import Layout from './components/layout';
import { Provider, useStore } from 'react-redux';
import { actions as DemoAction } from "./store/demo";

import './assets/sass/style.scss'
// import './assets/sass/style.scss'

function App() {
  // const store = useStore();

  //   useEffect(() => {
  //       if (store.getState().demo.current !== 27) {
  //           store.dispatch(DemoAction.refreshStore(27));
  //       }
  //   }, [])
  return (
      <div>
        {/* <Navbar/> */}
        {/* <Provider store={store}> */}
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<Layout>{route.component}</Layout>}
            />
          ))}
        </Routes>
        {/* </Provider> */}
      </div>
  );
}

export default App;
