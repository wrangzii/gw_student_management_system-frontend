import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function Create() {
    const cookies = new Cookies()
    const [roleName, setRoleName] = useState('')
    const [description, setDescription] = useState('')
    const [createBy, setCreateBy] = useState(cookies.get('username'))
    const navigate = useNavigate()

    // Handle create role
    const handleCreateRole = e => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/role/add',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ roleName, description, createBy })
        })
        .then(result => result ? navigate('../view') : null)
    }

    return (
        <div className='role-create'>
            <form onSubmit={handleCreateRole} className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>CREATING A NEW ROLE</h2>
                <div className="form-body">
                    <div className="d-flex">
                        <label htmlFor="role">Role</label>
                        <input type="text" className='form-control' onChange={e => setRoleName(e.target.value)} placeholder='Accountant Leader' />
                    </div>
                    <div className="d-flex">
                        <label htmlFor="description">Description</label>
                        <textarea cols="30" rows="2" className='form-control' onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className='d-flex'>
                        <label htmlFor="createdBy">Created By</label>
                        <input type="text" className='form-control' readOnly value={cookies.get('username')} />
                    </div>
                    <div className="action-btn form-group">
                        <Link to={'/role/view'} className="btn btn-danger">Cancel</Link>
                        <button className="btn btn-success">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create