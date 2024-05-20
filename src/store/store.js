import { configureStore } from "@reduxjs/toolkit";

// import assessmentReducer from './assessmentSlice'
// import userReducer from './userSlice'
import cartReducer from "./cart/cartDetailsSlice";
import storeDetailsReducer from "./cart/storeData/storeDetailsSlice";
const store = configureStore({
  reducer: {
    // assessment: assessmentReducer,
    user: cartReducer,
    storeDetails : storeDetailsReducer

    // Add other reducers if needed
  },
});

export default store;
