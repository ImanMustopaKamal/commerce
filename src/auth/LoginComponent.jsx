import React, { useState } from 'react'
import { Box, TextField, Grid, Button, InputAdornment, IconButton } from '@mui/material'
import Form from '@/components/_shared/form/Form'
import { useRouter } from 'next/router'
import { useAppDispatch, useForm } from '@/hooks'
import { loginRequested } from '@/store/reducers/slice/auth/authSlice'
import { checkRegulerExpression, linearColor } from '@/utils/helpers'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ArrowBackIos } from '@mui/icons-material'
import styled from '@emotion/styled'

const TopWrapper = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  position: 'fixed',
  left: '50%',
  top: '0',
  zIndex: '7',
  transform: 'translateX(-50%)',
  maxWidth: '450px',
  background: '#FFFFFF',
  marginBottom: '.5rem',
  borderBottom: '1px solid #C5C5C5'
}

const TopContent = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: .5rem;
 width: 100%;
 color: #000000;
`

function LoginComponent() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: ''
  })

  const handleBack = () => {
    window.history.go(-2)
  }

  const validate = (fieldOfValues = values) => {
    const temp = {...errors}
    if ('email' in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      temp.email = fieldOfValues.email ? (checkRegulerExpression(patternEmail, fieldOfValues.email) ? '' : 'Format email should be valid') : 'Email is required'
    }

    if ('password' in fieldOfValues) {
      temp.password = fieldOfValues.password ? '' : 'Please input password'
    }

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    errors,
    setErrors,
    resetForm,
    handleInputChange
  } = useForm(initialValues, true, validate)

    const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleRegister = () => {
    router.push('/auth/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      const payload = {
        email: values.email,
        password: values.password
      }
      await dispatch({
        type: loginRequested.toString(),
        payload: {
          data: payload,
          url: String(router?.query?.toUrl)
        }
      })
      await resetForm()
      setInitialValues({
        email: '',
        password: ''
      })
    }
  }

  return (
    <>
    <Box sx={TopWrapper}>
      <TopContent>
        <IconButton onClick={() => { handleBack()}}>
          <ArrowBackIos sx={{ color: '#000000' }}/>
        </IconButton>
        <h4>BACK</h4>
      </TopContent>
    </Box>
    <Box sx={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '6rem'
    }}>
      <h1 style={{ color: '#3296C8' }}>LOG IN</h1>
      <h4 style={{ marginBottom: '1rem' }}>Log in with your email address and password.</h4>
      <Form onSubmit={handleSubmit}>
        <TextField
         id='input_email'
         label='Email Address *'
         variant='standard'
         name='email'
         type='text'
         onChange={handleInputChange}
         value={values?.email}
         fullWidth
         error={errors?.email ? true : false}
         helperText={errors?.email}
         sx={{ marginBottom: '1rem' }}
        />
        <TextField
         id='input_password'
         label='Password *'
         variant='standard'
         fullWidth
         name='password'
         value={values?.password}
         onChange={handleInputChange}
         error={errors?.password ? true : false}
         helperText={errors?.password}
         type={showPassword ? 'text' : 'password'}
         sx={{ marginBottom: '1rem' }}
         InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
               edge='end'
               onClick={() => { handleShowPassword() }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
         }}
        />
        <Grid container mt='2rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#3296C8',
              border: '2px solid #3296C8',
              fontWeight: 'bold',
              ':hover': { color: '#3296C8', backgroundColor: '#FFFFFF' } }}>
              LOG IN
            </Button>
          </Grid>
        </Grid>
      </Form>
      <hr />
      <Box sx={{
        marginTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem'
      }}>
        <h1 style={{ color: '#B9A739' }}>CREATE ACCOUNT</h1>
        <h4>If you create an account, you can get personalized services like checking purchase history and getting discount coupons with your membership.
          Register today for free!</h4>
        <Grid container mt='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button variant='contained' fullWidth onClick={handleRegister} sx={{ background: linearColor }}>
              REGISTER
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  )
}

export default LoginComponent