import React from 'react'
import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider'

const DefaultLayout = () => {
  const {user,token,notification,setUser,setToken} = useStateContext();

  if(!token){
    return <Navigate to="/login"/>;
  }
  const handleLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])
  return (
    <div id='defaultLayout'>
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      {notification &&
       <div className="notification">
        {notification}
       </div>
      }
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a onClick={handleLogout} className="btn-logout" href="#" >Logout</a>
          </div>
        </header>
        <main>
        <Outlet/>
        </main>
      </div>
      
    </div>
  )
}

export default DefaultLayout
