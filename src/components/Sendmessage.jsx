const Sendmessage = ({message,imgsrc}) => {
  return (
    <div className="flex-end">
          <div className="send-message message" style={{ backgroundColor:imgsrc&&"white" }}>
            {imgsrc?
            <img src={`https://messageappalaisah.herokuapp.com/images/${imgsrc}`} alt="mmga" />
            :message
            }
          </div>
        </div>
  )
}

export default Sendmessage