const Recievemessage = ({message,imgsrc}) => {
    return (
        <div className="recieve-message message" style={{ background:imgsrc&&"white",Maxwidth:imgsrc&&"100%" }}>
            {imgsrc?
            <img src={`https://messageappalaisah.herokuapp.com/images/${imgsrc}`} alt="mmga" />
            :message
            }
        </div>
    )
}


export default Recievemessage