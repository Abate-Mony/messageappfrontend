import { useState, useEffect } from 'react'
import Messagerow from '../components/Messagerow'
import { useNavigate } from 'react-router-dom'
const Home = ({ socket }) => {

  const navigate = useNavigate()
  const url = "https://messageappalaisah.herokuapp.com/auth/users"
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
      console.log("home here")
      getUsers()
    }

  }
  socket.onopen = function (e) {
    console.log("connected to wss ", e.data)
    const createdBy = sessionStorage.getItem("id")
  }

  return (
    <>
      <div className="add-btn center circle" style={{ width: "50px", height: "50px" }} onClick={e => navigate("/users")}>
        +
      </div>
        <div className="header-container">
          <h2>
            MESSAGES
          </h2>
          <span onClick={e => navigate("/setting")} className="toggleSetting">
            🧰
          </span>
        </div>
        <div className="message-container">
          {users.map(({ name, _id, createdAt, message }, index) => {
            return (
              <div key={_id} >
                {<Messagerow name={name} id={_id} message={message}
                  time={createdAt} />}
              </div>
            )
          })}
        </div>

    </>
  )
}

export default Home