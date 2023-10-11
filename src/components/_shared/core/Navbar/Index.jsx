import React from 'react'
import PropTypes from 'prop-types'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import {AiOutlineShoppingCart, AiOutlineHome, AiOutlineHeart, AiOutlineUser, AiFillHome} from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useDetectVirtualKeyboard } from '@/hooks'

const NavWrapper = {
  position: 'fixed',
  left: '50%',
  bottom: '0',
  zIndex: '7',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '450px',
  margin: '0 auto'
}

const linearColor = 'linear-gradient(90deg, rgba(50,150,200,1) 0%, rgba(100,157,148,1) 50%, rgba(185,167,57,1) 100%)'

const Navbar = () => {
  const router = useRouter()
  const keyboard = useDetectVirtualKeyboard()
  const handleChangePage = (path) => {
    router.push(path)
  }
  return (
    <>
    {
      !keyboard && (
        <Box sx={NavWrapper}>
          <BottomNavigation
           showLabels
           sx={{
            background: linearColor,
            padding: '1rem'
           }}
          >
            <BottomNavigationAction onClick={() => { handleChangePage('/') }} icon={router?.asPath === '/' ? <AiFillHome size={30} style={{ color: '#FFFFFF' }}/> : <AiOutlineHome size={30} style={{ color: '#FFFFFF' }}/>}/>
            <BottomNavigationAction onClick={() => { handleChangePage('/shopping-cart') }} icon={<AiOutlineShoppingCart size={30} style={{ color: '#FFFFFF' }}/>}/>
            <BottomNavigationAction onClick={() => { handleChangePage('/shopping-wish') }} icon={<AiOutlineHeart size={30} style={{ color: '#FFFFFF' }}/>}/>
            <BottomNavigationAction onClick={() => { handleChangePage('/profile') }} icon={<AiOutlineUser size={30} style={{ color: '#FFFFFF' }}/>}/>
          </BottomNavigation>
        </Box>
      )
    }
    </>
  )
}

Navbar.propTypes = {}

export default Navbar
