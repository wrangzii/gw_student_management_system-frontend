import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    // const handleCheckPassword = (e) => {
    //     e.preventDefault()
    //     if (newPassword === confirmPassword) {
    //         alert('pass')
    //     } else {
    //         alert('fail')
    //     }
    // }

    return (
        <div className='reset_password'>
            <Navbar />
            <form action="" className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>RESET PASSWORD</h2>
                <div className="form-body">
                    <input type="password" placeholder='New password' className='form-group form-control' />
                    <input type="password" placeholder='Confirm password' className='form-group form-control' />
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