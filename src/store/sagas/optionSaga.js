import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getProvinceFailed,
  getProvinceSuccess,
  getProvinceRequested,
  getCityFailed,
  getCityRequested,
  getCitySuccess,
  getDistrictFailed,
  getDistrictRequested,
  getDistrictSuccess,
  getAreaFailed,
  getAreaRequested,
  getAreaSuccess
} from '../reducers/slice/options/optionSlice'
import { setResponserMessage } from '../reducers/slice/responserSlice'
import { getCity, getDistrict, getProvince, getArea } from './saga-actions/optionActions'

function* fetchGetProvince () {
  try {
    const res = yield call(getProvince)

    yield put({
      type: getProvinceSuccess.toString(),
      payload: {
        items: res.data.data.items
      }
    })
  } catch (err) {
    yield put({ type: getProvinceFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.response?.data?.code,
        message: err?.response?.data?.message
      }
    })
  }
}

function* fetchGetCities (action) {
  try {
    const res = yield call(getCity, action?.payload)

    yield put({
      type: getCitySuccess.toString(),
      payload: {
        items: res.data.data.items
      }
    })
  } catch (err) {
    yield put({ type: getCityFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.response?.data?.code,
        message: err?.response?.data?.message
      }
    })
  }
}

function* fetchGetDistrict (action) {
  try {
    const res = yield call(getDistrict, action?.payload)

    yield put({
      type: getDistrictSuccess.toString(),
      payload: {
        items: res.data.data.items
      }
    })
  } catch (err) {
    yield put({ type: getDistrictFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.response?.data?.code,
        message: err?.response?.data?.message
      }
    })
  }
}

function* fetchGetArea (action) {
  try {
    const res = yield call(getArea, action?.payload)

    yield put({
      type: getAreaSuccess.toString(),
      payload: {
        items: res.data.data.items
      }
    })
  } catch (err) {
    yield put({ type: getAreaFailed.toString })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.response?.data?.code,
        message: err?.response?.data?.message
      }
    })
  }
}

function* optionSaga () {
  yield takeEvery(getProvinceRequested.toString(), fetchGetProvince)
  yield takeEvery(getCityRequested.toString(), fetchGetCities)
  yield takeEvery(getDistrictRequested.toString(), fetchGetDistrict)
  yield takeEvery(getAreaRequested.toString(), fetchGetArea)
}

export default optionSaga