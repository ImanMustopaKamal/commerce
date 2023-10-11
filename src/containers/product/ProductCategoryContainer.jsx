/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect }from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ProductCategoryComponent from '@/components/product/category/ProductCategoryComponent'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import { getProductRequested } from '@/store/reducers/slice/product/productSlice'

function ProductCategoryContainer() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (router?.query?.slug) {
      dispatch({
        type: getProductRequested.toString(),
        payload:{
          category: router?.query?.slug,
          search: ''
        }
      })
    }
  }, [router?.query?.slug])
  return (
    <Layout navigation={true}>
      <ProductCategoryComponent title={router?.query?.slug}/>
    </Layout>
  )
}

export default ProductCategoryContainer