import React, { useEffect } from 'react'
import ShoppingWishContainer from '@/containers/shopping-wish/ShoppingWishContainer'
import { authProps } from '@/props/server/authProps'


function Index() {
  useEffect(() => {
    authProps('/shopping-wish')
  }, [])
  return (
    <ShoppingWishContainer />
  )
}

export default Index