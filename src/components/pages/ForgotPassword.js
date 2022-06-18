import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function ForgotPassword() {
    return (
        <div className='forgot_password'>
            <Navbar />
            <form action="" className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>FORGOT PASSWORD</h2>
                <div className="form-body">
                    <input type="text" placeholder='Username or Email' className='form-group form-control' />
                    <div className="action-btn form-group">
                        <button className="btn btn-success">Reset my password</button>
                        <Link to={'/'} className="btn btn-danger">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword