import { useState, useEffect, useRef } from 'react'
import User from '../components/User'
import { useNavigate } from 'react-router-dom'
const Users = () => {
  const search = useRef(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const id = sessionStorage.getItem("id")
  const getUsers = async (searchValue) => {
    const res = await fetch(`http://localhost:5000/auth/allusers/${searchValue}`)
    if (!res.ok) {
      console.log("something wrong wrong happen here ")
      return
    }
    // ecvverythingi s gps ere
    const { users } = await res.json()
    // console.log(users)
    setUsers([...users])
  }
  useEffect(() => {
    getUsers("*")
  }, [])
  const handleSearch = e => {

    const searchvalue = search.current.value
    if(searchvalue.length<=0){
      return 
    }
    getUsers(searchvalue)
  }
  return (
    <div className="minHeight" style={{ backgroundColor: "white" }}>
      <div className="header" style={{ backgroundColor: "white" }}>

        <h2>
          Search users
        </h2>
        <div className="input-searchusers">
          <span onClick={handleSearch}>
            🔍
          </span>
          <input type="text" id="__search"
            autoComplete="false" placeholder="search user e.g Rose mary" ref={search} onChange={e => {
              if (e.target.value.length < 1) {
                getUsers("*")
              }
            }}
            
            onKeyUp={e=>e.key==="Enter"&&handleSearch()
            }/>
          <span className="delBtn" onClick={e=>
               [getUsers("*"),
               search.current.value = ""]
          }
          >
            ⬅
          </span>
        </div>

      </div>
      <div className="users-container">
        {users.length>=1?users?.map(({ name, _id }) => {

          return (<span key={_id} onClick={e => {
            navigate(`/message/${_id}`)
          }}>
            {id !== _id && <User name={name} id={_id} />}
          </span>)
        }):search&&<div style={{padding:"4rem 1rem",textAlign:"center",color:"red",fontSize:"2rem" }}>
        no users </div>}
      </div>

    </div>
  )
}

export default Users