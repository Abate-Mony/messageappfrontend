import React from 'react'
import imgsrc from '../bg-1.jpg'
import {useState,useEffect} from 'react'
const User = ({ name, id,createdAt }) => {
  const [src, setSrc] = useState("")

  const handleError = e => {
    e.target.src = imgsrc
  }
useEffect(() => {
imageSrc()

},[])

async function imageSrc (){
  const _res=  await fetch("https://messageappalaisah.herokuapp.com/profile/" + id)
  const {image} = await _res.json()
  console.log(image)
  setSrc("https://messageappalaisah.herokuapp.com/profile/image/"+image)
  console.log(image)
}


   function checkUserTime(date){


    // const _res=  await fetch("https://messageappalaisah.herokuapp.com/profile/" + id)
    // const {image} = await _res.json()
    // console.log(image)
    // setSrc("https://messageappalaisah.herokuapp.com/profile/image/"+image)






    const milliSeconds=new Date()- new Date(date);
    const seconds=milliSeconds/1000
    const minute=seconds/60;
    const hours=minute/60;
    const days=hours/24
    if(days>=5){
      return "Old User"
    }
    return "New User"
  }
  return (
    <div className="container" style={{ padding: "0 1rem" }}>
      <div className="user-container">
        <div className="img-container">
          <img src={src} 
          onError={handleError} className="fit-img" alt={"0"} />
        </div>
        <div className="user-details-container">
          <h4>
            {name.map(_=>_.charAt(0).toUpperCase() +_.slice(1)).join(" ")}</h4>
          <span>{checkUserTime(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default User