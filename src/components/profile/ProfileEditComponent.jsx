import React from 'react'
import Form from '@/components/_shared/form/Form'
import { Box, Grid, IconButton, Button, TextField, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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

function ProfileEditComponent() {
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
        <h4>EDIT PROFILE</h4>
       </BoxTop>
    </Box>
    <Box sx={{
      overflowY: 'auto',
        paddingTop: '6rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
    }}>
      <Form>
        <TextField
         id='input_email'
         label='Email Address'
         variant='standard'
         type='text'
         disabled
         value='fiqrikm18@gmail.com'
         fullWidth
         sx={{ marginBottom: '1rem' }}
        />
        <TextField
         id='input_phone'
         label='Mobile Phone'
         variant='standard'
         type='text'
         fullWidth
         sx={{ marginBottom: '1rem' }}
        />
        <TextField
         id='input_name'
         label='Name'
         variant='standard'
         type='text'
         fullWidth
         sx={{ marginBottom: '1rem' }}
        />
        <LocalizationProvider  sx={{ marginBottom: '1rem' }} dateAdapter={AdapterDayjs}>
          <DatePicker
           label='Birth Date'
           defaultValue={dayjs('1994-05-22')}
           slotProps={{ textField: { variant: 'standard', fullWidth: true } }}
          />
        </LocalizationProvider>
        <TextField
         id='input_address'
         label='Address'
         variant='standard'
         type='text'
         multiline
         fullWidth
         sx={{ marginBottom: '1rem' }} />
        <FormControl fullWidth sx={{ marginBottom: '.5rem' }}>
         <FormLabel>Gender</FormLabel>
         <RadioGroup row name='gender'>
            <FormControlLabel value='female' control={<Radio />} label='Female'/>
            <FormControlLabel value='male' control={<Radio />} label='Male'/>
          </RadioGroup>
        </FormControl>
        <TextField
          id='input_postal_code'
          label='Postal Code'
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

export default ProfileEditComponent