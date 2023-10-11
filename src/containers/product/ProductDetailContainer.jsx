/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import ProductDetailComponent from '@/components/product/detail/ProductDetailComponent'
import Layout from '@/components/_shared/core/Layout/Index'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import { getProductDetailRequested } from '@/store/reducers/slice/product/productSlice'

function ProductDetailContainer() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (router?.query?.slug) {
      dispatch({
        type: getProductDetailRequested.toString(),
        payload: router?.query?.slug
      })
    }
  }, [router?.query?.slug])
  return (
    <Layout navigation={false}>
      <ProductDetailComponent />
    </Layout>
  )
}

export default ProductDetailContainer