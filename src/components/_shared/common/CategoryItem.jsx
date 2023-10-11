import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { AiOutlineCheck } from 'react-icons/ai'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 gap: .5rem;
 cursor: pointer;
`

const ImageWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 padding: .5rem;
 border: 1px solid #DBDBDB;
`

function CategoryItem({ title, icon, onClick }) {
  const router = useRouter()
  const handleClick = () => {
    if (title === 'Official Store') {
      router.push('/product/category/official-store')
    }else{
      onClick()
    }
  }
  return (
    <Wrapper onClick={() => { handleClick() }}>
      {
        title !== 'Official Store' && (
          <>
            <ImageWrapper>
              <Image
              src={icon}
              alt={title}
              height={50}
              width={50}
              />
            </ImageWrapper>
            <span style={{ color: '#000000', fontWeight: '400', fontSize: '12px' }}>{title}</span>
          </>
        )
      }
      {
        title === 'Official Store' && (
          <>
            <ImageWrapper style={{marginTop: '18px', padding: '.9rem' }}>
              <AiOutlineCheck style={{ width: 35, height: 37 }}/>
            </ImageWrapper>
            <span style={{ color: '#000000', fontWeight: '400', fontSize: '12px', textAlign: 'center' }}>{title}</span>
          </>
        )
      }
    </Wrapper>
  )
}

CategoryItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func
}

export default CategoryItem