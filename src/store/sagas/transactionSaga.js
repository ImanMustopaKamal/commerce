import { call, put, takeEvery } from "redux-saga/effects";
import {
  postTransactionRequested,
  postTransactionSuccess,
  postTransactionFailed,
  getDetailTransactionSuccess,
  getDetailTransactionFailed,
  getDetailTransactionRequested,
  checkPaymentSuccess,
  checkPaymentFailed,
  checkPaymentRequested,
  historyTransactionRequested,
  historyTransactionSuccess,
  historyTransactionFailed,
  historyTransactionDetailRequested,
  historyTransactionDetailSuccess,
  historyTransactionDetailFailed,
} from "../reducers/slice/transaction/transactionSlice";
import {
  getDetailTransaction,
  historyTransaction,
  historyTransactionDetail,
  postTransaction,
} from "./saga-actions/transactionActions";
import { setResponserMessage } from "../reducers/slice/responserSlice";
import { clearStorage } from "@/utils/storage";
import Router from "next/router";
import store from "@/store";

function* fetchPostTransaction(action) {
  try {
    const res = yield call(postTransaction, action?.payload);
    yield put({
      type: postTransactionSuccess.toString(),
      payload: {
        data: res.data.data,
      },
    });
    Router.push(`/virtual-account/${res.data.data.id}`);
  } catch (err) {
    yield put({ type: postTransactionFailed.toString() });
    if (err?.data?.code === 401) {
      clearStorage(["accessToken"]);
      Router.push({ pathname: "/auth/login", query: { toUrl: Router.asPath } });
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message,
      },
    });
  }
}

function* fetchGetDetailTransaction(action) {
  try {
    const res = yield call(getDetailTransaction, action?.payload);
    yield put({
      type: getDetailTransactionSuccess.toString(),
      payload: {
        data: res.data.data,
      },
    });
  } catch (err) {
    yield put({ type: getDetailTransactionFailed.toString() });
    if (err?.data?.code === 401) {
      clearStorage(["accessToken"]);
      Router.push({ pathname: "/auth/login", query: { toUrl: Router.asPath } });
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message,
      },
    });
  }
}

function* fetchCheckPaymentStatus(action) {
  try {
    const res = yield call(getDetailTransaction, action?.payload);
    yield put({
      type: checkPaymentSuccess.toString(),
      payload: {
        data: res.data.data,
      },
    });
    if (res.data.data.payment_status === "COMPLETED") {
      clearStorage(["checkout", "totalPrice"]);
      Router.push(`/place-order/success`);
    } else {
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: 500,
          message: "pembayaran belum masuk",
        },
      });
    }
  } catch (err) {
    yield put({ type: checkPaymentFailed.toString() });
    if (err?.data?.code === 401) {
      clearStorage(["accessToken"]);
      Router.push({ pathname: "/auth/login", query: { toUrl: Router.asPath } });
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message,
      },
    });
  }
}

function* fetchHistoryTransaction(action) {
  try {
    const res = yield call(historyTransaction, action?.payload);
    console.log("fetchHistoryTransaction: ", res.data.data);
    yield put({
      type: historyTransactionSuccess.toString(),
      payload: {
        data: res.data.data,
      },
    });
  } catch (err) {
    yield put({ type: historyTransactionFailed.toString() });
    if (err?.data?.code === 401) {
      clearStorage(["accessToken"]);
      Router.push({ pathname: "/auth/login", query: { toUrl: Router.asPath } });
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message,
      },
    });
  }
}

function* fetchHistoryTransactionDetail(action) {
  try {
    const res = yield call(historyTransactionDetail, action?.payload);
    yield put({
      type: historyTransactionDetailSuccess.toString(),
      payload: {
        data: res.data.data,
      },
    });
  } catch (err) {
    yield put({ type: historyTransactionDetailFailed.toString() });
    if (err?.data?.code === 401) {
      clearStorage(["accessToken"]);
      Router.push({ pathname: "/auth/login", query: { toUrl: Router.asPath } });
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message,
      },
    });
  }
}

function* transactionSaga() {
  yield takeEvery(postTransactionRequested.toString(), fetchPostTransaction);
  yield takeEvery(
    getDetailTransactionRequested.toString(),
    fetchGetDetailTransaction
  );
  yield takeEvery(checkPaymentRequested.toString(), fetchCheckPaymentStatus);
  yield takeEvery(historyTransactionRequested.toString(), fetchHistoryTransaction);
  yield takeEvery(historyTransactionDetailRequested.toString(), fetchHistoryTransactionDetail);
}

export default transactionSaga;
