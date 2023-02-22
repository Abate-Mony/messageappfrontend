import React from 'react'
import imgsrc from '../bg-1.jpg'
const Animationpic = ({toggle,setToggle,src}) => {
  const handleError=e=>{
    e.target.src= imgsrc
  }
  return (
    <div className={`img-animation-container ${toggle?"":"--d-none"}`} onClick={e =>setToggle(false)}>

        <div className={`img-animation ${toggle?"profileA":""}`} onClick={e =>e.stopPropagation()}>
            <img src={src} onError={handleError} alt={"u"} className="fit-img" />
        </div>
    </div>
  )
}

export default Animationpic