import { useRef, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
const Login = () => {
  const navigate = useNavigate()
  const password = useRef(null)
  const email = useRef(null)
  const [error,setError]=useState("")
  const loginUser = async (e) => {
    e.target.innerHTML="please wait ..."
    if(!password.current.value || !email.current.value){
      return  
    }
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "post",
      headers: {
        "content-Type": "Application/json",
      }
      , body: JSON.stringify({
        password:password.current.value,
        email:email.current.value
      })
    })
    if(!res.ok){
      const data = await res.text()
      setError("try again later")
      setTimeout(() => {
        setError(false)
      }, 4000);
    e.target.innerHTML="login"
      console.log("fail to login user")
      return 
    }
    const {userInfo:{name,_id},token} = await res.json()
    sessionStorage.setItem("token",token)
    sessionStorage.setItem("id",_id)
    navigate("/")
    console.log(name,_id)
  }










  return (
    <div style={{ backgroundColor: "white" }} className="login-container">
      <label >Email Address</label>
      <input type="email" required={true}
       name="email" placeholder={"Email Address"}  ref={email} />
      <label>Password</label>
      <input type="password" name="password" placeholder={"Enter Password"} ref={password}
       required={true}  onChange={e=>{
        if(e.target.value.length<=3 && e.target.value>=1){
          setError("password must be greater thanor equal to 4")
          return
        }
        setError(false)
       }}/>
      {error&&<Alert message={error}/>}
      <button type="button" onClick={loginUser}>
        Login
      </button>
    </div>
  )
}

export default Login