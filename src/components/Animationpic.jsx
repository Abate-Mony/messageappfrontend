import React from 'react'
import imgsrc from '../bg-1.jpg'
const Animationpic = ({toggle,setToggle,id}) => {
  return (
    <div className={`img-animation-container ${toggle?"":"--d-none"}`} onClick={e =>setToggle(false)}>

        <div className={`img-animation ${toggle?"profileA":""}`} onClick={e =>e.stopPropagation()}>
            <img src={`http://192.168.43.32:5000/profile/${id}.jpg`} alt="" className="fit-img" />
        </div>
    </div>
  )
}

export default Animationpic