import React from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ChangePasswordComponent from '@/components/profile/ChangePasswordComponent'

function ChangePasswordContainer() {
  return (
    <Layout navigation={false}>
      <ChangePasswordComponent />
    </Layout>
  )
}

export default ChangePasswordContainer