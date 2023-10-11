import React from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import OfficialStoreComponent from '@/components/product/category/OfficialStoreComponent'

function OfficialStoreContainer() {
  return (
    <Layout navigation={true}>
      <OfficialStoreComponent />
    </Layout>
  )
}

export default OfficialStoreContainer