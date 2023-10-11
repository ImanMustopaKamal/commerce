import React from 'react'
import SearchComponent from '@/components/search/SearchComponent'
import Layout from '@/components/_shared/core/Layout/Index'

function SearchContainer() {
  return (
    <Layout navigation={true}>
      <SearchComponent />
    </Layout>
  )
}

export default SearchContainer