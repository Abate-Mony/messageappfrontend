import React from 'react'
import {useState,useEffect} from 'react'
import {VscArrowLeft,VscCopy} from 'react-icons/vsc'
import {IoMdTrash} from 'react-icons/io'
import {BiSelectMultiple} from 'react-icons/bi'
import {RiShareForwardFill} from 'react-icons/ri'
const MoreOpton = ({ mousedown
  , message: { message, _id, createdAt, createdBy }, setMousedown, BASE_URL, getData ,del,setDel}) => {
  const time = new Date(createdAt)
  const token = sessionStorage.getItem("token")
  const myId = sessionStorage.getItem("id")





  function fallbackCopyTextToClipboard(text,elm=null) {
    try {
        var TempText = document.createElement("input");
        TempText.value = text
        document.body.appendChild(TempText);
        TempText.select()
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        document.body.removeChild(TempText)
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
}
function handleDeleteMultiple(){
setDel(function(){
  return(
    true
  )
})
setMousedown(false)

}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');

        alert("text copied")
        setMousedown(false)
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}












  const handleDeleteMessage = async (id) => {
    
    const response = await fetch(BASE_URL + "/message/" + id, {
      method: "delete",
      headers: {
        "content-Type": "Application/json",
        "Authorization": `doris ${token}`
      }
    })
    const data = await response.json()
    console.log(data)
    getData()
    setMousedown(false)
  }
  return (
    <div className={`moreoptions-container
     ${!mousedown ? "--d-none" : ""}`}
      onClick={e => [setMousedown(false),console.log(del )]}>
      <div className="top-bar"
        onClick={e => e.stopPropagation()}>
        <span onClick={e => setMousedown(!mousedown)}>
        <VscArrowLeft/>
        </span>
        <div>
          <span className="delBtn" style={{
          display:createdBy !== myId?"none":"block"
          }} onClick={e => handleDeleteMessage(_id)}>
            <IoMdTrash/>
          </span>
          <span className="copy">
            <RiShareForwardFill/>
          </span>
          <span className="copy" onClick={e =>copyTextToClipboard(message)}>
          <VscCopy/>
          </span>
          <span className="copy" onClick={e =>handleDeleteMultiple()}>
          <BiSelectMultiple/>
          </span>

        </div>
      </div>
      <div className="moreoptions" onClick={e => e.stopPropagation()}>
        {<span>
          <h2 style={{ textAlign: "center", fontSize: "var(--fs-4)" }}>Message Information</h2>
          <span className={"sms"} style={{
            fontSize: "var(--fs-5)"
          }}>
            <span className="triangle"></span>
            {message?.length >= 200 ? message.slice(0, 200) + " ..." : message}
          </span>
          <div className="btm">
            <div className="message-info">
              <span>Message Id</span> <span>{_id}</span>
            </div>
            <div className="message-info">
              <span>CreatedAt</span> <span>{time.toDateString() + " at " + time.toLocaleTimeString()}</span>
            </div>
          </div>

        </span>}
      </div>

    </div>
  )
}

export default MoreOpton