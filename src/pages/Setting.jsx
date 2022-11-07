import { useState, useRef, useEffect } from 'react'
import imgsrc from '../bg-1.jpg'
import { useNavigate } from 'react-router-dom'
const Setting = () => {
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

  const url = "http://192.168.43.32:5000/auth/userinfo"
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
    const response = await fetch("http://192.168.43.32:5000/auth/user/" + id, {
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
    })

    const { user_names: { first_name, second_name, full_names }, email, createdAt } = await response.json()
    setUser({
      ... { first_name, second_name, full_names, email, createdAt }
    })

    setLoading(false)
  }




  const handleToggler = (state) => {
    if (state === 0) {
      return (
        <>
          <h2 style={{
            textAlign: "center",
            padding: "1rem", fontSize: "2.2rem"
          }}>Account Information</h2>


          <div className="information-box " style={{ border: "1px solid white" }}>
            <div>
              <span>CreatedAt</span>
              <span>{new Date(user.createdAt).toLocaleDateString("en-US", {

              })}</span>
            </div>
            {/* <div>
              <span>Number of texted users</span>
              <span>{info.length}</span>
            </div> */}
            <div>
              <span>Total Number  of Messages</span>
              <span>{info.totalMessages}</span>
            </div>
            <div>
              <span>Number of Messages sent</span>
              <span>{info.totalMessagesSent}</span>
            </div>
            <div>
              <span>Number of Messages Recievemessage</span>
              <span>{info.totalMessagesRecieved}</span>
            </div>
            <div>
              <span>Total Number of images</span>
              <span>{info.totalImages}</span>
            </div>
            <div>
              <span>Number of images Sent</span>
              <span>{info.totalImagesSent}</span>
            </div>
            <div>
              <span>Number of images Received</span>
              <span>{info.totalImagesRecieved}</span>
            </div>

          </div>
        </>
      )
    }
    if (state === 1) {
      return (

        <>

          <h2 style={{
            textAlign: "center",
            padding: "1rem", fontSize: "2.2rem"
          }}>Settings</h2>
          <p style={{ textAlign: "center", color: "red", fontSize: "2rem" }}>
            still coding this component
          </p>
        </>
      )
    }
    if (state === 2) {
      return (
        <div className="contact-us">
          <h2 style={{
            textAlign: "center",
            padding: "1rem", fontSize: "2.2rem", color: "var(--bg-color-1)"
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
      )
    }

  }




  useEffect(() => {
    getUsers()
    // console.log(user)
  }, [])

  return (
    <div className="setting-container" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div className={`loader-container   ${!loading ? "--d-none" : ""}`}>
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`_modal ${!modal && "--d-none"}`} onClick={e =>
        [addToggleClass(true),
        setTimeout(() => {
          addToggleClass(false)
        }, 500)
        ]
      }>
        <div className={`${toggleclass ? "scale" : ""}`} onClick={e => e.stopPropagation()}>
          <h2 style={{ color: "red", textAlign: "center" }}>Logout</h2>
          <button onClick={e => [toggleModal(false)]}>
            no
          </button>
          <button onClick={handleLogout}>yes</button>
        </div>
      </div>

      <div className="setting-img-container" style={{ overflowX: "hidden" }}>
        <div className="overlay">
          <h2>
            {user.full_names?.split(" ")?.map(_ => _.charAt(0).toUpperCase() + _.slice(1)).join(" ") || user.first_name + " " + user.second_name}
          </h2>
        </div>
        <div className="overlay">
          <h3>
            {user.email}
          </h3>
        </div>
        <img src={imgsrc} alt={id} />

      </div>
      <div className="switch-container">
        <div className="switcher-bottom" ref={switcher}></div>
        <p onClick={e => [setState(0), switcher.current.style.left = "5%"]}>Personal</p>
        <p onClick={e => [setState(1), switcher.current.style.left = "35.8%"]}>
          Settings
        </p>
        <p onClick={e => [setState(2), switcher.current.style.left = "70%"]}>
          Contact Us
        </p>



      </div>

      {handleToggler(state)}

      {/* this container works for logout button */}
      <div className="logout" onClick={e => toggleModal(true)
      }>
        logout
      </div>
    </div>
  )
}

export default Setting