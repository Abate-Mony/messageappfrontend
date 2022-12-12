import bg from '../bg-1.jpg'
const Sendmessage = ({ message, imgsrc, id, setSelectedId, selectedId,del,setDel }) => {
  const BASE_URL = "http://192.168.43.32:5000"
  const handleError = e => {
    e.target.src = bg
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
      position: "relative", minHeight: imgsrc && "500px"
    }} >
      <div className="message send-message" onClick={handleSelect}>
        {imgsrc ?
          <img src={imgsrc} alt="mmga" onError={handleError} />
          : message

        }
      </div>
    </div>
  )
}

export default Sendmessage