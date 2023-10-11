import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: false,
  address: [],
  addressDetail: {},
  myAddress: {},
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    getAddressRequested: (state) => {
      state.isLoading = true;
    },
    getAddressSuccess: (state, action) => {
      state.isLoading = false;
      const address = action.payload.data.sort(function (x, y) {
        return x.isPrimary === y.isPrimary ? 0 : x.isPrimary ? -1 : 1;
      });
      state.address = address;
    },
    getAddressFailed: (state) => {
      state.isLoading = false;
    },
    postAddressRequested: (state) => {
      state.isLoading = true;
    },
    postAddressSuccess: (state, action) => {
      state.isLoading = false;
      // state.address = action.payload.data;
    },
    postAddressFailed: (state) => {
      state.isLoading = false;
    },
    getAddressDetailRequested: (state) => {
      state.isLoading = true;
    },
    getAddressDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.addressDetail = action?.payload?.data;
    },
    getAddressDetailFailed: (state) => {
      state.isLoading = false;
    },
    putAddressRequested: (state) => {
      state.isLoading = true;
    },
    putAddressSuccess: (state, action) => {
      state.isLoading = false;
      // state.addressDetail = action?.payload?.data;
    },
    putAddressFailed: (state) => {
      state.isLoading = false;
    },
    deleteAddressRequested: (state) => {
      state.isLoading = true;
    },
    deleteAddressSuccess: (state, action) => {
      state.isLoading = false;
      // state.addressDetail = action?.payload?.data;
    },
    deleteAddressFailed: (state) => {
      state.isLoading = false;
    },
    myAddressRequested: (state) => {
      state.isLoading = true;
    },
    myAddressSuccess: (state, action) => {
      state.isLoading = false;
      state.myAddress = action?.payload?.data;
    },
    myAddressFailed: (state) => {
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

export const {
  getAddressRequested,
  getAddressSuccess,
  getAddressFailed,
  postAddressRequested,
  postAddressSuccess,
  postAddressFailed,
  getAddressDetailRequested,
  getAddressDetailSuccess,
  getAddressDetailFailed,
  putAddressRequested,
  putAddressSuccess,
  putAddressFailed,
  deleteAddressRequested,
  deleteAddressSuccess,
  deleteAddressFailed,
  myAddressRequested,
  myAddressSuccess,
  myAddressFailed,
} = addressSlice.actions;

export default addressSlice.reducer;
