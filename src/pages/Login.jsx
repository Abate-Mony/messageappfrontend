import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
const Login = () => {
  const navigate = useNavigate()
  const password = useRef(null)
  const email = useRef(null)
  const [error, setError] = useState("")
  const btn = useRef(null)

  const display = msg => {
    setError(msg)
    setTimeout(() => {
      setError(false)
    }, 4000);
  }


  const loginUser = async (e) => {
    if (!password.current.value || !email.current.value) {
      display("please provide  a password ,email")
      return
    }

    const text = "Please wait ..."
    var i = 0
    var timer = setInterval(() => {
      btn.current.innerHTML = text.slice(0, Math.abs(i))
      i > text.length - 1 ? i *= -1 : i += 1
    }, 200)
    const res = await fetch("http://192.168.43.32:5000/auth/login", {
      method: "post",
      headers: {
        "content-Type": "Application/json",
      }
      , body: JSON.stringify({
        password: password.current.value,
        email: email.current.value
      })
    })
    if (!res.ok) {
      clearInterval(timer)
      btn.current.innerHTML = "Loging"
      const { msg } = await res.json()
      display(msg)
      btn.current.innerHTML = "login"
      return
    }
    const { userInfo: { name, _id }, token } = await res.json()
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("id", _id)
    clearInterval(timer)
    navigate("/")
  }


  return (
    <div style={{ backgroundColor: "white" }} className="login-container">
      <label >Email Address</label>
      <input type="email" required={true}
        name="email" placeholder={"Email Address"} ref={email} />
      <label>Password</label>
      <input type="password" name="password" placeholder={"Enter Password"} ref={password}
        required={true} onChange={e => {
          if (e.target.value.length <= 3 && e.target.value >= 1) {
            setError("password must be greater thanor equal to 4")
            return
          }
          setError(false)
        }} />
      {error && <Alert message={error} />}
      <button type="button" onClick={loginUser} ref={btn}>
        Login
      </button>
    </div>
  )
}

export default Login