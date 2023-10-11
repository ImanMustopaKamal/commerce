import React from 'react'
import LoginComponent from '@/auth/LoginComponent'
import Layout from '@/components/_shared/core/Layout/Index'

function LoginContainer() {
  return (
    <Layout navigation={false}>
      <LoginComponent />
    </Layout>
  )
}

export default LoginContainer