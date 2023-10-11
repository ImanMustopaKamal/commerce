import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardContent, Box, IconButton, Menu, MenuItem } from '@mui/material'
import styled from '@emotion/styled'
import {AiOutlineStar} from 'react-icons/ai'
import { MoreVert } from '@mui/icons-material'
import { formatRupiah } from '@/utils/helpers'

const RateWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: .5rem;
 margin-bottom: .5rem;
`

const LikeWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justfify-content: center;
 padding: 3px;
 width: 30px;
 height: 30px;
 border-radius: 15px;
 position: absolute;
 top: 10px;
 right: 5px;
 z-index: 3;
 cursor: pointer;
`

function ProductItem({
  image,
  rating,
  title,
  price,
  onClick
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card
     sx={{
       position: 'relative',
       width: '100%',
       cursor: 'pointer' }}
    >
      {/* <LikeWrapper>
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
          <MenuItem onClick={handleClose}> + Add to wishlist</MenuItem>
        </Menu>
      </LikeWrapper> */}

      <Box onClick={onClick}>
      <CardMedia
       sx={{ height: '169px' }}
       image={image}
       title='product'
      />
      <CardContent>
        <RateWrapper>
          <AiOutlineStar fontSize={16} color='#000000'/>
          <span style={{ fontSize: '12px', fontWeight: '400', color: '#000000' }}>{rating}</span>
        </RateWrapper>
        <Box style={{ display: 'flex', flexDirection: 'column'}}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>{title}</span>
        </Box>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>{formatRupiah(price)}</span>
      </CardContent>
      </Box>
    </Card>
  )
}

ProductItem.propTypes = {
  image: PropTypes.any,
  rating: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  onClick: PropTypes.func
}

export default ProductItem
