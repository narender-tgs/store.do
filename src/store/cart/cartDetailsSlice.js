import { createSlice } from "@reduxjs/toolkit";

const cartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState: {
    // Your initial state here
    cartData: "",
  },

  reducers: {
    setCartDetails: (state, action) => {
      // state.user = action.payload;

      // Update the state with data from the login response
      state.cartData = action.payload;
    },
  },
});

export const { setCartDetails } = cartDetailsSlice.actions;
export const getCartDetails = (state) => state.cartDetails;

export default cartDetailsSlice.reducer;
