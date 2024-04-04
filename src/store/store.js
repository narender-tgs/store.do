import { configureStore } from "@reduxjs/toolkit";

// import assessmentReducer from './assessmentSlice'
// import userReducer from './userSlice'
import cartReducer from "./cart/cartDetailsSlice";

const store = configureStore({
  reducer: {
    // assessment: assessmentReducer,
    user: cartReducer,
    // Add other reducers if needed
  },
});

export default store;
