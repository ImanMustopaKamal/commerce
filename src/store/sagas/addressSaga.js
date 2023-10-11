import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAddressRequested,
  getAddressSuccess,
  getAddressFailed,
  getAddressDetailRequested,
  getAddressDetailSuccess,
  getAddressDetailFailed,
  postAddressSuccess,
  postAddressFailed,
  postAddressRequested,
  putAddressSuccess,
  putAddressFailed,
  putAddressRequested,
  deleteAddressSuccess,
  deleteAddressFailed,
  deleteAddressRequested,
  myAddressFailed,
  myAddressRequested,
  myAddressSuccess,
} from "../reducers/slice/address/addressSlice";
import {
  getAddress,
  postAddress,
  getDetailAddress,
  putAddress,
  deleteAddress,
  myAddress,
} from "./saga-actions/addressActions";
import { setResponserMessage } from "../reducers/slice/responserSlice";
import { clearStorage } from "@/utils/storage";
import Router from "next/router";

function* fetchGetAddress(action) {
  try {
    const res = yield call(getAddress, action?.payload);

    yield put({
      type: getAddressSuccess.toString(),
      payload: {
        data: res?.data?.data?.items,
      },
    });
  } catch (err) {
    yield put({ type: getAddressFailed.toString() });
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

function* fetchGetAddressDetail(action) {
  try {
    const res = yield call(getDetailAddress, action?.payload);
    yield put({
      type: getAddressDetailSuccess.toString(),
      payload: {
        data: res?.data?.data,
      },
    });
  } catch (err) {
    yield put({ type: getAddressDetailFailed.toString() });
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

function* fetchPostAddress(action) {
  try {
    const res = yield call(postAddress, action?.payload);

    yield put({
      type: postAddressSuccess.toString(),
      payload: {
        data: res?.data?.data,
      },
    });
    Router.push("/address");
  } catch (err) {
    yield put({ type: postAddressFailed.toString() });
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

function* fetchPutAddress(action) {
  try {
    const res = yield call(putAddress, action?.payload, action?.id);

    yield put({
      type: putAddressSuccess.toString(),
      payload: {
        data: res?.data?.data,
      },
    });
    Router.push("/address");
  } catch (err) {
    yield put({ type: putAddressFailed.toString() });
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

function* fetchDeleteAddress(action) {
  try {
    const res = yield call(deleteAddress, action?.payload);

    yield put({
      type: deleteAddressSuccess.toString(),
      payload: {
        data: res?.data?.data,
      },
    });
    Router.push("/address");
  } catch (err) {
    yield put({ type: deleteAddressFailed.toString() });
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

function* fetchMyAddress(action) {
  try {
    const res = yield call(myAddress, action?.payload);

    yield put({
      type: myAddressSuccess.toString(),
      payload: {
        data: res?.data?.data,
      },
    });
  } catch (err) {
    yield put({ type: myAddressFailed.toString() });
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

function* addressSaga() {
  yield takeEvery(getAddressRequested.toString(), fetchGetAddress);
  yield takeEvery(getAddressDetailRequested.toString(), fetchGetAddressDetail);
  yield takeEvery(postAddressRequested.toString(), fetchPostAddress);
  yield takeEvery(putAddressRequested.toString(), fetchPutAddress);
  yield takeEvery(deleteAddressRequested.toString(), fetchDeleteAddress);
  yield takeEvery(myAddressRequested.toString(), fetchMyAddress);
}

export default addressSaga;
