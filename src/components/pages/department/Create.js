import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function Create() {
    const cookies = new Cookies()
    const [departmentName, setDepartmentName] = useState('')
    const [description, setDescription] = useState('')
    const [createBy, setCreateBy] = useState(cookies.get('username'))
    const navigate = useNavigate()

    // Handle create department
    const handleCreateDepartment = e => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/department/add',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ departmentName, description, createBy })
        })
            .then(result => result ? navigate('../view') : null)
    }

    return (
        <div className='department-create'>
            <form onSubmit={handleCreateDepartment} className="form-group">
                <h2 className='form-heading bg-success text-white text-center'>CREATING A NEW DEPARTMENT</h2>
                <div className="form-body">
                    <div className="department-dropdown dropdown d-flex">
                        <label htmlFor="department">Department</label>
                        <input type="text" className='form-control' onChange={e => setDepartmentName(e.target.value)} placeholder='Assurance' />
                    </div>
                    <div className="department-dropdown dropdown d-flex">
                        <label htmlFor="department">Description</label>
                        <textarea cols="30" rows="2" className='form-control' onChange={e => setDescription(e.target.value)} ></textarea>
                    </div>
                    <div className='d-flex'>
                        <label htmlFor="createdBy">Created By</label>
                        <input type="text" className='form-control' readOnly value={cookies.get('username')} />
                    </div>
                    <div className="action-btn form-group">
                        <Link to={'/department/view'} className="btn btn-danger">Cancel</Link>
                        <button className="btn btn-success">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create