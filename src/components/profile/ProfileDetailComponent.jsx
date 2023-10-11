import React from 'react'
import styled from '@emotion/styled'
import { ArrowBackIos } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Box, Button, IconButton } from '@mui/material'
import Image from 'next/image'
import { EXAMPLE_BARCODE } from '@/utils/assetsConstant'
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
  background: '#FFFFFF',
  borderBottom: '1px solid #DBDBDB'
}

const FlexBetween = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 margin-bottom: 1rem;
 cursor: pointer;
`

const GreyText = styled.span`
 color: #8B9B8B;
`

const BoxTop = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 width: 100%;
 position: relative;
`

function ProfileDetailComponent() {
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
        <h4>PROFILE DETAIL</h4>
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
        <h4>Details</h4>
      </Box>
      <FlexBetween>
        <h4>EMAIL ADDRESS</h4>
        <GreyText>fiqrikm18@gmail.com</GreyText>
      </FlexBetween>
      <FlexBetween>
        <h4>NAME</h4>
        <GreyText>Fiqri Khoirul Muttaqin</GreyText>
      </FlexBetween>
      <FlexBetween>
        <h4>POSTAL CODE</h4>
        <GreyText>40133</GreyText>
      </FlexBetween>
      <FlexBetween>
        <h4>MOBILE PHONE</h4>
        <GreyText>08xxxxxxxx</GreyText>
      </FlexBetween>
      <FlexBetween>
        <h4>BIRTH DATE</h4>
        <GreyText>28/07/1880</GreyText>
      </FlexBetween>
      <FlexBetween style={{marginBottom: '2rem'}}>
        <h4>ADDRESS</h4>
          <GreyText style={{ width: '250px', marginRight: '-40px' }}>Jalan XXX YYY RT 00 RW NN, Kecamatan, Kota, 40133</GreyText>
      </FlexBetween>
      <Box sx={{ width: '100%', borderBottom: '1px solid #DBDBDB', paddingBottom: '.5rem' }}>
        <h4>Membership Code</h4>
      </Box>
      <Box>
        <Image
         src={EXAMPLE_BARCODE}
         alt='barcode'
         width={139}
         height={111}
        />
      </Box>
      <Button sx={{ marginLeft: '1.2rem', background: linearColor }} variant='contained' size='medium'>
        Print Code
      </Button>
     </Box>
    </>
  )
}

export default ProfileDetailComponent