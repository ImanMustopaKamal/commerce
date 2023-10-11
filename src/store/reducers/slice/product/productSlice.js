import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
  isLoading: false,
  productCategory: [],
  product: [],
  productDetail: [],
  cart: [],
  cartID: '',
  wishlist: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductCategoryRequested: (state) => {
      state.isLoading = true
    },
    getProductCategorySuccess: (state, action) => {
      state.isLoading = false
      let tempData = [
        {
          image: '',
          name: 'Official Store',
          slug: 'official-store'
        }
      ]
      action?.payload?.data?.map((item) => {
        tempData.push({
          name: item.name,
          slug: item.slug,
          image: item.image
        })
      })
      state.productCategory = tempData
    },
    getProductCategoryFailed: (state) => {
      state.isLoading = false
    },
    getProductRequested: (state) => {
      state.isLoading = true
    },
    getProductSuccess: (state, action) => {
      state.isLoading = false
      state.product = action?.payload?.data
    },
    getProductFailed: (state) => {
      state.isLoading = false
    },
    getProductDetailRequested: (state) => {
      state.isLoading = true
    },
    getProductDetailSuccess: (state, action) => {
      state.isLoading = false
      state.productDetail = action?.payload?.data
    },
    getProductDetailFailed: (state) => {
      state.isLoading = false
    },
    postAddToChartRequested: (state) => {
      state.isLoading = true
    },
    postAddToChartSuccess: (state) => {
      state.isLoading = false
    },
    postAddToChartFailed: (state) => {
      state.isLoading = false
    },
    getCartRequested: (state) => {
      state.isLoading = true
    },
    getCartSuccess: (state, action) => {
      state.isLoading = false
      let tempData = []
      action?.payload?.data.map((item) => {
        tempData.push({
          amount: Number(item?.amount),
          staticAmount: Number(item?.product?.price),
          check: false,
          variant: item?.variant,
          product: item?.product,
          stock: item?.stock
        })
      })
      state.cartID = action?.payload?.id
      state.cart = tempData
    },
    getCartFailed: (state) => {
      state.isLoading = false
    },
    updateCartItemRequested: (state) => {
      state.isloading = true
    },
    updateCartItemSuccess: (state) => {
      state.isLoading = false
    },
    updateCartItemFailed: (state) => {
      state.isLoading = false
    },
    postWishlistRequested: (state) => {
      state.isLoading = true
    },
    postWishlistSuccess: (state) => {
      state.isLoading = false
    },
    postWishlistFailed: (state) => {
      state.isLoading = false
    },
    getWishlistRequested: (state) => {
      state.isLoading = true
    },
    getWishlistSuccess: (state, action) => {
      state.isLoading = false
      let tempData = []
      action?.payload?.data.map((item) => {
        tempData.push({
          amount: Number(item?.amount),
          staticAmount: Number(item?.product?.price),
          check: false,
          variant: item?.variant,
          product: item?.product,
          stock: item?.stock
        })
      })
      state.wishlist = tempData

    },
    getWishlistFailed: (state) => {
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
  getProductCategoryRequested,
  getProductCategoryFailed,
  getProductCategorySuccess,
  getProductRequested,
  getProductFailed,
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
} = productSlice.actions

export default productSlice.reducer