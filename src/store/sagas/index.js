import { all } from "redux-saga/effects";
import exampleSaga from "./exampleSaga";
import optionSaga from "./optionSaga";
import authSaga from "./authSaga";
import productSaga from "./productSaga";
import addressSaga from "./addressSaga";
import shippingSaga from "./shippingSaga";
import transactionSaga from "./transactionSaga";

export default function* rootSaga() {
  yield all([
    exampleSaga(),
    optionSaga(),
    authSaga(),
    productSaga(),
    addressSaga(),
    shippingSaga(),
    transactionSaga(),
  ]);
}
