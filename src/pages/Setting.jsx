
import { useState, useRef, useEffect } from 'react'
import imgsrc from '../bg-1.jpg'
import { useNavigate } from 'react-router-dom'
import "./style.css"
import PopUpLogout from '../components/PopUpLogout'
const Setting = ({BASE_URL}) => {
  // const BASE_URL = "http://192.168.43.32:5000"
  // const BASE_HEROKU_URL = "https://messageappal"
  const containerRef = useRef(null)
  const [src, setSrc] = useState("")

  const [radius, setRadius] = useState(90)
  const navigate = useNavigate()
  const switcher = useRef(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    name: null,
    email: null,
    first_name: null,
    setLoading: null,
    createdAt: null
  })
  const [state, setState] = useState(0)
  useEffect(() => {
    const container=containerRef.current
    const scrollWidth=container.scrollWidth

    if(state===0){
container.scrollLeft=0
return
    }
    if(state===1){
container.scrollLeft=(1/3)*scrollWidth
return
    }
    if(state===2){
container.scrollLeft=(2/3)*scrollWidth
return
    }
  }, [state])
  const [info, setInfo] = useState({
    totalMessages: null,
    totalMessagesSent: null,
    totalMessagesRecieved: null,
    totalImagesSent: null,
    totalImages: null,
    totalImagesRecieved: null
  })
  const id = sessionStorage.getItem("id")
  const [modal, toggleModal] = useState(false)
  const elm = useRef(null)
  const [toggleclass, addToggleClass] = useState(false)
  const handleLogout = e => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("users")
    navigate("/auth")
  }
  const handleError = e => {
    e.target.src = imgsrc
  }
  const handleScroll = e => {
    const scrollWidth=e.target.scrollWidth
    const scrollX=e.target.scrollLeft
const baseWidth=scrollWidth/3
const percent=`${(scrollX/scrollWidth)*100 +5}%`
    console.log(percent);
    switcher.current.style.left=percent

  }
  
  const url = BASE_URL + "/auth/userinfo"
  const token = sessionStorage.getItem("token")
  async function getUsers() {
    const res = await fetch(url, {
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
    })
    const data = await res.json()
    setInfo({ ...data })
    const response = await fetch(BASE_URL + "/auth/user/" + id, {
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
    })
    const _res = await fetch(BASE_URL + "/profile/" + id)
    const { image } = await _res.json()
    // console.log(image)
    setSrc(BASE_URL + "/profile/image/" + image)
    const { user_names: { first_name, second_name, full_names }, email, createdAt } = await response.json()
    setUser({
      ... { first_name, second_name, full_names, email, createdAt }
    })

    setLoading(false)
  }


  const _handleToggler = position => {
    return (<>
      <div className="toggler-element">
        <h2 style={{
          textAlign: "center",
          padding: "1rem", fontSize: "1.5rem", lineHeight: "2rem"
        }}>Account Information</h2>


        <div className="information-box "
          style={{ border: "1px solid white" }}>
          <div>
            <span>CreatedAt</span>
            <span>{new Date(user.createdAt).toLocaleDateString("en-US", {

            })}</span>
          </div>
          <div>
            <span>Total Number  of Messages</span>
            <span style={{ color: info.totalMessages > 0 ? "blue" : "red" }}>{info.totalMessages}</span>
          </div>
          <div>
            <span >Number of Messages sent</span>
            <span style={{ color: info.totalMessagesSent > 0 ? "blue" : "red" }}>{info.totalMessagesSent}</span>
          </div>
          <div>
            <span>Number of Messages Recievemessage</span>
            <span style={{ color: info.totalMessagesRecieved > 0 ? "blue" : "red" }}>{info.totalMessagesRecieved}</span>
          </div>
          <div>
            <span>Total Number of images</span>
            <span style={{ color: info.totalImages > 0 ? "blue" : "red" }}>{info.totalImages}</span>
          </div>
          <div>
            <span>Number of images Sent</span>
            <span style={{ color: info.totalImagesSent > 0 ? "blue" : "red" }}>{info.totalImagesSent}</span>
          </div>
          <div>
            <span>Number of images Received</span>
            <span style={{ color: info.totalImagesRecieved > 0 ? "blue" : "red" }}>{info.totalImagesRecieved}</span>
          </div>

        </div>
      </div>
      <div className="toggler-element">
        <h2 style={{
          textAlign: "center",
          padding: "1rem", fontSize: "1.5rem", lineHeight: "0.4rem", color: "var(--bg-color-1)", letterSpacing: "0.1rem"
        }}>Settings</h2>
        <p style={{ textAlign: "center", color: "red", fontSize: "var(--fs-2)" }}>
          still coding this component

        </p>
      </div>
      <div className="toggler-element contact-us">
        <h2 style={{
          textAlign: "center",
          padding: "1rem", fontSize: "1.5rem", lineHeight: "0.4rem", color: "var(--bg-color-1)", letterSpacing: "0.1rem"
        }}>Contact Us</h2>

        <h2>
          Email Address
        </h2>
        <span>
          <a href="mailto:bateemma14@gmail.com">bateemma14@gmail.com</a>
        </span>
        <h2>
          Phone Number
        </h2>
        <a href="tel:+237672301714">+237672301714</a>
        <a href="tel:+237696164769">+237696164769</a>
        <h2>
          Github
        </h2>
        <span>
          <a href="https://github.com/abate-mony">Abate mony</a>

        </span>
        <h2>
          FaceBook
        </h2>
        <span>
          <a href="https://github.com/abate-mony">Abate mony</a>
        </span>
      </div>
    </>

    )
  }




  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="setting-container"
      style={{
        backgroundColor: "white", minHeight:
          "100vh"
      }}>
      <div className="logout" onClick={e => toggleModal(true)
      }>
        logout
      </div>
      <PopUpLogout modal={modal} addToggleClass={addToggleClass} toggleclass={toggleclass} toggleModal={toggleModal} handleLogout={handleLogout} />

      <div className={`loader-container   ${!loading ? "--d-none" : ""}`}>
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>


      <div className="setting-img-container" style={{ overflowX: "hidden" }}>

        <div className="overlay">
          <h2 style={{ letterSpacing: "0.2rem" }}>
           <pre>
            
             {user.full_names?.split(" ")?.map(_ => _.charAt(0).toUpperCase() + _.slice(1)).join(" ") || user.first_name + " " + user.second_name}
            </pre>
          </h2>
        </div>
        <div className="overlay">
          <h3 >
            <pre>
            {user.email}

            </pre>
          </h3>
        </div>
        <div role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{ "--value": radius }}>
          <img src={src} alt={"0"} onError={handleError} />
        </div>

      </div>
      <div className="switch-container">
        <div className="switcher-bottom" ref={switcher}></div>
        <p onClick={e => [setState(0), switcher.current.style.left = "5%", setRadius(100)]}>Personal</p>
        <p onClick={e => [setState(1), switcher.current.style.left = "35.8%", setRadius(66.66)]}>
          Settings

        </p>
        <p onClick={e => [setState(2), switcher.current.style.left = "70%", setRadius(33.3)]}>
          Contact-Us
        </p>
      </div>
      <div className="toggler-container"
        ref={containerRef} onScroll={handleScroll} >
        {_handleToggler(state)}
      </div>

    </div>
  )
}

export default Setting