import React from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ProfileComponent from '@/components/profile/ProfileComponent'

function ProfileContainer() {
  return (
    <Layout navigation={false}>
      <ProfileComponent/>
    </Layout>
  )
}

export default ProfileContainer