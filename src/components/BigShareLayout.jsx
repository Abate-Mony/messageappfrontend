import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Setting from '../pages/Setting'
const SharedLayout = ({socket}) => {
    const [toggle, setToggle] = useState(true)
    return (
        <div className="big-share-layout" style={{ backgroundColor: "white" }}>
            <div className="add-btn center circle" style={{ width: "50px", height: "50px", left: "1rem" ,display:"flex"}} onClick={e => {
                setToggle(!toggle)
            }}>
                {toggle?"+":<span style={{color:"red"}}>
                    X
                    </span>}
            </div>
            <div>
                {toggle ? <Home socket={socket}/> : <Users />}
            </div>
            <Outlet />
            <div class="big-settings">
            <Setting/>
            </div>
        </div>
    )
}

export default SharedLayout