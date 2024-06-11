import { createSlice } from "@reduxjs/toolkit";

const storeDetailsSlice = createSlice({
  name: "storeDetails",
  initialState: {
    // Your initial state here
    storeDetails: {},
    // 'store_guid':'',
    // 'store_logo_url':'',
    // 'variants':[]
  },

  reducers: {
    setStoreDetails: (state, action) => {
      // state.user = action.payload;

      // Update the state with data from the login response
      state.storeDetails = action.payload;
    },
  },
});

export const { setStoreDetails } = storeDetailsSlice.actions;
export const getStoreDetails = (state) => state.storeDetails;

export default storeDetailsSlice.reducer;
