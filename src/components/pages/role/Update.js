import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import axios from 'axios'

function Update() {
    const cookies = new Cookies()
    const [roleName, setRoleName] = useState('')
    const [description, setDescription] = useState('')
    const [modifyBy, setModifyBy] = useState(cookies.get('username'))
    const { id } = useParams()
    const navigate = useNavigate()

    // Get current info
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/role/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                setRoleName(result.data.data.roleName)
                setDescription(result.data.data.description)
            })
    }, [])

    // Handle update role
    const handleUpdateRole = e => {
        e.preventDefault()
        axios({
            method: 'put',
            url: `http://localhost:8080/role/edit/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ roleName, description, modifyBy })
        })
            .then(result => result ? navigate('../view') : null)
    }

    return (
        <div className='role-update'>
            <form onSubmit={handleUpdateRole} className="form-group">
                <h2 className='form-heading bg-warning text-white text-center'>UPDATING ROLE</h2>
                <div className="form-body">
                    <div className="d-flex">
                        <label htmlFor="role">Role</label>
                        <input type="text" className='form-control' defaultValue={roleName} onChange={e => setRoleName(e.target.value)} placeholder='Accountant Leader' />
                    </div>
                    <div className="d-flex">
                        <label htmlFor="department">Description</label>
                        <textarea cols="30" rows="2" className='form-control' defaultValue={description} onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className='d-flex'>
                        <label htmlFor="createdBy">Modified By</label>
                        <input type="text" className='form-control' readOnly value={modifyBy} />
                    </div>
                    <div className="action-btn form-group">
                        <Link to={'/role/view'} className="btn btn-danger">Cancel</Link>
                        <button className="btn btn-warning">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Update