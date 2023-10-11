import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { setStorages } from "@/utils/storage"

const initialState = {
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      setStorages([
        { name: 'accessToken', value: action?.payload?.token }
      ])
    },
    loginFailed: (state) => {
      state.isLoading = false
    },
    registerRequested: (state) => {
      state.isLoading = true
    },
    registerSuccess: (state, action) => {
      state.isLoading = false
      setStorages([
        { name: 'accessToken', value: action?.payload?.token }
      ])
    },
    registerFailed: (state) => {
      state.isLoading = false
    },
    userRequested: (state) => {
      state.isLoading = true
    },
    userSuccess: (state, action) => {
      state.isLoading = false
      setStorages([
        { name: 'user', value: JSON.stringify({ ...action?.payload?.data }) }
      ])
    },
    userFailed: (state) => {
      state.isLoading = false
    }
  },
  extraReducers: {
    [HYDRATE]: (state) => {
      return {
        ...state
      }
    }
  }
})

export const {
  loginFailed,
  loginRequested,
  loginSuccess,
  registerFailed,
  registerRequested,
  registerSuccess,
  userRequested,
  userFailed,
  userSuccess
} = authSlice.actions

export default authSlice.reducer