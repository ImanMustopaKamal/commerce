/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import AddressCreateComponent from '@/components/address/AddressCreateComponent'
import { useAppDispatch } from '@/hooks'
import { getProvinceRequested } from '@/store/reducers/slice/options/optionSlice'


function AddressCreateContainer() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch({
      type: getProvinceRequested.toString()
    })
  }, [])
  return (
    <Layout navigation={false}>
      <AddressCreateComponent />
    </Layout>
  )
}

export default AddressCreateContainer