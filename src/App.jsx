import Login from './pages/Login'
import Home from './pages/Home'
import Message from './pages/Message'
import Users from './pages/Users'
// import Auth from './pages/Auth'
import Signup from './pages/Signup'
import Setting from './pages/Setting'
import BigShareLayout from './components/BigShareLayout'
import SharedLayout from './components/SharedLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [W, setW] = useState(window.innerWidth)
    console.log(W)
    window.onresize = function () {
        setW(window.innerWidth)
        console.log(W)
    }
    return (
        <BrowserRouter>
            <Routes>
                {W <= 576 ? <><Route path='/' element={<Home />}>
                </Route>

                    <Route path='/message/:id' element={<Message />}>
                    </Route>
                    <Route path='/users' element={<Users />}>
                    </Route>
                    <Route path="setting" element={<Setting />}>
                    </Route>
                </> : <>
                    <Route path="/" element={<BigShareLayout/>}>
                    <Route index element={<div>
                        Message box
                    </div>} />

                    <Route path='/message/:id' element={<Message />}>
                    </Route>
                    <Route path="setting" element={<Setting />}>
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