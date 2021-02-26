import React from 'react'

import '../assets/notification.css'

const Notification = ({ message, isError }) => {
  const styleClass = isError ? 'error' : 'notification'

  return (
    <div className={styleClass}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification
