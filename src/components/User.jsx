import React from 'react'
import imgsrc from  '../images/26IMG_0339.jpg'
const User = ({name,id}) => {
  return (
    <div className="container" style={{ padding:"0 1rem"}}>
          <div className="user-container">
            <div className="img-container">
              <img src={`http://192.168.43.32:5000/profile/${id}.jpg`} className="fit-img" alt={name}/>
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