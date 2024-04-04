import { createSlice } from "@reduxjs/toolkit";

const cartDetailsSlice = createSlice({

  reducers: {
    setCartDetails: (state, action) => {
      // state.user = action.payload;
     

      // Update the state with data from the login response
      state.CartData = action.payload;
     
    },
  },
});

export const { setCartDetails } = cartDetailsSlice.actions;
export const getCartDetails = (state) => state.user;

export default cartDetailsSlice.reducer;
