/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  Grid,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Menu,
} from '@mui/material'
import { ArrowBackIos, ExpandMore, RemoveCircleOutline, ControlPoint } from '@mui/icons-material'
import Image from 'next/image'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppSelectors, useAppDispatch } from '@/hooks'
import { formatRupiah, linearColor } from '@/utils/helpers'
import { postAddToChartRequested, postWishlistRequested } from '@/store/reducers/slice/product/productSlice'
import { getStorage } from '@/utils/storage'
import { setResponserMessage } from '@/store/reducers/slice/responserSlice'
import { MoreVert } from '@mui/icons-material'

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

const BottomWrapper = {
  padding: '0',
  margin: '0',
  border: '1px solid #c5c5c5',
  background: linearColor,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: '50%',
  bottom: '0',
  zIndex: '7',
  transform: 'translateX(-50%)',
  maxWidth: '450px',
}

const TopContent = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 color: #000000;
`

const flexCenter = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const flexRowBetween = {
  display: 'flex',
  flexDIrection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem'
}

function ProductDetailComponent() {
  const dispatch = useAppDispatch()
  const { productDetail } = useAppSelectors((state) => state.product)
  const router = useRouter()
  const [staticPrice, setStaticPrice] = useState(Number(productDetail?.price))
  const [price, setPrice] = useState(Number(staticPrice))
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (typeof productDetail?.price !== 'undefined') {
      setStaticPrice(Number(productDetail?.price))
      setPrice(Number(productDetail?.price))
    }
  }, [productDetail?.price])

  const handleAddToWishlist = () => {
    if (size !== '') {
      dispatch({
      type: postWishlistRequested.toString(),
      payload: {
        products: [
          {
            id: productDetail?.id,
            variantId: size
          }
        ]
      }
    })
    }
    handleClose()
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const incrementQty = () => {
    let tempQty = qty + 1
    setQty(tempQty)
    setPrice(staticPrice * tempQty)
  }
  const decrementQty = () => {
    let minQty = qty - 1
    if (minQty <= 1) {
      setQty(1)
      setPrice(staticPrice * 1)
    }else{
      setQty(minQty * 1)
      setPrice(staticPrice * minQty)
    }
  }
  const handleChangeSize = (e) => {
    setSize(e.target.value)
  }
  const handleAdd = async () => {
    const token = await getStorage('accessToken')
    if (typeof token !== 'undefined' && token !== null) {
      const data = {
      productId: Number(productDetail?.id),
      itemId: Number(size),
      stock: Number(qty)
    }
    dispatch({
      type: postAddToChartRequested.toString(),
      payload: data
    })
    }else{
      dispatch({
        type: setResponserMessage.toString(),
        payload: {
          code: 401,
          message: 'Youre not logged in!'
        }
      })
      router.push({ pathname: '/auth/login', query: { toUrl: router?.asPath, fromUrl: router?.asPath } })
    }

  }
  return (
    <>
     <Box sx={TopWrapper}>
       <TopContent>
        <IconButton onClick={() => { router.back() }}>
          <ArrowBackIos sx={{ color: '#000000' }}/>
        </IconButton>
        <h4>PRODUCT DETAILS</h4>
        <IconButton onClick={() => router.push('/shopping-cart')}>
          <AiOutlineShoppingCart color='#000000'/>
        </IconButton>
       </TopContent>
     </Box>
     <Box
      sx={{
        overflowY: 'auto',
        paddingTop: '4rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
     >
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
        {
          productDetail?.galleries?.map((item, index) => (
            <SwiperSlide style={flexCenter} key={index}>
              <Image src={item?.image} alt='image' width={480} height={300}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',
        marginTop: '.5rem',
        marginBottom: '1rem'
      }}>
        <AiOutlineStar fontSize={20} color='#000000'/>
        <span style={{ fontSize: '16px' , fontWeight: '400', color: '#000000' }}>5.0</span>
      </Box>
      <Box sx={flexRowBetween}>
        <Box sx={{
          width: '100%',
          maxWidth: '300px'
        }}>
          <h3>{productDetail?.name}</h3>
        </Box>
        <Box>
         <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
         id='basic-menu'
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        >
          <MenuItem onClick={handleAddToWishlist}> + Add to wishlist</MenuItem>
        </Menu>
        </Box>
      </Box>
      <Box sx={flexRowBetween}>
        <h5>SELECT SIZE</h5>
        <h5>SEE GUIDELINE</h5>
      </Box>
      <Box mb='1rem'>
        <Select placeholder='Select Size' value={size} onChange={handleChangeSize} sx={{ width: '150px' }} size='small'>
          {
            productDetail?.items?.map((item, index) => (
              <MenuItem key={index} value={item?.id}>{item?.variant}</MenuItem>
            ))
          }
        </Select>
      </Box>
      <Box sx={{ marginBottom: '6rem' }}>
        <Accordion sx={{ border: '1px solid #000000' }}>
          <AccordionSummary
           expandIcon={<ExpandMore />}
          >
            <h6>DESCRIPTION</h6>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              {productDetail?.description}
            </span>
          </AccordionDetails>
        </Accordion>
      </Box>
     </Box>
     <Box sx={BottomWrapper}>
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDIrection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            padding: '.5rem'
          }}>
            <h5>PRICE {formatRupiah(Number(price))}</h5>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDIrection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            background: linearColor,
            gap: '1rem'
          }}>
            <IconButton onClick={() => { decrementQty() }}>
              <RemoveCircleOutline sx={{ color: '#FFFFFF', fontSize: '20px' }}/>
            </IconButton>
            <h5 style={{ color: '#FFFFFF'}}>{qty}</h5>
            <IconButton onClick={() => { incrementQty() }}>
              <ControlPoint sx={{ color: '#FFFFFF', fontSize: '20px' }}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Button type='button' onClick={() => handleAdd()}  fullWidth sx={{ color: '#FFFFFF' }}>
        Add To Cart
      </Button>
     </Box>
    </>
  )
}

export default ProductDetailComponent