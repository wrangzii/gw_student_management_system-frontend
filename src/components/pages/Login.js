import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/login0', {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ username, password })
    })
  }

  return (
    <div className='login'>
      <Navbar />
      <form action="" className="form-group">
        <h2 className='form-heading bg-primary text-white text-center'>WELCOME TO CMS</h2>
        <div className="form-body">
          <input type="text" placeholder='Username or Email' value={username} className='form-group form-control' />
          <input type="password" placeholder='Password' value={password} className='form-group form-control' />
          <div className="form-group form-check">
            <input className="form-check-input" type="checkbox" value="" id="remember_me" />
            <label className="form-check-label text-dark" htmlFor="remember_me">
              Remember me
            </label>
          </div>
          <div className="action-btn form-group">
            <button onClick={handleLogin} className="btn btn-primary">LOGIN</button>
            <button className="btn btn-success">LOGIN WITH FPT EMAIL</button>
          </div>
          <Link to="/forgot-password">
            <small className="note text-danger font-italic">Forgotten your username or password?</small>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login