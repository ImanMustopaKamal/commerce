import { call, put, takeEvery } from "redux-saga/effects";
import {
  getShippingRequested,
  getShippingSuccess,
  getShippingFailed,
} from "../reducers/slice/shipping/shippingSlice";
import { domesticPricing } from "./saga-actions/shippingActions";
import { setResponserMessage } from "../reducers/slice/responserSlice";
import { clearStorage } from "@/utils/storage";
import Router from "next/router";

function* fetchGetShipping(action) {
  try {
    const res = yield call(domesticPricing, action?.payload);
    yield put({
      type: getShippingSuccess.toString(),
      payload: {
        data: res.data.data.data.pricings,
      },
    });
  } catch (err) {
    yield put({ type: getShippingFailed.toString() });
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

function* shippingSaga() {
  yield takeEvery(getShippingRequested.toString(), fetchGetShipping);
}

export default shippingSaga;
