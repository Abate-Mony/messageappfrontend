import Login from './pages/Login'
import Home from './pages/Home'
import Message from './pages/Message'
import Users from './pages/Users'
import Signup from './pages/Signup'
import Setting from './pages/Setting'
import BigShareLayout from './components/BigShareLayout'
import SharedLayout from './components/SharedLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
// local server url
// const BASE_URL = "http://192.168.43.68:5000"
// devolopment server url
const BASE_URL = "https://messageappbackendabate.onrender.com"


// local server websockert url 
// const url = BASE_URL.slice(4)
// dev server url
const url = BASE_URL.slice(5)
console.log(url)
function App() {
// document.documentElement.setAttribute("data-theme","dark")
//   local server socket url
    // const socketUrl = `ws${url}`
    // dev server socket url
    const socketUrl = `wss${url}`
    var socket = new WebSocket(socketUrl)
    if (sessionStorage.getItem("id") != null) {
        socket.onopen = function (e) {
            socket.send(
                `user_id:${sessionStorage.getItem("id")}`
            )
        }
        socket.onclose = function () {
            socket.send(
                `user_id___________:${sessionStorage.getItem("id")}`
            )
            socket = socket = new WebSocket(socketUrl)
            //  window.location.reload()
        }

    } else {
        console.log("user is offline")
    }

    const [W, setW] = useState(window.innerWidth)
    window.onresize = function () {
        setW(window.innerWidth)
    }
    return (
        <BrowserRouter className="text-light">
            <Routes>
                {W <= 576 ? <><Route path='/' element={<Home socket={socket} BASE_URL={BASE_URL} />}>
                </Route>

                    <Route path='/message/:id' element={<Message socket={socket} BASE_URL={BASE_URL} />}>
                    </Route>
                    <Route path='/users' element={<Users socket={socket} BASE_URL={BASE_URL} />}>
                    </Route>
                    <Route path="setting" element={<Setting socket={socket} BASE_URL={BASE_URL} />}>
                    </Route>
                </> : <>
                    <Route path="/" element={<BigShareLayout socket={socket} BASE_URL={BASE_URL} />}>
                        <Route index element={<div>
                            Message box
                        </div>} />

                        <Route path='/message/:id' element={<Message socket={socket} BASE_URL={BASE_URL} />}>
                        </Route>
                        <Route path="setting" element={<Setting socket={socket} BASE_URL={BASE_URL} />}>
                        </Route>
                    </Route>

                </>
                }
                <Route path="/auth" element={<SharedLayout BASE_URL={BASE_URL} />}>
                    <Route index element={<Login BASE_URL={BASE_URL} />} />
                    <Route path='login' element={<Login BASE_URL={BASE_URL} />} />
                    <Route path='signup' element={<Signup BASE_URL={BASE_URL} />} />
                </Route>
                <Route path="*" element={<div style={{ minHeight: "100vh", backgroundColor: "white" }}>not found</div>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;