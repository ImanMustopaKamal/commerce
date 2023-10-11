import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ArrowBackIos } from '@mui/icons-material'
import { Box, IconButton, Grid } from '@mui/material'
import { sampleOfficialStoreList } from '@/utils/siteSetting'
import styled from '@emotion/styled'

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

const BoxTop = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 width: 100%;
 position: relative;
`

function OfficialStoreComponent() {
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
         }}>
          <IconButton onClick={() => { router.back() }}>
            <ArrowBackIos />
          </IconButton>
        </Box>
        <h4>OFFICIAL STORE</h4>
      </BoxTop>
     </Box>
     <Box
      sx={{
        overflowY: 'auto',
        paddingTop: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingBottom: '4rem'
      }}
     >
      <Box sx={{ marginBottom: '1rem' }}>
        <h4>POPULAR BRAND</h4>
      </Box>
      {
        sampleOfficialStoreList.length > 0 && (
          <Grid container spacing={1} mt='1rem' mb='2rem'>
            {
              sampleOfficialStoreList.map((item) => (
                <Grid item key={item?.id} xs={6} sm={6} md={6} xl={6} sx={{ padding: '.5rem' }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'

                  }}>
                    <Image
                      src={item?.image}
                      alt='official-store'
                      style={{
                        border: '1px solid #DBDBDB',
                        borderRadius: '10px'
                      }}
                      width={170}
                      height={150}
                    />
                    <span>{item?.name}</span>
                  </Box>
                </Grid>
              ))
            }
          </Grid>
        )
      }
      <Box sx={{ marginBottom: '1rem' }}>
        <h4>OUR RECOMENDATION</h4>
      </Box>
      {
        sampleOfficialStoreList.length > 0 && (
          <Grid container spacing={1} mt='1rem' mb='2rem'>
            {
              sampleOfficialStoreList.reverse().map((item) => (
                <Grid item key={item?.id} xs={6} sm={6} md={6} xl={6} sx={{ padding: '.5rem' }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'

                  }}>
                    <Image
                      src={item?.image}
                      alt='official-store'
                      style={{
                        border: '1px solid #DBDBDB',
                        borderRadius: '10px'
                      }}
                      width={170}
                      height={150}
                    />
                    <span>{item?.name}</span>
                  </Box>
                </Grid>
              ))
            }
          </Grid>
        )
      }
     </Box>
    </>
  )
}

export default OfficialStoreComponent