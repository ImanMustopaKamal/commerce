/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, IconButton, Select, MenuItem, Grid } from '@mui/material'
import styled from '@emotion/styled'
import { IoLocationOutline } from 'react-icons/io5'
import { FRAME_1, FRAME_2, FRAME_3, HEAD_LOGO } from '@/utils/assetsConstant'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image'
import { Search } from '@mui/icons-material'
import CategoryItem from '../_shared/common/CategoryItem'
import {LiaSortSolid} from 'react-icons/lia'
import ProductItem from '../_shared/common/ProductItem'
import { useRouter } from 'next/router'
import { useAppSelectors } from '@/hooks'
import { useAppDispatch } from '@/hooks'
import { getProductRequested } from '@/store/reducers/slice/product/productSlice'

const TopWrapper = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
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

const LocationComp = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 padding: .5rem;
 background: linear-gradient(90deg, rgba(50,150,200,1) 0%, rgba(100,157,148,1) 50%, rgba(185,167,57,1) 100%);
 color: #FFFFFF;
 border-radius: 50%
`

const flexCenter = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const CategoryWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: 1rem;
 height: auto;
 width: 100%;
 max-width: 450px;
 overflow-x: auto;
 margin-bottom: 2rem;
 margin-top: 2rem;
 padding-left: 1rem;
`

const SortWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 padding-left: 1rem;
 padding-right: 1rem;
 margin-bottom: 3rem;
`

const SortLeft = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: .5rem;
`

const SortRight = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-end;
 width: 100%;
 max-width: 144px;
`

function HomeComponent() {
  const [sort, setSort] = useState(1)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { productCategory, product } = useAppSelectors((state) => state.product)

  useEffect(() => {
    dispatch({
      type: getProductRequested.toString(),
      payload: {
        category: '',
        search: ''
      }
    })
  }, [])

  const handleSort = (event) => {
    setSort(event.target.value)
  }
  return (
    <>
    <Box sx={TopWrapper}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
        <LocationComp>
          <IoLocationOutline fontSize={15}/>
        </LocationComp>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span style={{ fontSize: '10px', color: '#00000091' }}>Send To</span>
          <span style={{ fontSize: '12px', color: '#000000', fontWeight: 'bold' }}>Bandung, Indonesia</span>
        </Box>
      </Box>
      <IconButton
       onClick={() => { router.push('/search') }}
      >
        <Search sx={{ color: '#000000'}}/>
      </IconButton>
    </Box>
    <Box sx={{
      overflowY: 'auto',
      paddingTop: '4rem',
      paddingBottom: '4rem'
      }}>
    <Swiper
     cssMode={true}
     navigation={true}
     pagination={true}
     mousewheel={true}
     keyboard={true}
     modules={[Navigation, Pagination, Mousewheel, Keyboard]}
     className='mySwipper'
     style={{
      '--swiper-navigation-color': 'black',
      '--swiper-navigation-size': '20px',
      '--swiper-pagination-color': '#000000'
     }}
    >
      <SwiperSlide style={flexCenter}>
        <Image src={FRAME_1} alt='image' width={450} height={150}/>
      </SwiperSlide>
      <SwiperSlide style={flexCenter}>
        <Image src={FRAME_2} alt='image' width={450} height={150}/>
      </SwiperSlide>
      <SwiperSlide style={flexCenter}>
        <Image src={FRAME_3} alt='image' width={450} height={150}/>
      </SwiperSlide>
    </Swiper>
    <CategoryWrapper>
      {
        productCategory.map((item) => (
          <CategoryItem
           key={item?.name}
           title={item?.name}
           icon={item?.image}
           onClick={() => router.push(`product/category/${item.slug}`)}
          />
        ))
      }
    </CategoryWrapper>
    <SortWrapper>
      <SortLeft>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000' }}>SORT BY</span>
        <LiaSortSolid fontSize={15} color='#000000'/>
      </SortLeft>
      <SortRight>
        <Select
         value={sort}
         onChange={handleSort}
         autoWidth
        >
          <MenuItem value={1}>BEST RATING</MenuItem>
          <MenuItem value={2}>PRICE: LOW TO HIGH</MenuItem>
          <MenuItem value={3}>PRICE: HIGH TO LOW</MenuItem>
          <MenuItem value={4}>NEWEST</MenuItem>
          <MenuItem value={5}>OLDEST</MenuItem>
        </Select>
      </SortRight>
    </SortWrapper>
    <Grid container spacing={1} sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      {
        product.map((item) => (
          <Grid
           item
           key={item?.slug}
           xs={6}
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
             onClick={() => {router.push(`/product/detail/${item?.slug}`)}}
            />
          </Grid>
        ))
      }
    </Grid>
    </Box>
    </>
  )
}

export default HomeComponent