import React from 'react'
import { Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
    const cookies = new Cookies()
    return (
        <nav className="navbar">
            <Link className="navbar-brand" to={cookies.get('token') ? '/user/view' : '/'}>
                <img src={logo} width="250" alt="logo" id='logo'/>
            </Link>
        </nav>
    )
}

export default Navbar