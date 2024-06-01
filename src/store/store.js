import { configureStore } from "@reduxjs/toolkit";
import { persistStore , persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import assessmentReducer from './assessmentSlice'
// import userReducer from './userSlice'
import cartReducer from "./cart/cartDetailsSlice";
import storeDetailsReducer from "./cart/storeData/storeDetailsSlice";
import storage from "redux-persist/lib/storage";
const persistConfig={
  key:'root',
  storage,
}

const persistedReducer =persistReducer(persistConfig, cartReducer);
// const persistedReducer1 =persistReducer(persistConfig, storeDetailsReducer);

const store = configureStore({
  reducer: {
    // assessment: assessmentReducer,
    storeDetails: storeDetailsReducer,
    cartDetails : persistedReducer
    // storeDetails : persistedReducer1

    // Add other reducers if needed
  },
});
const persistor=persistStore(store);
export {store, persistor};
