import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Setting from '../pages/Setting'
const SharedLayout = ({ socket,BASE_URL }) => {
    const [toggle, setToggle] = useState(true)
    return (
        <div className="big-share-layout" style={{ backgroundColor: "white" }}>
            <div className="add-btn center circle" style={{ width: "50px", height: "50px", left: "1rem", display: "flex" }} onClick={e => {
                setToggle(!toggle)
            }}>
                {toggle ? "+" : <span style={{ color: "red" }}>
                    X
                </span>}
            </div>
            <div>
                {toggle ? <Home socket={socket} BASE_URL={BASE_URL} /> : <Users socket={socket} BASE_URL={BASE_URL}/>}
            </div>
            <Outlet />
            <div class="big-settings">
                <Setting BASE_URL={BASE_URL} />
            </div>
        </div>
    )
}

export default SharedLayout