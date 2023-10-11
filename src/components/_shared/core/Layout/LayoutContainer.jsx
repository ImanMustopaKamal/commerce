import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Wrapper = styled.div`
 padding-left: 1rem;
 padding-right: 1rem;
`

function LayoutContainer({
  children
}) {
  return (
    <Wrapper>{children}</Wrapper>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node
}

export default LayoutContainer
