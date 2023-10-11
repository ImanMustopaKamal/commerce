import { configureStore } from "@reduxjs/toolkit"
import createMiddlewareSaga from '@redux-saga/core'
import reducers from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createMiddlewareSaga()

const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
  devTools: true
})

sagaMiddleware.run(rootSaga)

export default store
