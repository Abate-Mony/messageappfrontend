import React, { useEffect, useRef, useState } from 'react'
import Sendmessage from '../components/Sendmessage'
import Recievemessage from '../components/Recievemessage'
import { useNavigate, useParams } from 'react-router-dom'
import Emj from '../components/Emj'
import MoreOpton from '../components/MoreOpton'
import Animationpic from '../components/Animationpic'
import Upload from '../components/Upload'
import DateFormater from '../components/DateFormater'
import Notification from '../components/Notification'
const Message = ({ socket }) => {
  const [src, setSrc] = useState("")

  const [typing, setTyping] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [profile, setProfile] = useState(false)
  const [toggleFile, setToggleFile] = useState(false)
  const navigate = useNavigate()
  const [__messages, __setMessage] = useState([])
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
  const [timer, setTimer] = useState(null)
  const indicator = useRef(null)
  const scrolltop = useRef(null)
  const scrollbottom = useRef(null)
  var _timer = null
  const [incomingmessage, setIncomingMessage] = useState(false)
  const [incomingInfo, setInComingInfo] = useState("")
  const getData = async () => {
    const res = await fetch("https://messageappalaisah.herokuapp.com/message/" + sentTo, {
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
      const response = await fetch(`https://messageappalaisah.herokuapp.com/auth/user/${sentTo}`)
      const { user_names: { first_name, second_name } } = await response.json()
      const names = first_name + " " + second_name
      setName(names)
      setLoading(false)
      
      const _res = await fetch("https://messageappalaisah.herokuapp.com/profile/" + sentTo)
      const { image } = await _res.json()
      console.log(image)
      setSrc("https://messageappalaisah.herokuapp.com/profile/image/" + image)
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
    scrollMessageBox()
    const message = _message.current.value
    _message.current.value = ""

    const res = await fetch("https://messageappalaisah.herokuapp.com/message", {
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
      const { message: { _id } } = await res.json()
      console.log(_id)
      socket.send(
        sentTo + "-" + createdBy + "-" + _id
      )
    }
    return

  }

  socket.onmessage = function (e) {
    const id = e.data
    if (id.split("-")[0] == createdBy) {
      getData()
      _message && messageBox.current.scrollTo({
        top: 4000000,
        left: 0,
        behavior: "smooth"
      })
      console.log("inside message ")

    }
    if (id.split("-")[0] == createdBy && id.split("-")[1] !== sentTo) {
      (async function () {
        const userId = id.split("-")[1]
        const messageId = id.split("-")[2];

        const res = await fetch("https://messageappalaisah.herokuapp.com/message/single/" + messageId, {
          headers: {
            "content-Type": "Application/json",
            "Authorization": `doris ${token}`
          }
        })

        const response = await fetch(`https://messageappalaisah.herokuapp.com/auth/user/${userId}`)
        const { user_names: { first_name, second_name } } = await response.json()
        const names = first_name + " " + second_name
        const data = await res.json()
        const _Message = data.message[0].message
        // console.log(data.message[0].message)



        setInComingInfo(
          [userId, _Message, names]
        )
        const m = data[0]
      }())












      setIncomingMessage(true)
      _timer = setTimeout(() => {
        setIncomingMessage(false)
      }, 3000);
      return
    }

    if (id.split("|")[0] == createdBy && id.split("|")[1] == sentTo) {
      setTyping(true)
      clearTimeout(timer)
      setTimer(setTimeout(() => {
        setTyping(false)
        clearTimeout(timer)
      }, 500))
    }
    // if (id.split("|")[0] == sentTo && id.split("|")[1] == "online") {
    //   console.log("online here")
    //   // setOnline(true)
    // }
  }
  function scrollMessageBox(top = 4000000) {
    _message && messageBox.current.scrollTo({
      top,
      left: 0,
      behavior: "smooth"
    })
  }
  useEffect(() => {
    getData()
    // scrollMessageBox()
  }, [sentTo])

  const handleMousedown = message => {
    clearTimeout(timer)

    setTimer(setTimeout(() => {
      setMousedown(true)

    }, 500))
    setInfo(function () {
      return (
        message
      )
    })
  }
  const handleMouseup = e => {
    clearTimeout(timer)
    console.log("clearing timeout")
    e.stopPropagation()
  }

  const handleTyping = (sn, cb) => {
    socket.send(sn + "|" + cb)
  }
  const handleToggleFile = e => {
    handleTyping(sentTo, createdBy)

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

    }
  }


  function myFunction(e) {
    indicator.current.style.height = `0.25rem`
    var winScroll = e.target.scrollTop
    var height = e.target.scrollHeight - e.target.getBoundingClientRect().height
    var scrolled = (winScroll / height) * 100;
    indicator.current.style.width = `${scrolled}%`
    if (scrolled <= 70) {
      scrollbottom.current.style.right = "2rem"
      scrolltop.current.style.right = "-2rem"
    } else {
      scrollbottom.current.style.right = "-2rem"
      scrolltop.current.style.right = "2rem"
    }




  }




  const fd = (arr, i) => (i + 1) >= arr.length - 1 ? arr.length - 1 : (i + 1)
  const FD = (date) => new Date(date).toLocaleDateString()
  var currentDate = null
  var currentMessage = null
  const printSpaceBetweenMessages = (arr, index, _id) => {
    if (index === 0) {
      currentMessage = arr[fd(arr, index)].createdBy
    }
    if (currentMessage == arr[fd(arr, index)].createdBy) {
      return
    }
    currentMessage = arr[fd(arr, index)].createdBy
    return <div style={{ padding: "2rem", backgroundColor: "transparent" }}></div>
  }
  const printDate = (arr, index) => {
    if (index === 0) {
      currentDate = FD(arr[0].createdAt);
      currentMessage = fd(arr, index)
      return <DateFormater date={arr[fd(arr, index)].createdAt} />
    }
    if (currentDate == FD(arr[fd(arr, index)].createdAt)) {
      return
    }
    currentDate = FD(arr[fd(arr, index)].createdAt)

    return <DateFormater date={arr[fd(arr, index)].createdAt} />
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
      >
        {printDate(arr, index, createdBy)}

        {<Sendmessage message={message.message} />}
        {printSpaceBetweenMessages(arr, index, createdBy)}

      </span>

    }

    else {
      return <span key={index}
        onTouchStart={e => {
          handleMousedown(message)
          e.stopPropagation()
        }}
        onTouchEnd={handleMouseup}
      >
        {printDate(arr, index)}
        {<Recievemessage message={message.message} />}

        {printSpaceBetweenMessages(arr, index, sentTo)}

      </span>
    }
  }
  return (<>{!loading ?
    <div className="message-inner-chart" style={{
      backgroundColor: "var(--bg-color-1)",
      position: "relative"
    }}
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

      <span className="scrollto bottm"
        onClick={e => scrollMessageBox()}
        ref={scrollbottom}>
        🔽
      </span>
      <span className="scrollto top"
        onClick={e => scrollMessageBox(0)}
        ref={scrolltop}>
        🔝
      </span>

      <Notification incomingmessage={incomingmessage} incomingInfo={incomingInfo} />
      <Upload toggle={toggleFile} setToggle={setToggleFile} sentTo={sentTo} getData={getData} />
      <Emj modal={modal} _message={_message} />
      <MoreOpton mousedown={mousedown} message={info} setMousedown={setMousedown} />
      <Animationpic toggle={profile} setToggle={setProfile} src={src} />
      <div className="message-inner-chart-header">
        <span className="scrollindicator" ref={indicator}></span>
        <span onClick={e => navigate("/")} className="backBtn">back</span>
        <div className="--name-container">
          <h2>{name}</h2>
          <div className="online-status-container">
            {typing ? <div className="typing" style={{ letterSpacing: "0.125rem" }}> typing ...
            </div> : ""}
          </div>
        </div>
        <div className="img--">

          <img src={src} alt="" onClick={
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
      <div className="message-inner-chart-box" style={{ backgroundColor: "white" }}
        ref={messageBox} onScroll={myFunction}>
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
        <input type="text"
          placeholder="hey,press enter to send"
          style={{ outline: "none" }} ref={_message} onKeyUp={handleToggleFile} />
        <div className="file-btn" ref={file} onClick={e => setToggleFile(true)}>
          ()
        </div>
        <div className="send_" style={{ color: "orange", textAlign: "left" }} onClick={e => {
          sendMessage()
        }} >
          send
        </div>
      </div>
    </div> : <div className={`loader-container`} style={{
      zIndex: 1000,
      position: "relative"
    }}>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>}</>
  )
}

export default Message