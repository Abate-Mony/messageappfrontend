import bg from '../bg-1.jpg'
import {useState,useEffect} from 'react'

const Sendmessage = ({ message, imgsrc, id, setSelectedId, selectedId,del,setDel }) => {
const [loading,setLoading]=useState(true)

  const handleError = e => {
    e.target.src = bg
    console.log("image fail to load ")
    setLoading(false)

  }
  const handleLoading=e=>{
    console.log(e)
    console.log("image is loading here ")
    setLoading(false)
  }
  function handleSelect(e) {
    console.log(del)
    if(del){

    const temp = selectedId
    if (temp.includes(id)) {
      const index = temp.indexOf(id)
    const remove=  temp.splice(index, 1)
    setSelectedId(temp)
    } else {
      temp.push(id)
      setSelectedId(temp)
    }
    console.log(temp)

    const elm = e.target.parentElement
    if (elm.style.backgroundColor == "gray") {
      elm.style.backgroundColor = "white"
    } else {
      elm.style.backgroundColor = "gray"
    }
    e.stopPropagation()
  }

  }
  return (
    <div className="flex-end" style={{
      position: "relative"
    }} >
      <div className="message send-message" onClick={handleSelect} style={{
        width: imgsrc && "50%", height: imgsrc && "20rem"
      }}>
      {imgsrc?
          <><div className="img_preloader" style={{
            display:loading?"block":"none"
          }}><span></span></div> <img src={imgsrc} onLoad={handleLoading} alt="mmga" onError={handleError} style={{
            width:`100%`,transform:`scaleX(1.2)`
          }}/></>
            :message
            }
      </div>
    </div>
  )
}

export default Sendmessage