import React from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import PlaceOrderSuccessComponent from '@/components/place-order/PlaceOrderSuccessComponent'

function PlaceOrderSuccessContainer() {
  return (
    <Layout navigation={false}>
      <PlaceOrderSuccessComponent />
    </Layout>
  )
}

export default PlaceOrderSuccessContainer