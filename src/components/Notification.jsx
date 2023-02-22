import React from 'react'
import imgsrc from '../bg-1.jpg'
import { useNavigate } from 'react-router-dom'
const Notification = ({ incomingmessage, incomingInfo }) => {

    const navigate = useNavigate()
    const [userId, message, names] = incomingInfo
    return (
        <div className={`notification-box ${incomingmessage && "incomingmessage"}`}
            onClick={e => navigate(`/message/${userId}`)}>
            <div className="container">
                <div className="wrapper-notification">
                    <div className="image" style={{ overflow: "hidden" }}>
                        <img src={imgsrc} alt="dfimage" className="fit-img" />
                    </div>
                    <div className="text-box">
                        <span>{names}</span>
                        <span style={{ fontStyle: "oblique",overflowX:"hidden" }}>{message}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification