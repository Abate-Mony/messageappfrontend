import React from 'react'
import imgsrc from  '../bg-1.jpg'
const User = ({name,id}) => {
  const handleError=e=>{
    e.target.src= imgsrc
  }
  return (
    <div className="container" style={{ padding:"0 1rem"}}>
          <div className="user-container">
            <div className="img-container">
              <img src={`http://localhost:5000/profile/${id}.jpg`} onError={handleError} className="fit-img" alt={name}/>
            </div>
            <div className="user-details-container">
              <h4>
{name}              </h4>
              <span>new user</span>
            </div>
          </div>
        </div>
  )
}

export default User