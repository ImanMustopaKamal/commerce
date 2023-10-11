import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ORDER_SUCCESS } from '@/utils/assetsConstant'
import { Box, Button } from '@mui/material'

const contentWrapper = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

function PlaceOrderSuccessComponent() {
  const router = useRouter()
  return (
    <Box sx={contentWrapper}>
      <Box>
        <Image
         src={ORDER_SUCCESS}
         alt='order_success'
         width={202}
         height={202}
        />
      </Box>
      <h2>Order Success!</h2>
      <Box sx={{ marginBottom: '1rem' }}>
        <h4>Your order will delivered soon.</h4>
      </Box>
      <Button variant='contained' size='medium' onClick={() => { router.push('/') }}>Back To Home</Button>
    </Box>
  )
}

export default PlaceOrderSuccessComponent