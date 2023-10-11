import React from 'react'
import PropTypes from 'prop-types'

function Form({
  onSubmit,
  children,
  ...otherProps
}) {
  return (
    <form
     onSubmit={onSubmit}
     {...otherProps}
    >
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

export default Form
