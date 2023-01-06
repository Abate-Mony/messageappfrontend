import imgsrc from '../bg-1.jpg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
const Messagerow = ({ name, id, message, time }) => {

    const [loading , setLoading]=useState(true)
const letterName=names=>names.split(" ").map((name)=>name[0]).join("").toUpperCase() 
  const navigate = useNavigate()
    const date = new Date(time).toLocaleDateString()
    const hour = new Date(time).toLocaleTimeString()
    const handleError = e => {
        console.log("sme errr os")
        window.setTimeout(()=>{
            e.target.src = imgsrc
        setLoading(false)

        },5000)
    }
    return (
        <div className="messagebox" style={{ backgroundColor: "white" }}>
            <div className="message-img center" style={{
                overflow:"hidden",zIndex:5
            }}>
            <div className="img_preloader" style={{
            display:loading?"flex":"none",backgroundColor:"white",
            borderRadius:"50%",border: "0.125rem solid var(--bg-color-1)",zIndex:4,height:"100%",width:"100%",alignItems:"center",justifyContent:"center"
          }}>{letterName(name)}</div>
                <img src={"http"} onError={handleError}
                    className="fit-img circle"
                     style={{ width: "100%", height: "100%",objectFit:"cover",position:"absolute",top:0,left:0}}
                      alt={"rose are red"} />
            </div>

            <div className="message_right" onClick={e => {
                navigate(`/message/${id}`)
              }}>
                <div>
                    <h2>
                        {name.split(" ")
                        .map(_=>_.charAt(0).toUpperCase()
                         +_.slice(1)).join(" ")}
                    </h2>
                    <span style={{paddingLeft:"0.4rem"}}>{date === (new Date()
                    .toLocaleDateString()) 
                    ? hour : date}</span>

                </div>
                <div>
                    <p>{message.length > 50 ? message.slice(0, 50) + "..." : message}</p>
                    <span className="number-  circle-">
                        
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Messagerow