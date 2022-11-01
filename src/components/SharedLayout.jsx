import {useRef} from 'react'
import { Link, Outlet ,useNavigate} from 'react-router-dom'
const Navauth = () => {
    const navigate = useNavigate()
    const translate=useRef(null)
    var text=''
    const loginBtn=e=>{
        navigate(`/auth/login`);
        translate.current.style.left="0%"
    }
    const signupBtn=e=>{
        navigate(`/auth/signup`);
        translate.current.style.left="50%"
    }
    return (
        <div className="main-login-container container" style={{ backgroundColor: "white" }}>

            <div className="main-login-nav">
                <h2>
                    Message App
                </h2>
                <div className="btn-container">
                    <button onClick={loginBtn}>
                        Login
                    </button>
                    <button onClick={signupBtn}>
                        Signup
                    </button>
                    <div className="translate" ref={translate}>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navauth