import React, { useEffect, useRef, useState } from 'react'
import Sendmessage from '../components/Sendmessage'
import Recievemessage from '../components/Recievemessage'
import { useNavigate, useParams } from 'react-router-dom'
import Emj from '../components/Emj'
import MoreOpton from '../components/MoreOpton'
import Animationpic from '../components/Animationpic'
import Upload from '../components/Upload'
import DateFormater from '../components/DateFormater'
// const socket = new WebSocket("ws://192.168.43.32:5000")
const Message = ({ socket }) => {
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [profile, setProfile] = useState(false)
  const [toggleFile, setToggleFile] = useState(false)
  const navigate = useNavigate()
  const [__messages, __setMessage] = useState([])
  // const [message, setMessage] = useState(null)
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




  const getData = async () => {
    const res = await fetch("http://192.168.43.32:5000/message/" + sentTo, {
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
      // const M = [...data.message]
      const response = await fetch(`http://192.168.43.32:5000/auth/user/${sentTo}`)
      const { user_names: { first_name, second_name } } = await response.json()
      const names = first_name + " " + second_name
      setName(names)
      setLoading(false)

    }
  }

  const sendMessage = async () => {
    if (_message.current.value.length < 1) return
    __setMessage([...__messages, {
      message: _message.current.value,
      sentTo,
      createdAt: new Date(),
      createdBy
    }])
    messageBox.current.scrollTo({
      top: 4000000,
      left: 0,
      behavior: "smooth"
    })
    const message = _message.current.value
    _message.current.value = ""

    const res = await fetch("http://192.168.43.32:5000/message", {
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
      socket.send(sentTo)
    }
    return

  }

  socket.onmessage = function (e) {
    const id = e.data
    console.log("inside message ")
    if (createdBy == id) {

      getData()
      _message && messageBox.current.scrollTo({
        top: 4000000,
        left: 0,
        behavior: "smooth"
      })
    }

  }
  useEffect(() => {
    getData()
    _message && messageBox.current.scrollTo({
      top: 4000000,
      left: 0,
      behavior: "smooth"
    })


  }, [sentTo])



  // useEffect(() => {
  //   message && sendMessage()
  //   messageBox.current.scrollTo({
  //     top: 4000000,
  //     left: 0,
  //     behavior: "smooth"
  //   })

  // }, [message])

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




  const fd = (arr, i) => (i + 1) >= arr.length - 1 ? arr.length - 1 : (i + 1)
  const FD = (date) => new Date(date).toLocaleDateString()
  var currentDate = null
  const printDate = (arr, index) => {
    if (index === 0) {
      currentDate = FD(arr[0].createdAt);
      return <DateFormater date={currentDate} />
    }
    if (currentDate == FD(arr[fd(arr, index)].createdAt)) {
      return
    }
    currentDate = FD(arr[fd(arr, index)].createdAt)
    return <DateFormater date={currentDate} />
  }
  const alignMessages = (message, index, arr) => {

    if (message.message === undefined) {
      return <span key={message._id}
      >
        {printDate(arr, index)}
        {message.createdBy === createdBy ? (<Sendmessage imgsrc={message.name} />) :
          (<Recievemessage imgsrc={message.name} />)
        }</span>
    }
    else if ((createdBy === message.createdBy)) {
      return <span key={index}
        onTouchStart={e => {
          handleMousedown(message)
          e.stopPropagation()
        }}
        onTouchEnd={handleMouseup}
        onTouchMove={handleMousemove}
      >
        {printDate(arr, index)}
        {<Sendmessage message={message.message} />}</span>
    }

    else {
      return <span key={index}
        onTouchStart={e => {
          handleMousedown(message)
          e.stopPropagation()
        }}
        onTouchEnd={handleMouseup}
        onTouchMove={handleMousemove}
      >
        {printDate(arr, index)}
        {<Recievemessage message={message.message} />}</span>
    }
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
      <Upload toggle={toggleFile} setToggle={setToggleFile} sentTo={sentTo} getData={getData} />
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
            <div >online</div>
          </div>
        </div>
        <div className="img--">

          <img src={`http://192.168.43.32:5000/profile/${sentTo}.jpg`} alt="" onClick={
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
          {__messages.length > 0 ? __messages?.map(alignMessages) : <div id="hi-btn" style={{ color: "white" }} onClick={e =>
            [_message.current.value = "Hi 🙋‍♂️", sendMessage()]
          }>Tap to Say Hi</div>}
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
            if (e.key === "Enter") {
              sendMessage()
              // setMessage(function () {
              //   return (
              //     _message.current.value
              //   )
              // })
            }
          }} />
          <div className="file-btn" ref={file} onClick={e => setToggleFile(true)}>
            ()
          </div>
          <div className="send_" style={{ color: "orange", textAlign: "left" }} onClick={e => {
            // setMessage(function () {
            //   return (
            //     _message.current.value
            //   )
            // })
            sendMessage()
          }} >
            send
          </div>
        </div>
      </div>
    </div>


  )
}

export default Message