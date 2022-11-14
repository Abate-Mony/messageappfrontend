import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
const Login = () => {
  const navigate = useNavigate()
  const password = useRef(null)
  const email = useRef(null)
  const [error, setError] = useState("")
  const btn = useRef(null)
  const [preventDAC, setDAC] = useState(false)

  // const [timer, setTimer] = useState(null)
  var timer = null

  const display = msg => {
    setError(msg)
    setTimeout(() => {
      setError(false)
    }, 4000);
  }


  const loginUser = async (e) => {
    clearInterval(timer)
    setDAC(true)

    if (!password.current.value || !email.current.value) {
      display("please provide  a password ,email")
      return
    }

    const text = "Please wait ..."
    var i = 0
    timer = setInterval(() => {
      btn.current.innerHTML = text.slice(0, Math.abs(i))
      i > text.length - 1 ? i *= -1 : i += 1
    }, 200)
    const res = await fetch("https://messageappalaisah.herokuapp.com/auth/login", {
      method: "post",
      headers: {
        "content-Type": "Application/json",
        "Access-Control-Allow-Origin": "https://messageappalaisah.herokuapp.com"
      }
      , body: JSON.stringify({
        password: password.current.value,
        email: email.current.value
      })
    })
    if (!res.ok) {
      setDAC(false)
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
      <div className="prevent_click" style={{ display: preventDAC ? "block" : "none" }}>
      </div>
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
      <button type="button" onClick={loginUser} ref={btn} style={{ fontSize: "1.3rem" }}>
        Login
      </button>
    </div>
  )
}

export default Login