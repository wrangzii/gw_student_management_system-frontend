import axios from 'axios'
import React, { useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Create() {
    const cookies = new Cookies()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [fullName, setFullName] = useState('')
    const [createBy, setCreateBy] = useState(cookies.get('username'))
    // const [modify, setModify] = useState('')
    const [role, setRole] = useState([])
    const [departmentId, setDepartmentId] = useState('')

    const handleCreateUser = e => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/users/add',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ email, username, password, phoneNumber, dob, address, fullName, createBy, role, departmentId })
        })
            .then(result => console.log(result))
    }

    return (
        <div className='user-create'>
            <form onSubmit={handleCreateUser} className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>CREATING A NEW USER</h2>
                <div className="form-body d-flex">
                    <div className="form-body__left">
                        <div className="fullname form-group d-flex">
                            <label htmlFor="fullname">Fullname</label>
                            <input type="text" name='fullname' placeholder='Nguyen Van A' onChange={e => setFullName(e.target.value)} className='form-control' />
                        </div>
                        <div className="email form-group d-flex">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='manager@fe.edu.vn' onChange={e => setEmail(e.target.value)} className='form-control' />
                        </div>
                        <div className="phone form-group d-flex">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" name='phone' placeholder='0902345011' onChange={e => setPhoneNumber(e.target.value)} className='form-control' />
                        </div>
                        <div className="dob form-group d-flex">
                            <label htmlFor="dob">Birthday</label>
                            <input type="date" name='dob' onChange={e => setDob(e.target.value)} className='form-control' />
                        </div>
                        <div className="address form-group d-flex">
                            <label htmlFor="address">Address</label>
                            <input type="text" name='address' placeholder='20 Cong Hoa, Tan Binh' onChange={e => setAddress(e.target.value)} className='form-control' />
                        </div>
                    </div>
                    <div className="form-body__right">
                        <div className="username form-group d-flex">
                            <label htmlFor="username">Username</label>
                            <input type="text" name='username' placeholder='nguyenvana' onChange={e => setUsername(e.target.value)} className='form-control' />
                        </div>
                        <div className="password form-group d-flex">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' onChange={e => setPassword(e.target.value)} className='form-control' />
                        </div>
                        <div className="role-dropdown dropdown d-flex">
                            <label htmlFor="roles">Role</label>
                            <select class="form-select bg-success text-light" onChange={e => setRole(e.target.value)}>
                                <option selected>Choose role</option>
                                <option value="1">Manager</option>
                                <option value="2">Accoutant</option>
                                <option value="3">President</option>
                            </select>
                        </div>
                        <div className="department-dropdown dropdown d-flex">
                            <label htmlFor="departments">Department</label>
                            <select class="form-select bg-success text-light" onChange={e => setDepartmentId(e.target.value)}>
                                <option selected>Choose department</option>
                                <option value="1">Education</option>
                                <option value="2">Marketing</option>
                                <option value="3">HR</option>
                            </select>
                        </div>
                        <div className="createBy form-group d-flex">
                            <label htmlFor="createBy">Created By</label>
                            <input type="text" readOnly value={cookies.get('username')} className='form-control' />
                        </div>
                        <div className="action-btn form-group">
                            <Link to={'/user/view'} className="btn btn-danger">Cancel</Link>
                            <button className="btn btn-success">Create</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create