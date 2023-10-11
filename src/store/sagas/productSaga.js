import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getProductCategoryFailed,
  getProductCategoryRequested,
  getProductCategorySuccess,
  getProductFailed,
  getProductRequested,
  getProductSuccess,
  getProductDetailFailed,
  getProductDetailRequested,
  getProductDetailSuccess,
  postAddToChartFailed,
  postAddToChartRequested,
  postAddToChartSuccess,
  getCartFailed,
  getCartRequested,
  getCartSuccess,
  updateCartItemFailed,
  updateCartItemRequested,
  updateCartItemSuccess,
  postWishlistFailed,
  postWishlistRequested,
  postWishlistSuccess,
  getWishlistFailed,
  getWishlistRequested,
  getWishlistSuccess
} from '../reducers/slice/product/productSlice'
import { getProductCategory, getProduct, getProductDetail, postAddToChart, getCart, updateCartItem, addWishlist, getWishlist } from './saga-actions/productActions'
import { setResponserMessage } from '../reducers/slice/responserSlice'
import { clearStorage } from '@/utils/storage'
import Router from 'next/router'

function* fetchGetProductCategory () {
  try {
    const res = yield call(getProductCategory)

    yield put({
      type: getProductCategorySuccess.toString(),
      payload: {
        data: res?.data?.data?.items
      }
    })
  } catch (err) {
    yield put({ type: getProductCategoryFailed.toString() })
    if (err?.data?.code === 401) {
      clearStorage(['accessToken'])
      Router.push({ pathname: '/auth/login', query: { toUrl: Router.asPath } })
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchGetProduct (action) {
  try {
    const res = yield call(getProduct, action?.payload)

    yield put({
      type: getProductSuccess.toString(),
      payload: {
        data: res?.data?.data?.items
      }
    })
  } catch (err) {
    yield put({ type: getProductFailed.toString() })
    if (err?.data?.code === 401) {
      clearStorage(['accessToken'])
      Router.push({ pathname: '/auth/login', query: { toUrl: Router.asPath } })
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchGetProductDetail (action) {
  try {
    const res = yield call(getProductDetail, action?.payload)

    yield put({
      type: getProductDetailSuccess.toString(),
      payload: {
        data: res.data.data
      }
    })
  } catch (err) {
    yield put({ type: getProductDetailFailed.toString })
    if (err?.data?.code === 401) {
      clearStorage(['accessToken'])
      Router.push({ pathname: '/auth/login', query: { toUrl: Router.asPath } })
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchPostAddToChart (action) {
  try {
    const res = yield call(postAddToChart, action?.payload)

    if (res.data.code == 200 || res.data.code == 201) {
      yield put({
        type: postAddToChartSuccess.toString()
      })
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      })
    }
  } catch (err) {
    yield put({ type: postAddToChartFailed.toString() })
    if (err?.data?.code === 401) {
      clearStorage(['accessToken'])
      Router.push({ pathname: '/auth/login', query: { toUrl: Router.asPath } })
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchGetCart () {
  try {
    const res = yield call(getCart)
    yield put({
      type: getCartSuccess.toString(),
      payload: {
        data: res.data.data.items,
        id: res.data.data.id
      }
    })
  } catch (err) {
    yield put({ type: getCartFailed.toString() })
    if (err?.data?.code === 401) {
      clearStorage(['accessToken'])
      Router.push({ pathname: '/auth/login', query: { toUrl: Router.asPath } })
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchUpdateCartItem (action) {
  try {
    const res = yield call(updateCartItem, action?.payload)

    if (res?.data.code === 200 || res?.data?.code === 201) {
      yield put({ type: updateCartItemSuccess.toString() })
    }
  } catch (err) {
    yield put({ type: updateCartItemFailed.toString() })
    if (err?.data?.code === 401) {
      clearStorage(['accessToken'])
      Router.push({ pathname: '/auth/login', query: { toUrl: Router.asPath } })
    }
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchPostAddToWishlist (action) {
  try {
    const res = yield call(addWishlist, action?.payload)

    if (res?.data?.code === 200 || res?.data.code === 201) {
      yield put({ type: postWishlistSuccess.toString() })
      yield put({
        type: setResponserMessage.toString(),
        payload: {
          code: res.data.code,
          message: res.data.message
        }
      })
    }
  } catch (err) {
    yield put({ type: postWishlistFailed.toString() })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* fetchGetWishlist () {
  try {
    const res = yield call(getWishlist)

    yield put({
      type: getWishlistSuccess.toString(),
      payload: {
        data: res.data.data.wishlist
      }
    })
  } catch (err) {
    yield put({ type: getWishlistFailed.toString })
    yield put({
      type: setResponserMessage.toString(),
      payload: {
        code: err?.data?.code,
        message: err?.data?.message
      }
    })
  }
}

function* productSaga () {
  yield takeEvery(getProductCategoryRequested.toString(), fetchGetProductCategory)
  yield takeEvery(getProductRequested.toString(), fetchGetProduct)
  yield takeEvery(getProductDetailRequested.toString(), fetchGetProductDetail)
  yield takeEvery(postAddToChartRequested.toString(), fetchPostAddToChart)
  yield takeEvery(getCartRequested.toString(), fetchGetCart)
  yield takeEvery(updateCartItemRequested.toString(), fetchUpdateCartItem)
  yield takeEvery(postWishlistRequested.toString(), fetchPostAddToWishlist)
  yield takeEvery(getWishlistRequested.toString(), fetchGetWishlist)
}

export default productSaga