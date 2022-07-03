import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import axios from 'axios'

function Update() {
  const cookies = new Cookies()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [fullName, setFullName] = useState('')
  const [modifyBy, setModifyBy] = useState(cookies.get('username'))
  const [role, setRole] = useState([])
  const [departmentId, setDepartmentId] = useState(0)
  const { id } = useParams()

  // Get current info
  useEffect(() => {
    axios({
      method: 'put',
      url: `http://localhost:8080/users/edit/${id}`,
      headers: {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        setEmail(result.data.data.email)
        setPhoneNumber(result.data.data.phoneNumber)
        setDob(result.data.data.phoneNumber)
        setAddress(result.data.data.address)
        setFullName(result.data.data.fullName)
        setModifyBy(result.data.data.phoneNumber)
        setRole(result.data.data.role)
        setDepartmentId(result.data.data.departmentId)
      })
  }, [])

  // Handle update user
  const handleUpdateUser = e => {
    e.preventDefault()
  }
  return (
    <div className='user-update'>
      <form onSubmit={handleUpdateUser} className="form-group">
        <h2 className='form-heading bg-warning text-white text-center'>UPDATING A NEW USER</h2>
        <div className="form-body d-flex">
          <div className="form-body__left">
            <div className="fullname form-group d-flex">
              <label htmlFor="fullname">Fullname</label>
              <input type="text" name='fullname' placeholder='Nguyen Van A' defaultValue={fullName} onChange={e => setFullName(e.target.value)} className='form-control' />
            </div>
            <div className="email form-group d-flex">
              <label htmlFor="email">Email</label>
              <input type="email" name='email' placeholder='manager@fe.edu.vn' defaultValue={email} onChange={e => setEmail(e.target.value)} className='form-control' />
            </div>
            <div className="phone form-group d-flex">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" name='phone' placeholder='0902345011' defaultValue={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className='form-control' />
            </div>
            <div className="dob form-group d-flex">
              <label htmlFor="dob">Birthday</label>
              <input type="date" name='dob' defaultValue={dob} onChange={e => setDob(e.target.value)} className='form-control' />
            </div>
            <div className="address form-group d-flex">
              <label htmlFor="address">Address</label>
              <input type="text" name='address' placeholder='20 Cong Hoa, Tan Binh' defaultValue={address} onChange={e => setAddress(e.target.value)} className='form-control' />
            </div>
          </div>
          <div className="form-body__right">
            <div className="username form-group d-flex">
              <label htmlFor="username">Username</label>
              <input type="text" name='username' placeholder='nguyenvana' defaultValue={username} onChange={e => setUsername(e.target.value)} className='form-control' />
            </div>
            <div className="password form-group d-flex">
              <label htmlFor="password">Password</label>
              <input type="password" name='password' defaultValue={password} onChange={e => setPassword(e.target.value)} className='form-control' />
            </div>
            <div className="role-dropdown dropdown d-flex">
              <label htmlFor="roles">Role</label>
              <select className="form-select bg-warning text-light" defaultValue={role} onChange={e => setRole(e.target.value)}>
                <option defaultValue={'DEFAULT'} disabled>Choose role</option>
                <option value="1">Manager</option>
                <option value="2">Accoutant</option>
                <option value="3">President</option>
              </select>
            </div>
            <div className="department-dropdown dropdown d-flex">
              <label htmlFor="departments">Department</label>
              <select className="form-select bg-warning text-light" defaultValue={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                <option defaultValue={'DEFAULT'} disabled>Choose department</option>
                <option value="1">Education</option>
                <option value="2">Marketing</option>
                <option value="3">HR</option>
              </select>
            </div>
            <div className="createBy form-group d-flex">
              <label htmlFor="createBy">Modified By</label>
              <input type="text" readOnly value={modifyBy} className='form-control' />
            </div>
            <div className="action-btn form-group">
              <Link to={'/user/view'} className="btn btn-danger">Cancel</Link>
              <button className="btn btn-warning">Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Update