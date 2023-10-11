import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: false,
  shippingOptions: [],
};

export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    getShippingRequested: (state) => {
      state.isLoading = true;
    },
    getShippingSuccess: (state, action) => {
      state.isLoading = false;
      state.shippingOptions = action?.payload?.data;
    },
    getShippingFailed: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const { getShippingRequested, getShippingSuccess, getShippingFailed } =
  shippingSlice.actions;

export default shippingSlice.reducer;
