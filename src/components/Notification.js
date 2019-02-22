import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (message === ''){
    return null
  }
  return (
    <div className="info">
      <h3>{message}</h3>
    </div>
  )
}

export default Notification