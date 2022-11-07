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
const socket = new WebSocket("ws://192.168.43.32:5000")
function App() {
    socket.onclose = function () {

        console.log("socket is closing")
        // window.location.reload()
    }
    const [W, setW] = useState(window.innerWidth)
    // console.log(W)
    window.onresize = function () {
        setW(window.innerWidth)
        // console.log(W)
    }
    return (
        <BrowserRouter>
            <Routes>
                {W <= 576 ? <><Route path='/' element={<Home socket={socket} />}>
                </Route>

                    <Route path='/message/:id' element={<Message socket={socket} />}>
                    </Route>
                    <Route path='/users' element={<Users />}>
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