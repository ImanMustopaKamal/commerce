import { combineReducers } from "@reduxjs/toolkit"
import exampleSlice from "./slice/exampleSlice"
import responserSlice from "./slice/responserSlice"
import optionSlice from "./slice/options/optionSlice"
import authSlice from "./slice/auth/authSlice"
import productSlice from "./slice/product/productSlice"
import addressSlice from "./slice/address/addressSlice"
import shippingSlice from "./slice/shipping/shippingSlice"
import transactionSlice from "./slice/transaction/transactionSlice"

const reducers = combineReducers({
  example: exampleSlice,
  responser: responserSlice,
  options: optionSlice,
  auth: authSlice,
  product: productSlice,
  address: addressSlice,
  shipping: shippingSlice,
  transaction: transactionSlice,
})

export default reducers