import { useRef } from 'react'
import {TfiClose} from 'react-icons/tfi'

const Upload = ({ toggle, setToggle, sentTo, getData,socket }) => {
    const BASE_URL ="http://192.168.43.32:5000"
const BASE_HEROKU_URL="https://messageappal"
const createdBy = sessionStorage.getItem("id")
    const form = useRef(null)
    const handleSubmit = e => {
        e.preventDefault()
        const token=sessionStorage.getItem("token")
        const FD = form.current
        const formdata = new FormData(FD)
        formdata.append("sentTo", sentTo)
        const fileSize = formdata.get("file").size / (1024 * 1024)
        const fileType = formdata.get("file").type
        // if (fileSize > 1) {
        //     alert("please upload an image with less than 1mb")
        //     return
        // }
        // console.log(fileType)
        const re = /image/g
        if (!fileType.match(re)) {
            
            alert("please upload an imae file thanks")
            return
        }
        setToggle(false)

        const url = BASE_URL+"/upload"
        const xhr = new XMLHttpRequest()
        xhr.onload = function (e) {
            if (this.status == 200 && this.readyState == 4) {
                console.log(this.responseText)
                // setToggle(false)
                getData()
                socket.send(sentTo + "-" + createdBy)
            } else {
                // something is wrong here
                alert("fail to save image")
                console.log(this.responseText)
            }
        }
        xhr.error = function () {
            console.log("something went wrong")
        }
        xhr.open("POST", url, true)
        xhr.setRequestHeader("authorization",`${"doris "+token}`)
        xhr.send(formdata)
    }

    return (
        <div className={`upload-container ${!toggle && "--d-none"}`}>
            <span className="remove-btn" onClick={e => setToggle(false)}><TfiClose size="1.5rem" scale={4} style={{fontWeight:700}} /></span>
            <form encType="multipart/form-data"
                className="signup-container" ref={form} onSubmit={handleSubmit}>
                <input type="file" name="file" id="upload_file" accept={"image/*"} required={true} />
                <button type="submit">Upload Image</button>
            </form>
        </div>
    )
}

export default Upload