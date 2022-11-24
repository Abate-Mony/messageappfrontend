import bg from '../bg-1.jpg'

const Recievemessage = ({message,imgsrc}) => {
    const BASE_URL ="http://192.168.43.32:5000"
const BASE_HEROKU_URL="https://messageappal"
const handleError=e=>{
    e.target.src= bg
  console.log("error in retrieving the file !!!")

  }
    return (
        <div className="recieve-message message" style={{ background:imgsrc&&"white",Maxwidth:imgsrc&&"100%" }}>
            {imgsrc?
            <img src={imgsrc} alt="mmga" onError={handleError} />
            :message
            }
        </div>
    )
}


export default Recievemessage