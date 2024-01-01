import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import {Link} from "react-router-dom"
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';


const Signup = () => {

  const{setUser,setToken}  = useStateContext();
  const[errors,setErrors] = useState(null)
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email : emailRef.current.value,
      password : passwordRef.current.value,
      password_confirmation : passwordConfirmationRef.current.value

    }
    axiosClient.post('/signup',payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response  = err.response
      if(response && response.status === 422){
        setErrors(response.data.errors);
      }
    })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
    <div className="form">
      <form onSubmit={handleSubmit} action="" method="post">
        <h1 className="title">Register for free</h1>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          
        <input ref={nameRef} type="text" placeholder='name' />
        <input ref={emailRef} type="email" placeholder='Email' />
        <input ref={passwordRef} type="password" placeholder='password'/>
        <input ref={passwordConfirmationRef} type="password" placeholder='confirm password' />
        <button className="btn btn-block">Register</button>
        <p className="message">
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Signup
