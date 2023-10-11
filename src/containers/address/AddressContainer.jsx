import React, { useEffect } from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import AddressComponent from '@/components/address/AddressComponent'
import { useAppDispatch } from '@/hooks'
import { getAddressRequested } from '@/store/reducers/slice/address/addressSlice'

function AddressContainer() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: getAddressRequested.toString()
    })
  }, [])

  console.log('AddressContainer')

  return (
    <Layout navigation={false}>
      <AddressComponent />
    </Layout>
  )
}

export default AddressContainer