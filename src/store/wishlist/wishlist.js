import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishListDetails",
  initialState: {
    // Your initial state here
    wishListItems: "",
  },

  reducers: {
    setWishListItems: (state, action) => {
      // state.user = action.payload;

      // Update the state with data from the login response
      state.wishListItems = action.payload;
    },
  },
});

export const { setWishListItems } = wishListSlice.actions;
export const getWishListItems = (state) => state.wishListDetails;

export default wishListSlice.reducer;
