import React from 'react'
import imgsrc from '../bg-1.jpg'
const Animationpic = ({toggle,setToggle,id}) => {
  const handleError=e=>{
    e.target.src= imgsrc
  }
  return (
    <div className={`img-animation-container ${toggle?"":"--d-none"}`} onClick={e =>setToggle(false)}>

        <div className={`img-animation ${toggle?"profileA":""}`} onClick={e =>e.stopPropagation()}>
            <img src={`http://localhost:5000/profile/${id}.jpg`} onError={handleError} alt={id} className="fit-img" />
        </div>
    </div>
  )
}

export default Animationpic