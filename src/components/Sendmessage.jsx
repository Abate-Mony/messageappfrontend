const Sendmessage = ({message,imgsrc}) => {
  return (
    <div className="flex-end">
          <div className="send-message message" style={{ backgroundColor:imgsrc&&"white" }}>
            {imgsrc?
            <img src={`http://192.168.43.32:5000/images/${imgsrc}`} alt="mmga" />
            :message
            }
          </div>
        </div>
  )
}

export default Sendmessage