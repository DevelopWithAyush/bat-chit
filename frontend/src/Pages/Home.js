import React, { useState } from 'react'
import Signup from '../Components/Auth/Signup'
import Login from '../Components/Auth/Login'

function Home() {
  const [login, setlogin] = useState(true)
  const [signup, setsignup] = useState(false)
  const [btnlogin ,setbtnlogin] = useState("btnback")
  const [btnsignup ,setbtnsignup] = useState("")
  return (
    <div className="container">
      <div className="tittle"><h1>baat-chit</h1></div>
      <div className="box">
        {/* <h4>Login ker lo baat kerna hai na ?</h4> */}
        <div className="btn">
          <button className={`login ${btnlogin}`  } onClick={() => { setlogin(true); setsignup(false); setbtnlogin("btnback"); setbtnsignup("") }}>Login</button>
          <button className={`signup ${btnsignup}`} onClick={() => { setlogin(false); setsignup(true); setbtnlogin(""); setbtnsignup("btnback") }}>Signup</button>
        </div>
        <div className="inputpart">
          {login && <div className="loginpart" ><Login/></div>}
          {signup && <div className="signuppart" ><Signup/></div>}
        </div>
      </div>
     <p className='ownername'>made by <a href="https://github.com/DevelopWithAyush">developWithAyush </a></p> 
    </div>
  )
}

export default Home
