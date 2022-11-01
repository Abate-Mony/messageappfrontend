import { useRef } from 'react'
const Upload = ({ toggle, setToggle, sentTo, createdBy,getData }) => {
    const form = useRef(null)
    const handleSubmit = e => {
        e.preventDefault()
        const FD = form.current
        const formdata = new FormData(FD)
        formdata.append("sentTo", sentTo)
        formdata.append("createdBy", createdBy)
        const url = "http://localhost:5000/upload"
        const xhr = new XMLHttpRequest()
        xhr.onload = function (e) {
            if (this.status == 200 && this.readyState == 4) {
                // everything is ok her 
                console.log(this.responseText)
                setToggle(false)
                getData()
                formdata.set("file","")
            } else {
                // something is wrong here
                console.log(this.responseText)
            }
        }
        xhr.error = function () {
            console.log("something went wrong")
        }
        xhr.open("POST",url,true)
        xhr.send(formdata)
    }
    return (
        <div className={`upload-container ${!toggle && "--d-none"}`}>
            <span className="remove-btn" onClick={e => setToggle(false)}>X</span>
            <form encType="multipart/form-data"
                className="signup-container" ref={form} onSubmit={handleSubmit}>
                <input type="file" name="file" id="file" required={true} />
                <button type="submit">Upload Image</button>
            </form>
        </div>
    )
}

export default Upload