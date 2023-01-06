// import { React } from 'react'
import Picker from 'emoji-picker-react'

const Emj = ({ modal,_message }) => {
   const onEmojiClick=(event,emojiObj)=>{
    console.log(emojiObj.emoji)
    // alert(Object.values(emojiObj))
    _message.current.value+=emojiObj.emoji
   }
    return (
        <span className={`emj-container 
        ${!modal ? "--d-none" : "----"}`}
         onClick={(e) => {
            return e.stopPropagation()
        }} >
            <Picker onEmojiClick={onEmojiClick} width={"100%"} 
            height={"100%"} />
        </span>
    )
}

export default Emj