import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
  code: 0,
  message: null
}

export const responserSlice = createSlice({
  name: 'responser',
  initialState,
  reducers: {
    setResponserMessage (state, action) {
      state.code = action?.payload?.code
      state.message = action?.payload?.message
    }
  },
  extraReducer: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.responser
      }
    }
  }
})

export const { setResponserMessage } = responserSlice.actions

export default responserSlice.reducer