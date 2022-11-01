// import React from 'react'
import {Outlet} from 'react-router-dom'
import Navauth from "../components/Navauth";
const Auth = () => {
  return (
    <div style={{backgroundColor: "white"}}>
        
        <Navauth/>
        <h2>Welcome User please login or create account</h2>
    <Outlet/>
    </div>
  )
}

export default Auth