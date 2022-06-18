import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                <img src={logo} width="250" alt="logo" id='logo'/>
            </Link>
        </nav>
    )
}

export default Navbar