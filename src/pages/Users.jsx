import { useState, useEffect, useRef } from 'react'
import User from '../components/User'
import { useNavigate } from 'react-router-dom'
import PulseUser from '../components/PulseUser'
import Notification from '../components/Notification'
import {CiSearch,CiCircleRemove} from 'react-icons/ci'
import {RiSettings2Fill} from 'react-icons/ri'
import {AiFillHome} from 'react-icons/ai'
const Users = ({socket,BASE_URL }) => {
  const [incomingmessage, setIncomingMessage] = useState(false)
  const [incomingInfo, setInComingInfo] = useState([])
  const createdBy = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    var _timer=null
    const text = "Search user e.g Ako Bate"
    var i = 0




const [isLoading, setisLoading] = useState(true)
  const search = useRef(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const id = sessionStorage.getItem("id")

  const getUsers = async (searchValue) => {
    
    const res = await fetch(BASE_URL+`/auth/allusers/${searchValue}`)
    if (!res.ok) {
      console.log("something wrong wrong happen here ")
    
      return
    }
    const { users } = await res.json()
    console.log(users)
    setUsers([...users])
    setisLoading(false)
  }
  
  function animate() {
    clearInterval(_timer)
    _timer= setInterval(() => {
      if(!search.current){
        return
      }
    search.current.placeholder=text.slice(0, Math.abs(i))
      i > text.length - 1 ? i *= -1 : i += 1
    }, 100)
  }
  useEffect(() => {
    getUsers("*")
    animate()
    return () => {
    }
  }, [])

  socket.onmessage = function (e) {
    const id = e.data
    if (id.split("-")[0] === createdBy ) {
      (async function () {
        const userId = id.split("-")[1]
        const messageId = id.split("-")[2];
        const res = await fetch(BASE_URL+"/message/single/" + messageId, {
          headers: {
            "content-Type": "Application/json",
            "Authorization": `doris ${token}`
          }
        })
        
      const response =
       await fetch(BASE_URL+`/auth/user/${userId}`)
      const { user_names: { first_name, second_name } } = await response.json()
      const names = first_name + " " + second_name
        const data = await res.json()
        const _Message = data.message[0].message
        setInComingInfo(
          [userId, _Message,names]
        )
      }())

      setIncomingMessage(true)
      _timer = setTimeout(() => {
        setIncomingMessage(false)
      }, 3000);
      return
    }
    
  }









  const handleSearch = e => {
    const searchvalue = search.current.value
    if (searchvalue.length <= 0) {
      return
    }
    getUsers(searchvalue)
  }
  return (
    
    <div className="user-big-container">
      <Notification incomingmessage={incomingmessage} incomingInfo={incomingInfo}/>
      <div className="navigate-user">
        <div className="back" onClick={e => navigate("/")}>
        <AiFillHome />
        </div>
        <div className="right" onClick={e => navigate("/setting")}>
          <RiSettings2Fill/>
        </div>
      </div>
      <div className="header" style={{
        backgroundColor:
          "rgb(255,255,255,0)"
      }}>
        
        <div className="input-searchusers"  >
          <span onClick={handleSearch} >
            <CiSearch style={{marginLeft:"0.6rem"}} size="1.5rem"/>
          </span>
          <input type="text" id="__search"
            autoComplete="false"
            placeholder={"please user e.g Ako Bate "} 
            ref={search} onChange={e => {
              if (e.target.value.length < 1) {
                getUsers("*")
              }
            }}

            onKeyUp={e => e.key === "Enter" && handleSearch()
            } />

          <span className="delBtn" onClick={e =>
            [getUsers("*"),
            search.current.value = ""]
          }
          >
<CiCircleRemove style={{marginLeft:"0.6rem"}} size="1.5rem"/>
          </span>
        </div>

      </div>
      <div className="users-container">
        {isLoading?<PulseUser/>: users.length >= 1 ? users?.map(({ first_name, second_name, _id, createdAt }) => {
          return (<span key={_id} onClick={e => {
            navigate(`/message/${_id}`)
          }}>
            {id !== _id && <User name={[first_name, second_name]} id={_id} createdAt={createdAt} />}
          </span>)
        }) : search && <div style={{ padding: "4rem 1rem", textAlign: "center", color: "red", fontSize: "2rem" }}>
          no users </div>}
      </div>

    </div>
  )
}

export default Users