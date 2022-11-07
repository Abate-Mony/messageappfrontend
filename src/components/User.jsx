import React from 'react'
import imgsrc from '../bg-1.jpg'
const User = ({ name, id,createdAt }) => {
  const handleError = e => {
    e.target.src = imgsrc
  }
  function checkUserTime(date){
    const milliSeconds=new Date()- new Date(date);
    const seconds=milliSeconds/1000
    const minute=seconds/60;
    const hours=minute/60;
    const days=hours/24
    if(days>=5){
      return "Old User"
    }
    return "New User"
  }
  return (
    <div className="container" style={{ padding: "0 1rem" }}>
      <div className="user-container">
        <div className="img-container">
          <img src={`http://localhost:5000/profile/${id}.jpg`} onError={handleError} className="fit-img" alt={name} />
        </div>
        <div className="user-details-container">
          <h4>
            {name.map(_=>_.charAt(0).toUpperCase() +_.slice(1)).join(" ")}</h4>
          <span>{checkUserTime(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default User