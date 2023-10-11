import React, { useEffect } from 'react'
import ProfileContainer from '@/containers/profile/ProfileContainer'
import { authProps } from '@/props/server/authProps'

function Index() {
  useEffect(() => {
    authProps('/profile')
  }, [])
  return (
    <ProfileContainer />
  )
}

export default Index