import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVis = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVis}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVis}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable