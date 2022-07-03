import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import axios from 'axios'

function Update() {
    const cookies = new Cookies()
    const [departmentName, setDepartmentName] = useState('')
    const [description, setDescription] = useState('')
    const [modifyBy, setModifyBy] = useState(cookies.get('username'))
    const { id } = useParams()
    const navigate = useNavigate()

    // Get current info
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/department/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                setDepartmentName(result.data.data.departmentName)
                setDescription(result.data.data.description)
            })
    }, [])

    // Handle update department
    const handleUpdateDepartment = e => {
        e.preventDefault()
        axios({
            method: 'put',
            url: `http://localhost:8080/department/edit/${id}`,
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ departmentName, description, modifyBy })
        })
        .then(result => result ? navigate('../view') : null)
    }
    return (
        <div className='department-update'>
            <form onSubmit={handleUpdateDepartment} className="form-group">
                <h2 className='form-heading bg-warning text-white text-center'>UPDATING DEPARTMENT</h2>
                <div className="form-body">
                    <div className="d-flex">
                        <label htmlFor="department">Department</label>
                        <input type="text" className='form-control' defaultValue={departmentName} onChange={e => setDepartmentName(e.target.value)} placeholder='Accountant Leader' />
                    </div>
                    <div className="d-flex">
                        <label htmlFor="description">Description</label>
                        <textarea cols="30" rows="2" className='form-control' defaultValue={description} onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className='d-flex'>
                        <label htmlFor="createdBy">Modified By</label>
                        <input type="text" className='form-control' readOnly value={modifyBy} />
                    </div>
                    <div className="action-btn form-group">
                        <Link to={'/department/view'} className="btn btn-danger">Cancel</Link>
                        <button className="btn btn-warning">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Update