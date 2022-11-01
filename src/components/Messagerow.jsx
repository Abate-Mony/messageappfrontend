// import React from 'react'
import imgsrc from '../bg-1.jpg'
const messagerow = ({ name, id, message, time }) => {
    const date = new Date(time).toLocaleDateString()
    const hour = new Date(time).toLocaleTimeString()
    const handleError = e => {
        e.target.src = imgsrc
    }
    return (
        <div className="messagebox" style={{ backgroundColor: "white" }}>
            <div className="message-img center">
                <img src={`http://localhost:5000/profile/${id}.jpg`} onError={handleError}
                    className="fit-img circle" style={{ width: 60 + "px", height: 60 + "px" }} alt={"rose are red"} />
            </div>

            <div className="message_right">
                <div>
                    <h2>
                        {name}
                    </h2>
                    <span>{date === (new Date().toLocaleDateString()) ? hour : date}</span>

                </div>
                <div>
                    <p>{message.length > 50 ? message.slice(0, 50) + "..." : message}</p>
                    <span className="number  circle">
                        1
                    </span>
                </div>
            </div>
        </div>
    )
}

export default messagerow