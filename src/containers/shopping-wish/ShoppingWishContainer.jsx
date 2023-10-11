/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ShoppingWishComponent from '@/components/shopping-wish/ShoppingWishComponent'
import { useAppDispatch } from '@/hooks'
import { getWishlistRequested } from '@/store/reducers/slice/product/productSlice'

function ShoppingWishContainer() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch({
      type: getWishlistRequested.toString()
    })
  }, [])
  return (
    <Layout navigation={false}>
      <ShoppingWishComponent />
    </Layout>
  )
}

export default ShoppingWishContainer