/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ShoppingCartComponent from '@/components/shopping-cart/ShoppingCartComponent'
import { useAppDispatch } from '@/hooks'
import { getCartRequested } from '@/store/reducers/slice/product/productSlice'

function ShoppingCartContainer() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch({
      type: getCartRequested.toString()
    })
  }, [])
  return (
    <Layout navigation={false}>
      <ShoppingCartComponent />
    </Layout>
  )
}

export default ShoppingCartContainer