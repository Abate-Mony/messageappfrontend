import React from 'react'

const Alert = ({message}) => {
  return (
    <div className="alert">
       <h3>
       {message}
       </h3>
    </div>
  )
}

export default Alert