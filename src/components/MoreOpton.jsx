import React from 'react'

const MoreOpton = ({mousedown,message:{message,_id,createdAt}}) => {
  const time=new Date(createdAt)
  return (
    <div className={`moreoptions-container ${!mousedown?"--d-none":""}`} onClick={e =>e.stopPropagation()}>
    <div className="moreoptions">
        {<span>
          {message}<br/>
          {_id} <br/>
          {time.toLocaleDateString()}<br/>
          {time.toLocaleTimeString()}<br/>
          </span>}
            </div>

</div>
  )
}

export default MoreOpton