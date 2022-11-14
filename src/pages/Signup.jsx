import { useState, useRef } from 'react'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const form = useRef(null)
  const password1 = useRef(null)
  const password2 = useRef(null)
  const btn = useRef(null)
  const [error, setError] = useState(false)
  const [preventDAC, setDAC] = useState(false)
  const handleSubmit = async (e) => {
    // setError("plwase wait ")
    setDAC(true)
    e.preventDefault()
    if (!(password1.current.value === password2.current.value)
      || password2.current.value.length < 4 ||
      password1.current.value.length < 4
    ) {
      alert("form validation failed")
    }


    // const searchContainer = document.getElementById("search")
    const text = "Please wait Creating Account"
    var i = 0
    var timer = setInterval(() => {
      btn.current.innerHTML = text.slice(0, Math.abs(i))
      i > text.length - 1 ? i *= -1 : i += 1
    }, 200)

    const FD = form.current
    const formData = new FormData(FD)
    const xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
      if (this.status === 200 && this.readyState === 4) {
        // this means the server send back a valid response back to the client
        const { token, _id } = JSON.parse(this.response)
        if (sessionStorage.getItem("users")) {
          sessionStorage.removeItem("users")
        }
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("id", _id)
        clearInterval(timer)
        navigate("/")
      } else {
        setDAC(false)
        clearInterval(timer)
        btn.current.innerHTML = "Create Account"
        console.log(this.response)
        console.log("something went wrong")
        setError("try again later")
        setTimeout(() => {
          setError(false)
        }, 4000);
      }
    }
    xhr.onerror = function (e) {
      console.log("something happened ")
    }

    // res.header("Access-Control-Allow-Origin", "http://localhost:5501"); // update to match the domain you will make the request from
    // res.send(response.data);











    xhr.open("POST", "https://messageappalaisah.herokuapp.com/auth/signup", true)
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000")

    xhr.send(formData)

  }
  return (
    <form encType="multipart/form-data"
      ref={form} onSubmit={handleSubmit}>
      <div className="prevent_click" style={{ display: preventDAC ? "block" : "none" }}>
      </div>
      <div style={{ backgroundColor: "white" }} className="signup-container">
        <label >First Name</label>
        <input type="text" name={"first_name"} placeholder={"First Name"} required={true} id="first_name" />
        <label >Second Name</label>
        <input type="text" name={"second_name"} placeholder={"Second Name"} required={true} id="second_name" />
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
        <input type="file" name="file" id="file"
          required={true} />
        {error && <Alert message={error} />
        }
        <button type="submit" ref={btn} style={{ fontSize: "1.3rem" }}>
          Create Account
        </button>
      </div>
    </form>

  )
}

export default Signup