const Recievemessage = ({message,imgsrc}) => {
    return (
        <div className="recieve-message message" style={{ background:imgsrc&&"white",Maxwidth:imgsrc&&"100%" }}>
            {imgsrc?
            <img src={`http://192.168.43.32:5000/images/${imgsrc}`} alt="mmga" />
            :message
            }
        </div>
    )
}

export default Recievemessage