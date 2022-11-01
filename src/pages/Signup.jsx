import { useState, useRef } from 'react'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const form = useRef(null)
  const password1 = useRef(null)
  const password2 = useRef(null)
  const email = useRef(null)
  const username = useRef(null)
  const [error, setError] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(password1.current.value === password2.current.value)
      || password2.current.value.length < 4 ||
      password1.current.value.length < 4
    ) {
      alert("form validation failed")
    }
    const FD = form.current
    const formData = new FormData(FD)
    const xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
      if (this.status == 200 && this.readyState == 4) {
        const { token,_id } = JSON.parse(this.response)
        console.log(token)
        // sessionStorage.getItem("token")&&sessionStorage.removeItem("token")
        sessionStorage.setItem("token", token)
    sessionStorage.setItem("id",_id)

        navigate("/")
      } else {
        console.log("something went wrong")
      }
    }
    xhr.onerror = function (e) {
      console.log("something happened ")
    }
    xhr.open("POST", "http://localhost:5000/auth/signup", true)
    xhr.send(formData)

  }
  return (
    <form encType="multipart/form-data"
      ref={form} onSubmit={handleSubmit}>
      <div style={{ backgroundColor: "white" }} className="signup-container">
        <label >User Name</label>

        <input type="text" name={"name"} placeholder={"User Name"} required={true} id="name" />
        <label >Email Adress</label>

        <input type="email" name={"email"} placeholder={"Email"} id="email" required={true} />
        <label >Password</label>

        <input type="password" name={"password"} placeholder={"Password"}
          ref={password1} onChange={e => {
            if (password2.current.value.length >= 1) {
              if (e.target.value !== password2.current.value) {
                setError("password doesnt match !")
                return
              }
              setError(false)

            }

            if (e.target.value.length <= 3 && e.target.value >= 1) {
              setError("password must be greater thanor equal to 4")
              return
            }
            setError(false)
          }} required={true} />
        <label htmlFor="">Confirm password</label>
        <input type="password" name="password2"
          placeholder={"Confirm Password"} ref={password2} onChange={e => {

            if (password1.current.value.length >= 1) {
              if (e.target.value !== password1.current.value) {
                setError("password doesnt match !")
                return
              }
              setError(false)
            }
            if (e.target.value.length <= 3 && e.target.value >= 1) {
              setError("password must be greater thanor equal to 4")
              return
            }
            setError(false)

          }} />
        <input type="file" name="file" id="file" required={true} />
        {error && <Alert message={error} />}
        <button type="submit">
          Create Account
        </button>
      </div>
    </form>

  )
}

export default Signup