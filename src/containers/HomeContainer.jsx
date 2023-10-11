/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import HomeComponent from '@/components/home/HomeComponent'
import { useAppDispatch } from '@/hooks'
import { getProductCategoryRequested } from '@/store/reducers/slice/product/productSlice'

function HomeContainer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: getProductCategoryRequested.toString()
    })
  }, [])
  return (
    <Layout navigation={true}>
      <HomeComponent />
    </Layout>
  )
}

export default HomeContainer