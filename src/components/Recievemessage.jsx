import bg from '../bg-1.jpg'
import {useState} from 'react'
const Recievemessage = ({message,imgsrc}) => {
const [loading,setLoading]=useState(true)
  const handleError = e => {
    e.target.src = bg
    console.log("image fail to load ")
    setLoading(false)

  }
  const handleLoading=e=>{
    console.log(e)
    console.log("image is loading here ")
    setLoading(false)
  }

    return (
        <div className="message recieve-message" style={{
            width: imgsrc && "50%", height: imgsrc && "20rem"
          }}>
          {imgsrc?
              <><div className="img_preloader" style={{
                display:loading?"block":"none",backgroundColor:"var(--bg-color-1)"
              }}><span style={{
                backgroundColor:"var(--bg-color-1)"

              }}></span></div> <img src={imgsrc} onLoad={handleLoading}
              alt="mmga" onError={handleError} /></>
                :message
                }
          </div>
    )
}


export default Recievemessage