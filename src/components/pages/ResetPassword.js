import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const href = window.location.href
    let resetToken = href.substring(href.indexOf('=') + 1)

    const handleResetPassword = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: `http://localhost:8080/confirm_reset?token=${resetToken}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ password, confirmPassword })
        })
        if (password === confirmPassword) {
            alert('pass')
        } else {
            alert('fail')
        }
    }

    return (
        <div className='reset_password'>
            <Navbar />
            <form onSubmit={handleResetPassword} className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>RESET PASSWORD</h2>
                <div className="form-body">
                    <input type="password" placeholder='New password' onChange={e => setPassword(e.target.value)} className='form-group form-control' />
                    <input type="password" placeholder='Confirm password' onChange={e => setConfirmPassword(e.target.value)} className='form-group form-control' />
                    <div className="action-btn form-group">
                        <button className="btn btn-success">Confirm</button>
                        <Link to={'/'} className="btn btn-danger">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword