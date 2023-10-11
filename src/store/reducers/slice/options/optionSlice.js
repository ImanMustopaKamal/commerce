import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: false,
  listProvince: [],
  listCity: [],
  listDistrict: [],
  listArea: [],
};

export const optionSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    getProvinceRequested: (state) => {
      state.loading = true;
    },
    getProvinceSuccess: (state, action) => {
      state.loading = false;
      state.listProvince = action?.payload?.items;
    },
    getProvinceFailed: (state) => {
      state.loading = false;
    },
    getCityRequested: (state) => {
      state.loading = true;
    },
    getCitySuccess: (state, action) => {
      state.loading = false;
      state.listCity = action?.payload?.items;
    },
    getCityFailed: (state) => {
      state.loading = false;
    },
    getDistrictRequested: (state) => {
      state.loading = true;
    },
    resetDistrictRequested: (state) => {
      state.listDistrict = [];
    },
    getDistrictSuccess: (state, action) => {
      state.loading = false;
      state.listDistrict = action?.payload?.items;
    },
    getDistrictFailed: (state) => {
      state.loading = false;
    },
    getAreaRequested: (state) => {
      state.loading = true;
    },
    resetAreaRequested: (state) => {
      state.listArea = [];
    },
    getAreaSuccess: (state, action) => {
      state.loading = false;
      state.listArea = action?.payload?.items;
    },
    getAreaFailed: (state) => {
      state.loading = false;
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
  getCityFailed,
  getCityRequested,
  getCitySuccess,
  getProvinceFailed,
  getProvinceRequested,
  getProvinceSuccess,
  getDistrictFailed,
  getDistrictRequested,
  resetDistrictRequested,
  getDistrictSuccess,
  getAreaFailed,
  getAreaRequested,
  resetAreaRequested,
  getAreaSuccess,
} = optionSlice.actions;

export default optionSlice.reducer;
