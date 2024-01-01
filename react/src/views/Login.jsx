import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { useRef } from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const{setUser,setToken} = useStateContext();
  const[errors,setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const payload = {     
      email : emailRef.current.value,
      password : passwordRef.current.value,
    }

  axiosClient.post('/login',payload)
  .then(({data})=>{
    setUser(data.user);
    setToken(data.token);
  })
  .catch((err) => {
    const response = err.response;
    if (response && response.status === 422) {
      setMessage(response.data.message)
    }
  })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={handleSubmit} action="" method="post">
          <h1 className="title">Login</h1>
          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <input ref={emailRef} type="email" placeholder='Email' />
        <input ref={passwordRef} type="password" placeholder='password'/>
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
