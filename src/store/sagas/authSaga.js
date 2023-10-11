import { call, put, takeEvery } from 'redux-saga/effects'
import {
  loginFailed,
  loginRequested,
  loginSuccess,
  registerFailed,
  registerRequested,
  registerSuccess,
  userFailed,
  userRequested,
  userSuccess
} from '../reducers/slice/auth/authSlice'
import { setResponserMessage } from '../reducers/slice/responserSlice'
import { postLogin, postRegister, getUsers } from './saga-actions/authActions'
import Router from 'next/router'

function* fetchPostLogin (action) {
  try {
    const res = yield call(postLogin, action?.payload)
    if (res.status == 200 || res.status == 201) {
      yield put({
        type: loginSuccess.toString(),
        payload: {
          token: res?.data?.data?.accessToken
        }
      })
      const profile = yield call(getUsers)
      yield put({
        type: userSuccess.toString(),
        payload: {
          data: profile?.data?.data
        }
      })
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      })
      Router.push(action?.payload?.url)
    }
  } catch (err) {
    yield put({ type: loginFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchPostRegister (action) {
  try {
    const res = yield call(postRegister, action?.payload)
    if (res.status == 200 || res.status == 201) {
      yield put({
        type: registerSuccess.toString(),
        payload: {
          token: res?.data?.data?.accessToken
        }
      })
      const profile = yield call(getUsers)
      yield put({
        type: userSuccess.toString(),
        payload: {
          data: profile?.data?.data
        }
      })
      yield put({
        type: userSuccess.toString(),
        payload: {
          data: { ...profile?.data?.data }
        }
      })
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      })
      Router.push('/')
    }
  } catch (err) {
    yield put({ type: registerFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchGetUser () {
  try {
    const res = yield call(getUsers)

    yield put({
      type: userSuccess.toString(),
      payload: {
        data: res.data.data
      }
    })
  } catch (err) {
    yield put({ type: userFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* authSaga () {
  yield takeEvery(loginRequested.toString(), fetchPostLogin)
  yield takeEvery(registerRequested.toString(), fetchPostRegister)
  yield takeEvery(userRequested.toString(), fetchGetUser)
}

export default authSaga