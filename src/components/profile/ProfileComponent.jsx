import React from 'react'
import styled from '@emotion/styled'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Box, Button, IconButton } from '@mui/material'
import { clearStorage } from '@/utils/storage'
import { useAppDispatch } from '@/hooks'
import { setResponserMessage } from '@/store/reducers/slice/responserSlice'

const TopWrapper = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',
  width: '100%',
  position: 'fixed',
  left: '50%',
  top: '0',
  zIndex: '7',
  transform: 'translateX(-50%)',
  maxWidth: '450px',
  background: '#FFFFFF',
  borderBottom: '1px solid #DBDBDB'
}

const FlexBetween = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 margin-bottom: .5rem;
 cursor: pointer;
`

const BoxTop = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 width: 100%;
 position: relative;
`

function ProfileComponent() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleChangePage = (path) => {
    router.push(path)
  }

  const handleLogout = () => {
    clearStorage(['accessToken', 'user'])
    dispatch({
      type: setResponserMessage.toString(),
      payload: {
        code: 200,
        message: 'Logout Success!'
      }
    })
    router.push('/')
  }
  return (
    <>
     <Box sx={TopWrapper}>
      <BoxTop>
        <Box
         sx={{
          position: 'fixed',
          top: '7px',
          left: '10px'
         }}
        >
          <IconButton onClick={() => { router.push('/') }}>
            <ArrowBackIos />
          </IconButton>
        </Box>
        <h4>PROFILE</h4>
       </BoxTop>
     </Box>
     <Box
      sx={{
        overflowY: 'auto',
        paddingTop: '6rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
     >
      <Box sx={{ width: '100%', borderBottom: '1px solid #DBDBDB', paddingBottom: '.5rem', marginBottom: '1rem' }}>
        <h4>Profile Detail</h4>
      </Box>
      <FlexBetween onClick={() => { handleChangePage('/profile/detail') }}>
        <span>Profile</span>
        <ArrowForwardIos fontSize='12px'/>
      </FlexBetween>
      <FlexBetween style={{ marginBottom: '1rem' }} onClick={() => { router.push('/order-history') }}>
        <span>Order History</span>
        <ArrowForwardIos fontSize='12px'/>
      </FlexBetween>
      <Box sx={{ width: '100%', borderBottom: '1px solid #DBDBDB', paddingBottom: '.5rem', marginBottom: '1rem' }}>
        <h4>Profile Setting</h4>
      </Box>
      <FlexBetween onClick={() => { router.push('/profile/edit') }}>
        <span>Edit Profile</span>
        <ArrowForwardIos fontSize='12px'/>
      </FlexBetween>
      <FlexBetween onClick={() => { handleChangePage('/address') }}>
        <span>Address List</span>
        <ArrowForwardIos fontSize='12px'/>
      </FlexBetween>
      <FlexBetween style={{ marginBottom: '2rem' }} onClick={() => { router.push('/profile/change-password') }}>
        <span>Change Password</span>
        <ArrowForwardIos fontSize='12px'/>
      </FlexBetween>
      <Button type='button' variant='outlined' size='medium' fullWidth onClick={() => { handleLogout() }}>
        Logout
      </Button>
     </Box>
    </>
  )
}

export default ProfileComponent