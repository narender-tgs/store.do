// App.js

import React, { useEffect, useState } from 'react';
import {Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import { routes } from './routes/routes';
import Layout from './components/layout';
// import { Provider, useStore } from 'react-redux';
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
    
    // console.log("this ran",window.location.href , window.location.origin);
      axios.get(`http://localhost:3000/v1/store/find/store?url=${window.location.origin + '/'}` , { headers: { 'service_ref': '8xuf4dev'}}).then((response)=>{
        // console.log("response for store first" , response); 
        if(response?.data?.success === true){ 
          setStoreId(response?.data?.data?.store[0]?.guid);

            const favicon = document.getElementById('dynamic-favicon');
            if (favicon) {
            favicon.href = response?.data?.data?.store[0]?.store_favicon_url;
            }
       

        const storeSfId = response?.data?.data?.store[0]?.guid;
        const storeLogoUrl = response?.data?.data?.store[0]?.store_logo_url;
        const newStoreDetails = {
          store_guid: storeSfId,
          store_logo_url: storeLogoUrl,
          banners: response?.data?.data?.store[0]?.banners,
          headerBackground: response?.data?.data?.store[0]?.background_color,
          fontSize : response?.data?.data?.store[0]?.text_size,
          fontType :  response?.data?.data?.store[0]?.font,
          paymentMethods: response?.data?.data?.store[0]?.payment_method,
        
        };
        dispatch(setStoreDetails(newStoreDetails))

      //   const storeSfId = response?.data?.data?.store?.guid;
      //   axios.get(`http://localhost:3000/v1/product/store/${storeSfId}` , { headers: { 'service_ref': '8xuf4dev'}}).then((response)=>{
      
      //   console.log("response for store do" , response);
        
      // })
        }
      })

  }, [])

  // console.log("storedetailsstate" ,storeDetailsNew );
 
  // console.log("storeDetailsData" ,storeDetailsData );
 
  return (
      <div>
        {storeId && 
         <Routes>
         {routes.map((route, index) => (
           <Route
             key={index}
             path={route.path}
             exact={route.exact}
             element={<Layout>{route.component}</Layout>}
           />
         ))}
       </Routes>}
       
        
      </div>
  );
}

export default App;
