import React, { useEffect } from 'react'
import ShoppingCartContainer from '@/containers/shopping-cart/ShoppingCartContainer'
import { authProps } from '@/props/server/authProps'

function Index() {
  useEffect(() => {
    authProps('/shopping-cart')
  }, [])
  return (
    <ShoppingCartContainer />
  )
}

export default Index