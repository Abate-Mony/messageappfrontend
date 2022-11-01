import React, { useEffect, useRef, useState } from 'react'
import Sendmessage from '../components/Sendmessage'
import Recievemessage from '../components/Recievemessage'
import { useNavigate, useParams } from 'react-router-dom'
import Emj from '../components/Emj'
import MoreOpton from '../components/MoreOpton'
import Animationpic from '../components/Animationpic'
import Upload from '../components/Upload'
const Message = () => {
  // console.log("enter here again")

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [profile, setProfile] = useState(false)
  const [toggleFile, setToggleFile] = useState(false)
  const navigate = useNavigate()
  const [__messages, __setMessage] = useState([])
  const [message, setMessage] = useState(null)
  const _message = useRef(null)
  const messageBox = useRef(null)
  const [mousedown, setMousedown] = useState(false)
  const [info, setInfo] = useState("")
  const [name, setName] = useState("")
  const createdBy = sessionStorage.getItem("id")
  const sentTo = useParams().id
  const token = sessionStorage.getItem("token")
  const file = useRef(null)
  const fileContainer = useRef(null)
  const [socket,setSocket]=useState(null)

  const getData = async () => {
    const res = await fetch("http://localhost:5000/message/" + sentTo, {
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
    })

    if (!res.ok) {
      alert("fail to fetch messages from the data base may try again later")
      navigate("/")
      return
    }
    if (res.ok) {
      const data = await res.json()
      __setMessage([...data.message])
      console.log(data)
      const response = await fetch(`http://localhost:5000/auth/user/${sentTo}`)
      const { name } = await response.json()
      setName(name)
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    __setMessage([...__messages, {
      message: _message.current.value,
      sentTo,
      createdAt: new Date(),
      createdBy
    }])
    _message.current.value = ""
    if (!message) return
    const res = await fetch("http://localhost:5000/message", {
      method: "post",
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
      , body: JSON.stringify({
        sentTo,
        message
      })
    })

    if (!res.ok) {
      alert("fail to fetch messages from the data base may try again later")
      navigate("/")
      return
    }
    if (res.ok) {
      console.log("successfully send the message")
      socket.onclose=function () {
        console.log("closing")
      }
      socket.onmessage= function (e){
        console.log(e.data)
        const id=e.data
        if(id==sentTo){
          getData()
        }
        console.log("message from server is hello")
      }
  socket.send(createdBy)
    }
    return

  }


  useEffect(() => {
    getData()
      console.log("done")
      _message&&messageBox.current.scrollTo({
        top: 4000000,
        left: 0,
        behavior: "smooth"
      })
     setSocket(new WebSocket("ws://localhost:5000"))
  }, [sentTo])


  useEffect(() => {
    message && sendMessage()
    messageBox.current.scrollTo({
      top: 4000000,
      left: 0,
      behavior: "smooth"
    })
    return ()=>{
      console.log("done with the send message your can run a code ahere")
    }
  }, [message])
  
  const handleMousedown = message => {
    setMousedown(true)
    setInfo(function () {
      return (
        message
      )
    })
  }
  const handleMouseup = e => {
    setMousedown(function () {
      return (
        false
      )
    })
    e.stopPropagation()

  }
  const handleMousemove = e => {

  }
  return (

    <div className="message-inner-chart" style={{ backgroundColor: "var(--bg-color-1)" }}
      onClick={e => {
        setModal(function () {
          return (
            false
          )
        })
      }} onContextMenu={e => {
        return (
          e.preventDefault()
        )
      }}>

      <div className={`loader-container   ${!loading ? "--d-none" : ""}`}>
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <Upload toggle={toggleFile}  socket={socket} setToggle={setToggleFile} sentTo={sentTo} createdBy={createdBy} getData={getData}/>
      <Emj modal={modal} _message={_message} />
      <MoreOpton mousedown={mousedown} message={info} />
      <Animationpic toggle={profile} setToggle={setProfile} id={sentTo} />
      <div className="message-inner-chart-header">
        <span onClick={e => navigate("/")} className="backBtn">back</span>
        <div className="--name-container">
          <h2>{name}</h2>
          <div className="online-status-container">
            <div className="online-status">
            </div>
            <div>online</div>
          </div>
        </div>
        <div className="img--">

          <img src={`http://localhost:5000/profile/${sentTo}.jpg`} alt="" onClick={
            e => {
              setProfile(function () {
                return (
                  true
                )
              })
              e.stopPropagation()
            }
          } />
        </div>
      </div>
      <div className="container?">
        <div className="message-inner-chart-box" style={{ backgroundColor: "white" }} ref={messageBox}>
          {__messages?.map((message_, index) => {
            {
              if (message_.message === undefined) {
                return <span key={message_._id}
                >{message_.createdBy == createdBy ? (<Sendmessage imgsrc={message_.name} />) :
                  (<Recievemessage imgsrc={message_.name} />)
                  }</span>
              }

              else if ((createdBy === message_.createdBy)) {
                return <span key={index}
                  onTouchStart={e => {
                    handleMousedown(message_)
                    e.stopPropagation()
                  }}
                  onTouchEnd={handleMouseup}
                  onTouchMove={handleMousemove}
                >{<Sendmessage message={message_.message} />}</span>
              }

              else {
                return <span key={index}
                  onTouchStart={e => {
                    handleMousedown(message_)
                    e.stopPropagation()
                  }}
                  onTouchEnd={handleMouseup}
                  onTouchMove={handleMousemove}
                >{<Recievemessage message={message_.message} />}</span>
              }

            }

          })}
        </div>
        <div className="input-inner-chart"
          style={{
            backgroundColor: "var(--bg-color-1)",
          }} ref={fileContainer}>
          <div className="emj" onClick={e => {
            setModal(function () {
              return (
                !modal
              )
            })
            e.stopPropagation()
          }}>😊</div>
          <input type="text" placeholder="hey,press enter to send" style={{ outline: "none" }} ref={_message} onKeyUp={e => {
            if (e.target.value.length >= 1) {
              fileContainer.current.style.gridTemplateColumns = `10% 75% 15%
              `
              file.current.style.display = "none"
            } else {
              file.current.style.display = "block"
              fileContainer.current.style.gridTemplateColumns = `10% 70% 10% 10%`
            }
            if (e.key == "Enter") {

              setMessage(function () {
                return (
                  _message.current.value
                )
              })
            }
          }} />
          <div className="file-btn" ref={file} onClick={e => setToggleFile(true)}>
            ()
          </div>
          <div className="send_" style={{ color: "orange", textAlign: "left" }} onClick={e => {
            setMessage(function () {
              return (
                _message.current.value
              )
            })
          }} >
            send
          </div>
        </div>
      </div>
    </div>


  )
}

export default Message