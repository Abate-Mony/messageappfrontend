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

function App() {
    const BASE_URL="http://localhost:5000"
    var socket = new WebSocket("ws://192.168.43.32:5000")
    if (window.navigator.onLine) {
        socket.onopen = function (e) {
            console.log(e)
            socket.send(
                `user_id:${123456789}`
            )
        }
      
    } else {
        console.log("user is offline")
    }
    socket.onclose = function () {
        socket =socket = new WebSocket("ws://192.168.43.32:5000")
        window.location.refresh()
    }
    const [W, setW] = useState(window.innerWidth)
    window.onresize = function () {
        setW(window.innerWidth)
    }
    return (
        <BrowserRouter>
            <Routes>
                {W <= 576 ? <><Route path='/' element={<Home socket={socket} />}>
                </Route>

                    <Route path='/message/:id' element={<Message socket={socket} />}>
                    </Route>
                    <Route path='/users' element={<Users socket={socket}/>}>
                    </Route>
                    <Route path="setting" element={<Setting socket={socket} />}>
                    </Route>
                </> : <>
                    <Route path="/" element={<BigShareLayout socket={socket} />}>
                        <Route index element={<div>
                            Message box
                        </div>} />

                        <Route path='/message/:id' element={<Message socket={socket} />}>
                        </Route>
                        <Route path="setting" element={<Setting socket={socket} />}>
                        </Route>
                    </Route>

                </>
                }
                <Route path="/auth" element={<SharedLayout />}>
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Route>
                <Route path="*" element={<div style={{ minHeight: "100vh", backgroundColor: "white" }}>not found</div>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;