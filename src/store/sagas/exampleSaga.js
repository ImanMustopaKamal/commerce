import { call, put, delay, takeEvery } from 'redux-saga/effects'
import { getExampleRequested, getExampleFailed, getExampleSuccess } from '../reducers/slice/exampleSlice'
import { getExample } from './saga-actions/exampleActions'
import { setResponserMessage } from '../reducers/slice/responserSlice'

function* fetchGetExample (action) {
  try {
    const res = yield call(getExample, action?.payload)

    yield put({
      type: getExampleSuccess.toString(),
      payload: {
        data: res.data.data
      }
    })
  } catch (err) {
    yield put({ type: getExampleFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.response?.data?.code,
        message: err?.response?.data?.message
      }
    })
  }
}

function* exampleSaga () {
  yield takeEvery(getExampleRequested.toString(), fetchGetExample)
}

export default exampleSaga