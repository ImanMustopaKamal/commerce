import React from 'react'
import Form from '@/components/_shared/form/Form'
import { Box, Grid, IconButton, Button, TextField, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { linearColor } from '@/utils/helpers'

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
  background: '#FFFFFF'
}

const BoxTop = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 width: 100%;
 position: relative;
`

function ChangePasswordComponent() {
  const router = useRouter()
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
          <IconButton onClick={() => { router.back() }}>
            <ArrowBackIos />
          </IconButton>
        </Box>
        <h4>CHANGE PASSWORD</h4>
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
      <Form>
        <TextField
         id='input_current_password'
         label='Current Password'
         variant='standard'
         type='text'
         fullWidth
         sx={{ marginBottom: '1rem' }}
        />
        <TextField
         id='input_new_password'
         label='New Password'
         variant='standard'
         type='password'
         fullWidth
         sx={{ marginBottom: '1rem' }}
        />
        <TextField
         id='input_confirm_Password'
         label='Confirm Password'
         variant='standard'
         type='text'
         fullWidth
         sx={{ marginBottom: '2rem' }}
        />
        <Button sx={{ background: linearColor }} size='medium' variant='contained' fullWidth>
          Save Change
        </Button>
      </Form>
    </Box>
    </>
  )
}

export default ChangePasswordComponent