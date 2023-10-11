import { get, post, put } from "@/utils/interceptors"

export const getProductCategory = () => {
  return get('/product-categories?sortDesc=asc')
}

export const getProduct = (payload) => {
  return get(`/products?page=-1&sortDesc=asc&category=${payload.category}&search=${payload.search}`)
}

export const getProductDetail = (payload) => {
  return get(`/products/${payload}`)
}

export const postAddToChart = (payload) => {
  return post('/carts', payload)
}

export const getCart = () => {
  return get('/carts')
}

export const updateCartItem = (payload) => {
  return put(`/carts/${payload.id}`, payload.data)
}

export const addWishlist = (payload) => {
  return post('/wishlist', payload)
}

export const getWishlist = () => {
  return get('/authentication/me')
}