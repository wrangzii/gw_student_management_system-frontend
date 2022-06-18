import React from 'react'
import { Link } from 'react-router-dom'

function Update() {
  return (
    <div className='user-update'>
      <form action="" className="form-group">
        <h2 className='form-heading bg-warning text-white text-center'>UPDATING USER</h2>
        <div className="form-body">
          <div className="role-dropdown dropdown d-flex">
            <label htmlFor="role">Role</label>
            <button className="btn btn-warning dropdown-toggle" type="button" id="role_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Role
            </button>
            <div className="dropdown-menu" aria-labelledby="role_dropdown">
              <Link className="dropdown-item" to="/">Manager</Link>
              <Link className="dropdown-item" to="/">Accoutant</Link>
              <Link className="dropdown-item" to="/">President</Link>
            </div>
          </div>
          <div className="fullname form-group d-flex">
            <label htmlFor="fullname">Fullname</label>
            <input type="text" placeholder='Nguyen Van A' className='form-control' />
          </div>
          <div className="email form-group d-flex">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='manager@fe.edu.vn' className='form-control' />
          </div>
          <div className="phone form-group d-flex">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" placeholder='0902345011' className='form-control' />
          </div>
          <div className="department-dropdown dropdown d-flex">
            <label htmlFor="department">Department</label>
            <button className="btn btn-warning dropdown-toggle" type="button" id="department_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Department
            </button>
            <div className="dropdown-menu" aria-labelledby="department_dropdown">
              <Link className="dropdown-item" to="/">Education</Link>
              <Link className="dropdown-item" to="/">Marketing</Link>
              <Link className="dropdown-item" to="/">HR</Link>
            </div>
          </div>
          <div className="avatar form-group d-flex">
            <label htmlFor="avatar">User Image</label>
            <input type="file" className='text-dark' />
          </div>
          <div className="action-btn form-group">
            <Link to={'/user/view'} className="btn btn-danger">Cancel</Link>
            <Link to={'/'} className="btn btn-warning">Update</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Update