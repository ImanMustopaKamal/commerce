import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

function MetaHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

MetaHead.propTypes = {
  title: PropTypes.string
}

export default MetaHead