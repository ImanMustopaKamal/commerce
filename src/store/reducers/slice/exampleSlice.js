import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
  loading: false,
  data: []
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    getExampleRequested (state) {
      state.loading = true
    },
    getExampleSuccess (state) {
      state.loading = false
    },
    getExampleFailed (state) {
      state.loading = false
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
  getExampleFailed,
  getExampleRequested,
  getExampleSuccess
} = exampleSlice.actions

export default exampleSlice.reducer