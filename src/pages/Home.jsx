import { useState,useEffect } from 'react'
import Messagerow from '../components/Messagerow'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  // const [socket,setSocket]=useState(new WebSocket("ws://localhost:5000"))
  
//   socket.onmessage= function (e){
// console.log(createdBy,":-----:",id)
// alert(id)
//     const id=e.data
//     const  createdBy=sessionStorage.getItem("id")
//       getUsers()

//     if(id==createdBy){
//     }
//     console.log("message from server is hello",id)
//   }
  
  const navigate = useNavigate()
  const url = "http://localhost:5000/auth/users"
  const [users, setUsers] = useState([])
 const  token=sessionStorage.getItem("token")
  async function getUsers() {
    const res = await fetch(url, {
      headers: {
        "content-Type": "Application/json",
        "Authorization":`doris ${token}`
      }
    })
    const data = await res.json()
    setUsers(function () {
      return (
        [...data.users]
      )
    })

  }
  useEffect(() => {
    getUsers()
    // setSocket(new WebSocket("ws://localhost:5000"))
    return () => {
    }
  }, [])



  return (
    <div className="_home">
      <div className="user-alert">

      </div>
      <div className="add-btn center circle" style={{width:"50px",height:"50px"}} onClick={e=>{
        navigate("/users")
      }}>
        +
      </div>
      <div className="container?">

        <div className="header-container">
          <h2>
            MESSAGES
          </h2>
          <span onClick={e=>navigate("/setting")}>
        🧰
          </span>
        </div>
      </div>
      <div className="container?">
        <div className="message-container">
          {users.map(({name,_id,createdAt,message}, index) => {
            return (
              <div key={_id} onClick={e => {
                navigate(`/message/${_id}`)
              }}>
                {<Messagerow name={name} id={_id} message={message} 
                time={createdAt}/>}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Home