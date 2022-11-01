import { useState,useRef} from 'react'
// import imgsrc from '../images/25IMG_0266.jpg'
import { useNavigate } from 'react-router-dom'
const Setting = () => {
  const navigate = useNavigate()
  const id=sessionStorage.getItem("id")
  const [modal,toggleModal]=useState(false)
  const elm=useRef(null)
  const handleLogout = e => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("id")
navigate("/auth")
  }
  return (
    <div className="setting-container container?" style={{ backgroundColor: "white", minHeight: "100vh" }}>

<div className={`_modal ${!modal&&"--d-none"}`} onClick={e =>{
    elm.current.classList.remove("scale")
    elm.current.classList.add("scale")
    
  console.log("enter here")

}}>
  <div  ref={elm} className={`${modal&&"scale"}`}>
    <button onClick={e =>[toggleModal(false),elm.current.classList.remove("scale")]}>
      no
    </button>
    <button onClick={handleLogout}>yes</button>
  </div>
</div>

<div className="setting-img-container">
        <div className="overlay">
          <h2>
            AKO Bate Emmanuel
          </h2>
        </div>
        <div className="overlay">
          <h3>
            888383883
          </h3>
        </div>
        <img src={`http://192.168.43.32:5000/profile/${id}.jpg`} alt={id} />

      </div>
      <div className="logout" onClick={e=>toggleModal(true)
}>
        logout
      </div>
    </div>
  )
}

export default Setting