// App.js

import React, { useEffect, useState } from 'react';
import {Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import { routes } from './routes/routes';
import Layout from './components/layout';
import { Provider, useStore } from 'react-redux';
import { actions as DemoAction } from "./store/demo";
import axios from 'axios';
import './assets/sass/style.scss'
import { setStoreDetails } from './store/cart/storeData/storeDetailsSlice';
// import './assets/sass/style.scss'
import { useSelector , useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const [storeId , setStoreId] = useState();
  useEffect(() => {
    
    console.log("this ran",window.location.href);
      axios.get(`http://localhost:3000/v1/store/find/store?url=${window.location.href}` , { headers: { 'service_ref': '8xuf4dev'}}).then((response)=>{
        console.log("response for store first" , response); 
        // setStoreId(response?.data?.data?.store[0]?.guid);
        if(response?.data?.data?.success === true){ localStorage.setItem("storeGuid", response?.data?.data?.store[0]?.guid);
        localStorage.setItem("storeLogoUrl", response?.data?.data?.store[0]?.store_logo_url);
        localStorage.setItem("productBannerIds", JSON.stringify(response?.data?.data?.store[0]?.banners));}
       

        const storeSfId = response?.data?.data?.store[0]?.guid;
        const storeLogoUrl = response?.data?.data?.store[0]?.store_logo_url;
        const newStoreDetails = {
          store_guid: storeSfId,
          store_logo_url: storeLogoUrl,
          variants: response?.data?.data?.store[0]?.banners,
        };
        dispatch(setStoreDetails(newStoreDetails))
      //   const storeSfId = response?.data?.data?.store?.guid;
      //   axios.get(`http://localhost:3000/v1/product/store/${storeSfId}` , { headers: { 'service_ref': '8xuf4dev'}}).then((response)=>{
        
      //   console.log("response for store do" , response);
        
      // })
      })

    
  }, [])
  
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
