import React from 'react'

const MoreOpton = ({mousedown,message:{message,_id,createdAt},setMousedown}) => {
  const time=new Date(createdAt)
  
  return (
    <div className={`moreoptions-container ${!mousedown?"--d-none":""}`}
     onClick={e =>setMousedown(false)}>
    <div className="moreoptions" onClick={e=>e.stopPropagation()}>
        {<span>
          <h2 style={{textAlign: "center"}}>Message Information</h2>
          <span className={"sms"}>
            <span className="triangle"></span>
            {message?.length>=200?message.slice(0,200)+" ...":message}
          </span>
          <div className="btm">
          <div className="message-info">
            <span>Message Id</span> <span>{_id}</span>
          </div>
          <div className="message-info">
            <span>CreatedAt</span> <span>{time.toDateString()+" at "+time.toLocaleTimeString()}</span>
          </div>
          </div>
         
          </span>}
            </div>

</div>
  )
}

export default MoreOpton