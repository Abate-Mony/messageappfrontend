import { useState, useEffect } from 'react'
import Messagerow from '../components/Messagerow'
import { useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'

const Home = ({ socket, BASE_URL, BigMessages, setBigMessages }) => {
  const [typing, setTyping] = useState(false)
  const [timer, setTimer] = useState(null)

  const navigate = useNavigate()
  const url = BASE_URL + "/auth/users"
  const [users, setUsers] = useState([])
  const token = sessionStorage.getItem("token")

  const _users = sessionStorage.getItem("users")
  if (!_users) {
    sessionStorage.setItem("users",
      JSON.stringify(
        []
      ))
  }
  



  async function getUsers() {
    setUsers(JSON.parse(sessionStorage.getItem("users")))
    const res = await fetch(url, {
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
    })
    if(!res.ok) return navigate("/auth")
    const data = await res.json()
    if (!(sessionStorage.getItem("users") === JSON.stringify([...data.users]))) {
      sessionStorage.setItem("users", JSON.stringify([...data.users]))
      setUsers([...data.users])
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  socket.onmessage = function (e) {
    const id = e.data
    const createdBy = sessionStorage.getItem("id")

    if (id.split("-")[0] == createdBy) {
      getUsers()
    }
    users.map(({ name, _id, createdAt, message }, index) => {
      if (id.split("|")[0] == createdBy && id.split("|")[1] == _id) {
        clearTimeout(timer)
        var tempUsers = users
        var messageAtIndex = tempUsers[index].message
        tempUsers[index].message = "typing ..."
        setTyping(true)
        setTimer(setTimeout(() => {
          tempUsers[index].message = messageAtIndex
          setUsers([...tempUsers])

          setTyping(false)
          clearTimeout(timer)
        }, 500))
      }
    })

  }
  socket.onopen = function (e) {
    console.log("connected to wss ", e.data)
    const createdBy = sessionStorage.getItem("id")
  }

  return (
    <>
      <div className="add-btn center circle" style={{ width: "50px", height: "50px" }} onClick={e => navigate("/users")}>
        <BsFillPlusCircleFill color="white"/>
      </div>
      <div className="header-container">
        <h2>
          MESSAGES
        </h2>
        <span onClick={e => navigate("/setting")} className="toggleSetting">
          <FiSettings size="1.5rem"  color="orange"/>
        </span>
      </div>
      <div className="message-container"


      >
        {/* <div className="online-container-users" >
          <div className="online-user">
          </div>
          <div className="online-user">
          </div>
          <div className="online-user">
          </div>
          <div className="online-user">
          </div>
          <div className="online-user">
          </div>
          <div className="online-user">
          </div>
          <div className="online-user">
          </div>
          </div> */}
        {users.map(({ name, _id, createdAt, message }, index) => {
          return (
            <div key={_id} >
              {<Messagerow name={name} id={_id} message={message}
                time={createdAt} typing={typing} />}
            </div>
          )
        })}
      </div>

    </>
  )
}

export default Home