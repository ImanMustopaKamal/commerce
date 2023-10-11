import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Navbar from '../Navbar/Index'
import { Box } from '@mui/material'
import { useAppSelectors } from '@/hooks'
import Notify from '../../common/Notify'

const BaseWrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 background-color: #f7f7f7;
`

const BaseLayout = styled.div`
 height: 100vh;
 width: 100%;
 max-width: 450px;
 background: #FFFFFF;
 overflow-x: auto;
 scroll-behavior: smooth;
`



const Layout = ({children, navigation}) => {
  const { code, message } = useAppSelectors((state) => state.responser)
  return (
    <BaseWrapper>
    {
      [200, 201].includes(code) && (
        <Notify type='success' message={message}/>
      )
    }
    {
      ![200, 201, 0].includes(code) && (
        <Notify type='error' message={message} />
      )
    }
     <BaseLayout>
      {children}
       {
        navigation && (
          <Navbar />
        )
       }
     </BaseLayout>
    </BaseWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  navigation: PropTypes.bool.isRequired
}

export default Layout
