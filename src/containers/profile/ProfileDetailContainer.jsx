import React from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ProfileDetailComponent from '@/components/profile/ProfileDetailComponent'

function ProfileDetailContainer() {
  return (
    <Layout navigation={false}>
      <ProfileDetailComponent />
    </Layout>
  )
}

export default ProfileDetailContainer