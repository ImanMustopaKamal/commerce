import React from 'react'
import Layout from '@/components/_shared/core/Layout/Index'
import ProfileEditComponent from '@/components/profile/ProfileEditComponent'

function ProfileEditContainer() {
  return (
    <Layout navigation={false}>
      <ProfileEditComponent />
    </Layout>
  )
}

export default ProfileEditContainer