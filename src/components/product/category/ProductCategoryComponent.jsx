import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ArrowBackIos } from '@mui/icons-material'
import { Box, IconButton, Grid } from '@mui/material'
import ProductItem from '@/components/_shared/common/ProductItem'
import { NOTHING_FOUND } from '@/utils/assetsConstant'
import PropTypes from 'prop-types'
import { useAppSelectors } from '@/hooks'
import Image from 'next/image'

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

const NotfoundWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 253px;
 margin-bottom: 1rem;
`

const BoxTop = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 width: 100%;
 position: relative;
`

function ProductCategoryComponent({ title }) {
  const router = useRouter()
  const headTitle = String(title)
  const { product } = useAppSelectors((state) => state.product)
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
        <h4>{headTitle.toUpperCase()}</h4>
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
      {
        product.length > 0 && (
          <Grid container spacing={1} mt='1rem' mb='2rem'>
            {
              product.map((item) => (
                <Grid
                 item
                 xs={6}
                 key={item?.id}
                 sm={6}
                 md={6}
                 lg={6}
                 xl={6}
                 sx={{ padding: '.5rem' }}
                >
                  <ProductItem
                   rating={'5.0'}
                   image={item?.galleries[0]?.image}
                   title={item?.name}
                   subtitle={''}
                   price={item?.price}
                   onClick={() => { router.push(`/product/detail/${item?.slug}`) }}
                  />
                </Grid>
              ))
            }
          </Grid>
        )
      }
      {
        product.length == 0 && (
          <NotfoundWrapper>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Image
               src={NOTHING_FOUND}
               alt='not-found'
               width={50}
               height={50}
              />
              <span>Sorry, no product found!</span>
            </Box>
          </NotfoundWrapper>
        )
      }
     </Box>
    </>
  )
}

ProductCategoryComponent.propTypes = {
  title: PropTypes.string
}

export default ProductCategoryComponent