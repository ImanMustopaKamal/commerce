/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box, IconButton, TextField, Grid } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import styled from '@emotion/styled'
import { NOTHING_FOUND } from '@/utils/assetsConstant'
import Image from 'next/image'
import ProductItem from '../_shared/common/ProductItem'
import { sampleListProduct } from '@/utils/siteSetting'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelectors } from '@/hooks'
import { getProductRequested } from '@/store/reducers/slice/product/productSlice'

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
  marginBottom: '.5rem'
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

function SearchComponent() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const { product } = useAppSelectors((state) => state.product)

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
    }
  }

  useEffect(() => {
    dispatch({
      type: getProductRequested.toString(),
      payload: {
        category: '',
        search: search
      }
    })
  }, [search])

  useEffect(() => {
    dispatch({
      type: getProductRequested.toString(),
      payload: {
        category: '',
        search: ''
      }
    })
  }, [])
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
        <h4>SEARCH PRODUCT</h4>
      </BoxTop>
      <TextField
       id='input_serach'
       placeholder='Search Product...'
       type='text'
       fullWidth
       name='search'
       onKeyDown={(e) => handleSearch(e)}
       size='small'
       sx={{ marginBottom: '.5rem' }}
      />
      <h5>RESULT ({product.length} PRODUCTS)</h5>
    </Box>
    <Box
     sx={{
      overflowY: 'auto',
      paddingTop: '10rem',
      paddingLeft: '1rem',
      paddingRight: '1rem'
    }}
    >
      {
        product.length > 0 && (
          <Grid container spacing={1} mt='1rem' mb='1rem'>
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
      <h5>OUR RECOMMENDATION</h5>
      <Grid container spacing={1} mt='1rem' mb={'4rem'}>
        {
          sampleListProduct.map((item) => (
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
             rating={item?.rating}
             image={item?.image}
             title={item?.title}
             subtitle={item?.subtitle}
             price={item?.price}
            />
          </Grid>
        ))
        }
      </Grid>
    </Box>
    </>
  )
}

export default SearchComponent