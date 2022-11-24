import bg from '../bg-1.jpg'
const Sendmessage = ({message,imgsrc}) => {
  const BASE_URL ="http://192.168.43.32:5000"
const BASE_HEROKU_URL="https://messageappal"
const handleError=e=>{
  e.target.src= bg
  console.log("error in retrieving the file !!!")
}
  return (
    <div className="flex-end">
          <div className="send-message message" style={{ backgroundColor:imgsrc&&"white" }}>
            {imgsrc?
            <img src={imgsrc} alt="mmga" onError={handleError} />
            :message
            }
          </div>
        </div>
  )
}

export default Sendmessage