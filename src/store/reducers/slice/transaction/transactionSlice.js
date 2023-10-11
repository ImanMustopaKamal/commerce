import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: false,
  transactions: [],
  myTransactions: [],
  transactionDetail: {},
  myTransactionDetail: [],
  totalTransaction: 0,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    postTransactionRequested: (state) => {
      state.isLoading = true;
    },
    postTransactionSuccess: (state, action) => {
      state.isLoading = false;
      console.log("action: ", action);
      // state.address = action.payload.data;
    },
    postTransactionFailed: (state) => {
      state.isLoading = false;
    },
    getDetailTransactionRequested: (state) => {
      state.isLoading = true;
    },
    getDetailTransactionSuccess: (state, action) => {
      state.isLoading = false;
      state.transactionDetail = action.payload.data;
    },
    getDetailTransactionFailed: (state) => {
      state.isLoading = false;
    },
    checkPaymentRequested: (state) => {
      state.isLoading = true;
    },
    checkPaymentSuccess: (state, action) => {
      state.isLoading = false;
    },
    checkPaymentFailed: (state) => {
      state.isLoading = false;
    },
    historyTransactionRequested: (state) => {
      state.isLoading = true;
    },
    historyTransactionSuccess: (state, action) => {
      state.isLoading = false;
      state.myTransactions = action?.payload?.data?.items || [];
      state.totalTransaction = action?.payload?.data?.totalItems || 0;
    },
    historyTransactionFailed: (state) => {
      state.isLoading = false;
    },
    historyTransactionDetailRequested: (state) => {
      state.isLoading = true;
    },
    historyTransactionDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.myTransactionDetail = action?.payload?.data?.items || [];
    },
    historyTransactionDetailFailed: (state) => {
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
  postTransactionRequested,
  postTransactionSuccess,
  postTransactionFailed,
  getDetailTransactionRequested,
  getDetailTransactionSuccess,
  getDetailTransactionFailed,
  checkPaymentRequested,
  checkPaymentSuccess,
  checkPaymentFailed,
  historyTransactionRequested,
  historyTransactionSuccess,
  historyTransactionFailed,
  historyTransactionDetailRequested,
  historyTransactionDetailSuccess,
  historyTransactionDetailFailed,
} = transactionSlice.actions;

export default transactionSlice.reducer;
