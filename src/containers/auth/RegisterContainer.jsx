import React, { useEffect } from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import RegisterComponent from '@/auth/RegisterComponent'
import { useAppDispatch } from '@/hooks'
import { getProvinceRequested } from '@/store/reducers/slice/options/optionSlice'

function RegisterContainer() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch({
      type: getProvinceRequested.toString()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout navigation={false}>
      <RegisterComponent />
    </Layout>
  )
}

export default RegisterContainer