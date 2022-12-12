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
// const BASE_URL="http://192.168.43.32:5000"
// const BASE_URL="http://localhost:5000"
const BASE_URL="http://192.168.43.68:5000"

function App() {
    const socketUrl="ws://localhost:5000"
    var socket = new WebSocket(socketUrl)
    if ( sessionStorage.getItem("id")!=null) {
        socket.onopen = function (e) {
            // console.log(e)
            socket.send(
                `user_id:${sessionStorage.getItem("id")}`
            )
        }
        socket.onclose = function () {
            socket.send(
                `user_id___________:${sessionStorage.getItem("id")}`
            )
            socket =socket = new WebSocket("ws://localhost:5000")
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
        <BrowserRouter>
            <Routes>
                {W <= 576 ? <><Route path='/' element={<Home socket={socket} BASE_URL={BASE_URL} />}>
                </Route>

                    <Route path='/message/:id' element={<Message socket={socket} BASE_URL={BASE_URL} />}>
                    </Route>
                    <Route path='/users' element={<Users socket={socket} BASE_URL={BASE_URL}/>}>
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
                        <Route path="setting" element={<Setting socket={socket} BASE_URL={BASE_URL}/>}>
                        </Route>
                    </Route>

                </>
                }
                <Route path="/auth" element={<SharedLayout  BASE_URL={BASE_URL} /> }>
                    <Route index element={<Login  BASE_URL={BASE_URL}/>} />
                    <Route path='login' element={<Login  BASE_URL={BASE_URL}/>} />
                    <Route path='signup' element={<Signup  BASE_URL={BASE_URL}/>} />
                </Route>
                <Route path="*" element={<div style={{ minHeight: "100vh", backgroundColor: "white" }}>not found</div>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;